import { defineConfig, type Config } from "tinacms";

// Tina Cloud (app.tina.io) must use the same GitHub repo as Vercel. Tokens alone are not enough:
// connect the repo, index your deploy branch (e.g. main), and under Configuration → Advanced Settings
// set "Path To Tina" to `apps/web` (this monorepo’s `tina/` folder is not at the repository root).

// Must match a branch indexed in Tina Cloud for the linked GitHub repo.
// Optional override: TINA_BRANCH or GITHUB_BRANCH (e.g. CI). Vercel sets VERCEL_GIT_COMMIT_REF.
const branch =
  process.env.TINA_BRANCH?.trim() ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

/** When true (see `package.json` `dev` script), skip Tina Cloud credentials so the admin uses the local GraphQL server without logging in. */
const isLocalTina =
  process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
  process.env.TINA_PUBLIC_IS_LOCAL === "1";

export default defineConfig({
  branch,

  // Tina Cloud — omit when running local `tinacms dev` so you are not prompted to log in
  clientId: isLocalTina
    ? null
    : (process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? null),
  token: isLocalTina ? null : (process.env.TINA_TOKEN ?? null),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "homeIntro",
        label: "Home intro",
        path: "content/home",
        format: "json",
        fields: [
          {
            type: "string",
            name: "badge",
            label: "Badge label",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Headline",
            required: true,
          },
          {
            type: "string",
            name: "intro",
            label: "Intro paragraph",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "steps",
            label: "Steps",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "href",
                label: "Link (optional)",
                description: "Internal path, e.g. /admin or /demo/blog/hello-world",
              },
              {
                type: "string",
                name: "linkLabel",
                label: "Link label (optional)",
              },
            ],
          },
        ],
        ui: {
          router: () => "/",
        },
      },
      {
        name: "demo",
        label: "Plans (Choose your plan)",
        path: "content/demo",
        format: "json",
        fields: [
          {
            type: "string",
            name: "sectionTitle",
            label: "Section title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "sectionSubtitle",
            label: "Section subtitle",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "ctaLabel",
            label: "Primary button label",
            description: "e.g. Continue to checkout",
          },
          {
            type: "string",
            name: "pageTitle",
            label: "Page title (SEO / browser tab)",
            description: "Optional; defaults if empty",
          },
          {
            type: "string",
            name: "pageDescription",
            label: "Meta description (SEO)",
            ui: { component: "textarea" },
            description: "Optional; defaults if empty",
          },
          {
            type: "object",
            name: "plans",
            label: "Plans",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ?? "Plan",
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "Plan id",
                required: true,
                description: "Stable slug, e.g. starter",
              },
              {
                type: "string",
                name: "name",
                label: "Plan name",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "price",
                label: "Price (display)",
                required: true,
                description: "e.g. $9 or $29",
              },
              {
                type: "string",
                name: "period",
                label: "Period label",
                description: "e.g. /month",
              },
              {
                type: "string",
                name: "badge",
                label: "Badge (optional)",
                description: "e.g. Popular",
              },
              {
                type: "boolean",
                name: "featured",
                label: "Featured (recommended)",
              },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true,
              },
            ],
          },
        ],
        ui: {
          /** Copy & pricing for /plans; same plan ids power checkout. Preview → plan picker. */
          router: () => "/plans",
        },
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "PromoBanner",
                label: "Promo Banner",
                fields: [
                  {
                    name: "headline",
                    label: "Headline",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "bgColor",
                    label: "Background Color",
                    type: "string",
                    options: ["bg-blue-600", "bg-white-600", "bg-black"],
                  },
                  {
                    name: "textColor",
                    label: "Text Color",
                    type: "string",
                    options: ["text-white", "text-black"],
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
    ],
  },
}) as unknown as Config;
