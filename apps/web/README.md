This is a [Next.js](https://nextjs.org) app in a Turborepo monorepo, with **TinaCMS**, **Storybook** (`@repo/ui`), and **Recurly** on checkout.

## Demo

**Run the app (Tina + Next)** — from the monorepo root:

```bash
cd apps/web
npm run dev
```

This runs `tinacms dev` with Next on [http://localhost:3000](http://localhost:3000). Use the admin at [http://localhost:3000/admin](http://localhost:3000/admin).

**Click path for talks**

| URL | What to show |
| --- | --- |
| `/` | Home intro (`content/home/intro.json`, collection **Home intro**) |
| `/admin` | Tina sidebar, collections, preview |
| `/plans` | **DEMO** collection — choose a plan (`content/demo/checkout-plans.json`), then continue to checkout |
| `/checkout` | Payment form (**Recurly**); use `?plan=starter` (or `pro`, `enterprise`) after picking on `/plans` |
| `/demo/blog/hello-world` | Sample **Posts** MDX |
| `/demo/showcase` | Redirects to `/plans` (old bookmarks) |

**Storybook** (PromoBanner and other UI) — from the monorepo root:

```bash
npm run storybook
```

Opens [http://localhost:6006](http://localhost:6006).

**Environment variables**

- **Tina (production / Vercel builds):** `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`. For local dev, use **`npm run dev`** (not `next dev` alone): it sets `TINA_PUBLIC_IS_LOCAL=true`, and `tina/config.ts` skips those credentials so the admin does **not** open the Tina Cloud login screen.
- **Recurly:** `NEXT_PUBLIC_RECURLY_PUBLIC_KEY` — use a [Recurly test public key](https://docs.recurly.com/docs/getting-started) so card tokenization works during the demo (replace the placeholder in code is not enough).

Tina Cloud monorepos: in [app.tina.io](https://app.tina.io) set **Path to Tina** to `apps/web`. See comments in `tina/config.ts`.

If `tinacms build` fails with **Datalayer server is busy on port 9000**, stop the other process (often a running `npm run dev`) or run the build with another port, for example: `npx tinacms build --local --skip-cloud-checks --datalayer-port 9010`.

## Getting Started

From **this directory** (`apps/web`):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
