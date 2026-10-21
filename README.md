# Javier's Space — javierdamiani.com

Personal portfolio of **Javier Damiani**, frontend developer from Peru. The site is a small desktop OS in the
browser: menu bar, wallpaper intro, desktop shortcuts, a dock and draggable windows for Projects, About, Journey,
Arcade (Tic Tac Toe and Pocket Drive), Terminal, Contact and Quick Look. English/Spanish, three wallpapers
(light, peach, night).

It ships as pre-rendered static HTML with system fonts only and minimal JavaScript.

## Stack

- [Astro 7](https://astro.build) (static output) + [React 19](https://react.dev) islands
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` (strict mode, see below)
- TypeScript (strict), Vitest, Playwright (chromium), Prettier
- Node 24 + npm

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server at `http://localhost:4321`     |
| `npm run build`   | Static build into `dist/`                 |
| `npm run preview` | Serve the production build locally        |
| `npm run check`   | `astro check` (types + Astro diagnostics) |
| `npm test`        | Unit tests (Vitest, `tests/unit`)         |
| `npm run e2e`     | Smoke tests (Playwright, `tests/e2e`)     |
| `npm run verify`  | `check` + `test` + `build`                |
| `npm run format`  | Prettier over the repo                    |

## Structure

```
.github/workflows/   ci.yml (main) · deploy-pages.yml (public)
public/              favicon, icons, manifest, robots.txt, cv/*.pdf
src/
  assets/            memoji + project screenshots (optimized at build time)
  styles/global.css  the ONLY stylesheet (Tailwind 4 theme + tokens)
  types.ts           shared types
  data/              site.ts, projects.ts, project-images.ts, journey.ts  ← content
  i18n/              dict.ts (UI strings EN/ES), arcade.ts
  lib/               pure logic: storage, windows, terminal, tictactoe, drive
  components/os/     desktop shell (menu bar, dock, windows…)
  components/views/  window contents (projects, about, journey, arcade…)
  layouts/ pages/    Base.astro, index.astro
tests/unit/          Vitest
tests/e2e/           Playwright
```

## Tailwind 4, strict

1. One stylesheet only: `src/styles/global.css` (`@import "tailwindcss"`, `@theme` tokens, `@custom-variant` for
   wallpapers, a minimal `@layer base`, and `@utility` only for patterns repeated 3+ times).
2. Not allowed: `tailwind.config.*`, `@tailwind`, `@apply`, other `.css` files, CSS modules, CSS-in-JS, `<style>`
   blocks, and `style=` attributes (except runtime window geometry and the game canvas).
3. Everything else is utility classes, arbitrary values and variants (`hover:`, `aria-selected:`, `max-sm:`…).
4. Wallpapers: `data-wallpaper="light|peach|night"` on `<html>`, used through the `peach:` and `night:` variants.
5. Breakpoints: `xs` 391px, `sm` 761px, `md` 901px, `lg` 1121px (`max-sm:` = phones ≤760px).
6. System font stacks only (`--font-sans`, `--font-display`, `--font-mono`). No web fonts.

## Updating content

- Projects: `src/data/projects.ts` (order, kind `hero|card|row|archive`, EN/ES copy, tags, links).
- Timeline: `src/data/journey.ts`. Site-wide info (email, social links, CV paths): `src/data/site.ts`.
- UI strings: `src/i18n/dict.ts`. `en` and `es` must have the same keys (a unit test checks it). Add keys, never
  rename or remove them. Use `\n` for line breaks.
- Images: drop them in `src/assets/projects/<project>/` and import them in `src/data/project-images.ts` (keyed by project id, with EN/ES alts). Only `index.astro` imports that file, so Astro converts them to WebP at build time and the original PNGs never reach the client.
- CVs: `public/cv/`.

Run `npm run verify` before pushing.

## Branches and deploy

- `main` — development. CI runs check, unit tests, build and e2e on every push/PR.
- `public` — production. Promote with a fast-forward:

  ```sh
  git checkout public && git merge --ff-only main && git push
  git checkout main
  ```

- **GitHub Pages**: pushing to `public` runs `deploy-pages.yml` (`withastro/action` + `actions/deploy-pages`). In
  the repo settings set _Pages → Source_ to **GitHub Actions** and configure the custom domain `javierdamiani.com`.
- **Alternative (Vercel / Netlify)**: point the production branch to `public`, build command `npm run build`,
  output directory `dist`, Node 24.

## Notes

- **TypeScript 6**: the project pins `typescript@6`. TypeScript 7 cannot be used yet because `@astrojs/check`
  requires `typescript ^5 || ^6`. `tsconfig.json` uses `paths` (`@/*` → `src/*`) without `baseUrl`, which is
  deprecated in TS 6.
- `astro preview` may start detached when run by an agent; Playwright calls it with `--ignore-lock`. Use
  `npx astro preview stop` to stop a background server.
