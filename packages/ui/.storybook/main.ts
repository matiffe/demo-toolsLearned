import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

import { dirname, join } from "path";

import { fileURLToPath } from "url";

const storybookDir = dirname(fileURLToPath(import.meta.url));

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  // @recurly/react-recurly's RecurlyProvider throws if window.recurly is missing.
  // The Next app loads these in apps/web/app/checkout/layout.tsx; Storybook must too.
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css" />
    <script src="https://js.recurly.com/v4/recurly.js"></script>
  `,
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  async viteFinal(config) {
    return mergeConfig(config, {
      // Next.js app code uses `jsx: "preserve"`; when Storybook bundles `apps/web`
      // from outside the UI package, esbuild can emit `React.createElement` without
      // a `React` import, causing "React is not defined" in Chromatic.
      esbuild: { jsx: "automatic" },
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "next/link": join(storybookDir, "mocks/next-link.tsx"),
          "next/navigation": join(storybookDir, "mocks/next-navigation.ts"),
        },
      },
    });
  },
};
export default config;