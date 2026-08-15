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

## Required Checks

Run both commands before publication:

```text
pnpm check
pnpm build
```

The public-repository check is an allowlist gate. Do not weaken it to admit a
production artifact; adapt the public post or keep that artifact in the studio.

## Deployment — migration in progress (2026-08-15)

Publishing content works as it always has. This section exists so a session
that opens `.github/workflows/deploy-pages.yml` knows why it is about to change
and does not change it early or in a conflicting way.

This repository now falls under the homelab CI policy (`homelab-gitops`
`docs/homelab-project-policy.md`, sections 3.1 and 5.1). Two rules apply:

1. CI jobs run on the homelab's own repository-scoped runner, not a
   GitHub-hosted one.
2. GitHub's Actions artifact storage stays unused. Today
   `upload-pages-artifact` parks roughly 90 MB there on every publish, which
   is the violation being closed.

Target shape, once the runner exists: a single job on `runs-on: homelab-blog`
that builds and then pushes `dist/` to a `gh-pages` branch, with the Pages
source switched to that branch. The web resume repository already publishes
this way. `CNAME` (`blog.damecasol.com`) and `.nojekyll` must be written into
the published output — without them the custom domain is dropped and Jekyll
hides Astro's `_astro/` directory.

**Do not change `runs-on` before the runner reports Ready.** A queued job would
never be assigned a runner and publishing would stop. The switch is sequenced
in `homelab-gitops` `.ai/projects/arc-blog-onboarding/RUNBOOK-phase2.md`; that
project's `CHARTER.md` holds current status and the open questions.
