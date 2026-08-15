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

The canonical address is `https://blog.damecasol.com/` (Cloudflare DNS →
GitHub Pages). This repository is subject to the homelab CI policy, so the
build runs on the homelab's own runner rather than a GitHub-hosted one, and it
must not leave anything in GitHub's Actions artifact storage.

| | Now | Target |
|---|---|---|
| Build machine | GitHub-hosted (`ubuntu-latest`) | homelab runner (`homelab-blog`) |
| Handoff to Pages | `upload-pages-artifact` → Actions storage (~90 MB per publish) | push `dist/` to the `gh-pages` branch |

The migration is in progress; the runner is not registered yet. Until the
switch lands, publishing works exactly as before. Do not change `runs-on`
before the runner reports Ready — a queued job would never find a runner and
publishing would stop.

Status, ordering, and the remaining steps live in the `homelab-gitops`
repository under `.ai/projects/arc-blog-onboarding/` (`CHARTER.md` and
`RUNBOOK-phase2.md`).

## Analytics

GA4 is disabled unless `PUBLIC_GA_MEASUREMENT_ID` is available at build time.
For a local verification, set it only in the current shell:

```powershell
$env:PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
pnpm dev
```

```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX pnpm dev
```

For GitHub Pages, create the repository variable `GA_MEASUREMENT_ID`. The
workflow maps it to the Astro public build variable. The measurement ID is not
a credential; OAuth tokens and service-account material must never enter this
repository. When no ID is configured, no GA script or consent banner is
rendered.

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
