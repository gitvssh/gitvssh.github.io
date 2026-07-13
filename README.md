# gitvssh.github.io

Public Astro source for `https://gitvssh.github.io/`.

This repository contains only material required to build and operate the
public blog:

- Astro application source
- published Markdown posts
- final web images used by published posts
- public deployment and validation scripts

Research packets, drafts, claims, storyboards, prompts, QA records, manifests,
intermediate images, credentials, and the PARA vault belong to the separate
local PR Comic studio and must not be added here.

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

## Content

Published posts live in `src/content/posts/<slug>/`. Each folder contains one
Markdown entry and only the final public images for that post. Frontmatter is
validated by `src/content.config.ts`.

Promotion from the private studio is explicit. Run `pnpm check` before every
commit so accidental source packets or production artifacts cannot enter the
public history.
