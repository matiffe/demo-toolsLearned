import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");

const hasTinaCloud =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim()) &&
  Boolean(process.env.TINA_TOKEN?.trim());

const onVercel = process.env.VERCEL === "1";

if (onVercel && !hasTinaCloud) {
  console.error(`
[Tina] Production builds on Vercel require Tina Cloud credentials.

Add these in Vercel → Project → Settings → Environment Variables (for Production, Preview, and Development as needed):

  NEXT_PUBLIC_TINA_CLIENT_ID
  TINA_TOKEN

Copy the values from https://app.tina.io/ (your Tina project).

Docs: https://tina.io/docs/tinacloud/deployment-options/vercel
`);
  process.exit(1);
}

const args = hasTinaCloud
  ? ["tinacms", "build"]
  : ["tinacms", "build", "--local", "--skip-cloud-checks"];

const result = spawnSync("npx", args, {
  cwd: webRoot,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

if (!hasTinaCloud && !onVercel) {
  console.warn(
    "\n[Tina] Built with --local (no Tina Cloud env). If `next build` fails fetching GraphQL, add NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN to a .env file.\n"
  );
}

process.exit(result.status === null ? 1 : result.status);
