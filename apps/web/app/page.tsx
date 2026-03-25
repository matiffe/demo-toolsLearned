import Link from "next/link";

import client from "../tina/__generated__/client";
import introFallback from "../content/home/intro.json";
import {
  TinaDemoIntro,
  TinaDemoIntroStatic,
  type HomeIntroDoc,
} from "./components/TinaDemoIntro";

export default async function Home() {
  let tinaProps: {
    query: string;
    variables: { relativePath: string };
    data: { homeIntro?: HomeIntroDoc };
  } | null = null;

  try {
    const res = await client.queries.homeIntro({ relativePath: "intro.json" });
    const hasErrors = Boolean(res.errors?.length);
    if (res.data?.homeIntro && !hasErrors) {
      tinaProps = {
        query: res.query,
        variables: res.variables,
        data: res.data,
      };
    }
  } catch {
    // Tina datalayer not running, or content not indexed yet — use JSON on disk below.
  }

  const doc = introFallback as HomeIntroDoc;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-linear-to-b from-slate-50 to-white px-6 py-16 text-slate-900">
      <main className="flex w-full max-w-2xl flex-col items-center gap-3">
        {tinaProps ? (
          <TinaDemoIntro
            query={tinaProps.query}
            variables={tinaProps.variables}
            data={tinaProps.data}
          />
        ) : (
          <>
            <TinaDemoIntroStatic doc={doc} />
            <p className="max-w-lg text-center text-xs text-slate-500">
              Showing{" "}
              <code className="rounded bg-slate-100 px-1 font-mono text-[0.7rem]">
                content/home/intro.json
              </code>{" "}
              from disk. For Tina sidebar editing, run{" "}
              <code className="rounded bg-slate-100 px-1 font-mono text-[0.7rem]">
                tinacms dev
              </code>{" "}
              (or fix the datalayer) so the GraphQL API can load{" "}
              <code className="rounded bg-slate-100 px-1 font-mono text-[0.7rem]">
                homeIntro
              </code>
              .
            </p>
          </>
        )}
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-slate-200/80 pt-8"
          aria-label="Quick links"
        >
          <Link
            href="/plans"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold shadow-sm transition hover:bg-slate-800"
          >
            <span className="text-white">Choose your plan</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
