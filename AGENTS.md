<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- **After every change, commit and push to `origin/master`.** The owner asked
  for this explicitly; do it without being reminded.
- Deploy target is **Netlify**: `netlify.toml` sets the build, `.nvmrc` pins
  Node 22, and the OpenNext adapter is auto-installed (do not pin it).
- All copy and links live in `config/content.ts`; keep components free of
  hardcoded content.
- Keep the intro scene dependency-free: plain canvas, no image or video assets.
- The résumé lives at `public/Subrat_Ojha_Resume.pdf` and is linked from
  `profile.socials`.
