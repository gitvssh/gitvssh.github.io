# Public Blog Agent Instructions

This repository is the public source for `https://blog.damecasol.com/`
(the old `gitvssh.github.io` address 301-redirects here).

## Public Boundary

Only add files needed to build, validate, deploy, or display the public blog.
Published content belongs under `src/content/posts/<slug>/` and may contain:

- exactly one `index.md`
- only final comic/detail images and approved official external assets
  referenced by that post

Do not add research packets, drafts, claims, storyboards, prompts, QA records,
manifests, intermediate images, credentials, local logs, or vault material.
Those belong to the separate PR Comic studio repository.

`officialResources` cards are text-first. A local third-party image requires
validated owner, rights basis, evidence URL, attribution, and modification
metadata in frontmatter. Never copy a remote `og:image` merely because it is
published by an official site.

## Editorial Tracks

Every post uses exactly one primary track:

- `paper`
- `news`
- `tech_column`

## SEO Invariants

- Site identity (`SITE_ORIGIN`, `SITE_NAME`, description, author, social image
  defaults, verification tokens) is defined once in `src/lib/site.ts`.
- Post `<h1>`, `og:title` and JSON-LD `headline` are the post title alone. Do
  not reintroduce a site or track prefix into them.
- Every page has a canonical URL, an Open Graph image (post social card or
  `public/social-default.jpg`) and JSON-LD. Empty listing pages are `noindex`
  and excluded from `sitemap.xml`.
- Analytics go only through `src/lib/analytics.ts` (`window.zaraz.track`). No
  vendor tag or measurement ID enters the repository.

## Required Checks

Run both commands before publication:

```text
pnpm check
pnpm build
```

The public-repository check is an allowlist gate. Do not weaken it to admit a
production artifact; adapt the public post or keep that artifact in the studio.

## Deployment (2026-08-16)

Publishing content works as it always has. This section explains the delivery
path so a session that opens `.github/workflows/deploy-pages.yml` does not
undo it.

This repository falls under the homelab CI policy (`homelab-gitops`
`docs/homelab-project-policy.md`, sections 3.1 and 5.1):

1. CI runs on the homelab's own repository-scoped runner, not a GitHub-hosted
   one. The workflow's single job uses `runs-on: homelab-blog`.
2. GitHub's Actions artifact storage stays unused. The build pushes `dist/` to
   the `gh-pages` branch instead of uploading a Pages artifact, and Pages
   serves that branch.

`CNAME` (`blog.damecasol.com`) and `.nojekyll` are written into `dist/` by the
publish step. Removing either breaks the site: without `CNAME` the custom
domain is dropped, and without `.nojekyll` Jekyll hides Astro's `_astro/`
directory, so every stylesheet 404s.

Delivery path — the visitor never reaches GitHub directly:

```
visitor → Cloudflare edge (TLS, *.damecasol.com cert) → GitHub Pages
```

`blog.damecasol.com` is a proxied Cloudflare record. GitHub never issued a
certificate for the custom domain, so the edge terminates TLS with the zone
certificate instead. Two things follow. GitHub will not issue its own
certificate while the record is proxied, so **do not set the record back to
DNS-only** expecting HTTPS to keep working — that reverts to the broken state.
And because traffic now passes through Cloudflare, Zaraz is available and is the
analytics path (section 4.2): the site calls `window.zaraz.track` through
`src/lib/analytics.ts` and holds no measurement ID. GA4, the measurement ID and
the consent gate are configured in the Cloudflare Zaraz console.

Status and history live in `homelab-gitops`
`.ai/projects/arc-blog-onboarding/` (`CHARTER.md`, `RUNBOOK-phase2.md`).
