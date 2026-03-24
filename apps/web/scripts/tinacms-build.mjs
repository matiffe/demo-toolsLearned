import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");

/** Must stay in sync with `branch` in apps/web/tina/config.ts */
function resolveTinaBranch() {
  return (
    process.env.TINA_BRANCH?.trim() ||
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main"
  );
}

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

if (hasTinaCloud) {
  const branch = resolveTinaBranch();
  console.log(
    `[Tina] Tina Cloud branch: "${branch}" (from TINA_BRANCH / GITHUB_BRANCH / VERCEL_GIT_COMMIT_REF / HEAD, else main).`
  );
  console.log(
    `[Tina] If builds fail with "branch is not on Tina Cloud", index that branch in https://app.tina.io/ (Project → Configuration → Branches) or set TINA_BRANCH in Vercel to a branch that is already indexed.\n`
  );
}

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

const code = result.status === null ? 1 : result.status;
if (code !== 0 && hasTinaCloud) {
  const ref = resolveTinaBranch();
  console.error(`
[Tina] tinacms build failed. If you see "branch is not on Tina Cloud" for "${ref}":
  • In https://app.tina.io/ → your project → Configuration: the connected GitHub repo must be the same repo Vercel builds (same org/name).
  • Under Branches, add or wait for indexing to finish for "${ref}" (or rename your default branch to match what Tina indexes).
  • Alternatively set env TINA_BRANCH in Vercel to an indexed branch name (e.g. if only "master" is indexed).
  • Ensure apps/web/tina/config.ts and apps/web/tina/tina-lock.json are committed on that branch.

https://tina.io/docs/tinacloud/troubleshooting#3-how-do-i-resolve-errors-caused-by-unindexed-branches
`);
}

process.exit(code);
