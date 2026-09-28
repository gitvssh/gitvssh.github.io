# gitvssh.github.io

Public Astro source for `https://blog.damecasol.com/`.
The old `gitvssh.github.io` address still works; GitHub redirects it here (301).

This repository contains only material required to build and operate the
public blog:

- Astro application source
- published Markdown posts
- final web images used by published posts
- rights-reviewed official logos or other external assets used by structured
  official-resource cards
- public deployment and validation scripts

Research packets, drafts, claims, storyboards, prompts, QA records, manifests,
intermediate images, credentials, and the PARA vault belong to the separate
private production studio and must not be added here.

## Requirements

- Node.js 22.12 or newer
- pnpm 11.7.0 through Corepack

## Local Development

```bash
corepack enable
pnpm install
pnpm dev
```

The default local URL is `http://localhost:4321/`.

## Verification

```bash
pnpm check
pnpm build
```

`pnpm check` first runs the public-repository allowlist and secret-pattern
gate, then Astro's type checks. The production build is written to `dist/`.
GitHub Actions deploys only from `gitvssh/gitvssh.github.io` on `main`.
See [Deployment](#deployment) for where that build actually runs.

## Deployment

Canonical address: `https://blog.damecasol.com/`. The visitor never reaches
GitHub directly — Cloudflare terminates TLS at the edge with the zone's
`*.damecasol.com` certificate and forwards to GitHub Pages:

```
visitor → Cloudflare edge (TLS) → GitHub Pages (gh-pages branch)
```

Under the homelab CI policy this repository builds on the homelab's own runner
(`runs-on: homelab-blog`) and never uses GitHub's Actions artifact storage; the
build pushes `dist/` to `gh-pages` and Pages serves that branch. The publish
step writes `CNAME` and `.nojekyll` into the output — both are required.

The DNS record must stay proxied. GitHub never issued a certificate for the
custom domain, so switching the record back to DNS-only would break HTTPS.

Details and history: `homelab-gitops` `.ai/projects/arc-blog-onboarding/`.

## Analytics

GA4 is connected through **Cloudflare Zaraz**, not through code (homelab policy
§4.2). The repository holds no measurement ID and loads no vendor tag. Templates
call the thin transport in `src/lib/analytics.ts`, which forwards to
`window.zaraz.track(event, properties)` and is a silent no-op when Zaraz is not
on the page. Zaraz owns the GA4 connection, the measurement ID, and the consent
gate (analytics purpose denied by default).

Console steps (outside this repository): enable Zaraz on `blog.damecasol.com`,
add the GA4 tool with the measurement ID, assign it to a consent purpose that is
denied by default, and map `zaraz.track` events to GA4 events. Until that is
done no analytics data is collected.

Event dictionary (enforced by `ANALYTICS_EVENTS` in `src/lib/analytics.ts`;
any other event name or property is dropped before sending):

| Event                 | Allowed properties                              | Purpose                                   |
| --------------------- | ----------------------------------------------- | ----------------------------------------- |
| `engaged_read`        | `content_id`, `content_track`, `content_category` | 30 s on page and 50 % of the article seen |
| `article_complete`    | `content_id`, `content_track`, `content_category` | Article footer reached                    |
| `related_post_click`  | `target` (post slug or archive label)           | Internal navigation from an article       |
| `toc_click`           | `target` (heading id)                           | Table-of-contents use                     |
| `brand_profile_click` | `target`                                        | Creator profile link                      |

Suggested GA4 key event: `article_complete`. String values are limited to
letters, digits, `_` and `-` (max 120 chars), so URLs, e-mail addresses, phone
numbers and free text can never leave the page.

## SEO

Site identity lives in `src/lib/site.ts` (`SITE_ORIGIN`, `SITE_NAME`,
`SITE_DESCRIPTION`, author, default social image, verification tokens).
`BaseLayout` emits canonical, Open Graph, Twitter card and JSON-LD for every
page; `src/lib/schema.ts` builds the `WebSite`, `Organization`, `BreadcrumbList`
and `CollectionPage` blocks, and `src/pages/posts/[id].astro` the
`BlogPosting`/`NewsArticle`. `pnpm build` renders `dist/social/<slug>.jpg`
(1280×720) for each post; `public/social-default.jpg` covers every other page.
Listing pages with no post render `noindex` and are left out of `sitemap.xml`.

## Content

Published posts live in `src/content/posts/<slug>/`. Each folder contains one
Markdown entry and only the final public images for that post. Frontmatter is
validated by `src/content.config.ts`.

Optional `officialResources` frontmatter renders static link-preview cards for
official announcements, documentation, product pages, and press material. The
card summary is written by the editor. Local preview images are accepted only
with owner, rights basis, evidence URL, attribution, and modification metadata;
arbitrary remote Open Graph images are not fetched by readers or copied at
build time.

The public reader routes include the four track indexes, approved technical
categories, long-form series, and `/archives/`. Long posts receive a generated
table of contents when they contain at least five level-two sections. Related
posts, previous/next series controls, and recently updated lists are derived at
build time from validated content metadata; they do not add a database or an
admin runtime.

Promotion from the private studio is explicit. Run `pnpm check` before every
commit so accidental source packets or production artifacts cannot enter the
public history.
