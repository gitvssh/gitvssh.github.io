# Public Blog Agent Instructions

This repository is the public source for `https://gitvssh.github.io/`.

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
