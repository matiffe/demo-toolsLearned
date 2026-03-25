"use client";

import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";

export type HomeIntroDoc = {
  badge: string;
  title: string;
  intro?: string | null;
  steps?: Array<{
    title: string;
    body?: string | null;
    href?: string | null;
    linkLabel?: string | null;
  } | null> | null;
};

type HomeIntroData = {
  homeIntro?: HomeIntroDoc;
};

type TinaProps = {
  query: string;
  variables: { relativePath: string };
  data: HomeIntroData;
};

function HomeIntroCard({
  doc,
  editable,
}: {
  doc: HomeIntroDoc;
  editable: boolean;
}) {
  const f = (obj: unknown, prop: string, index?: number) =>
    editable && obj && typeof obj === "object"
      ? tinaField(obj as Parameters<typeof tinaField>[0], prop as never, index)
      : undefined;

  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded-3xl border border-violet-100 bg-linear-to-b from-violet-50/80 to-white p-8 shadow-lg shadow-violet-100/60 ring-1 ring-violet-100/80">
      <p
        className="mb-2 w-fit inline-flex items-center gap-2 rounded-full bg-violet-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700"
        data-tina-field={f(doc, "badge")}
      >
        <span aria-hidden>✦</span>
        {doc.badge}
      </p>
      <h1
        className="mb-2 text-2xl font-bold tracking-tight text-slate-900"
        data-tina-field={f(doc, "title")}
      >
        {doc.title}
      </h1>
      <p
        className="mb-6 text-sm leading-relaxed text-slate-600"
        data-tina-field={f(doc, "intro")}
      >
        {doc.intro}
      </p>
      <ul className="flex flex-col gap-4">
        {doc.steps?.map((step, i) => {
          if (!step) return null;
          return (
            <li
              key={i}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm"
              data-tina-field={f(doc, "steps", i)}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  className="font-semibold text-slate-900"
                  data-tina-field={f(step, "title")}
                >
                  {step.title}
                </h2>
                <p
                  className="mt-1 text-sm leading-relaxed text-slate-600"
                  data-tina-field={f(step, "body")}
                >
                  {step.body}
                </p>
                {step.href?.trim() && step.linkLabel?.trim() && (
                  <Link
                    href={step.href}
                    className="mt-2 inline-flex text-sm font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 transition hover:text-violet-900 hover:decoration-violet-500"
                    data-tina-field={f(step, "href")}
                  >
                    <span data-tina-field={f(step, "linkLabel")}>
                      {step.linkLabel}
                    </span>
                    {" →"}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function TinaDemoIntroStatic({ doc }: { doc: HomeIntroDoc }) {
  return <HomeIntroCard doc={doc} editable={false} />;
}

export function TinaDemoIntro({ query, variables, data }: TinaProps) {
  const { data: tinaData } = useTina({ query, variables, data });
  const doc = tinaData?.homeIntro;

  if (!doc) {
    return (
      <p className="max-w-lg rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Home intro content is missing. Add{" "}
        <code className="rounded bg-amber-100 px-1 font-mono text-xs">
          content/home/intro.json
        </code>{" "}
        and ensure{" "}
        <code className="rounded bg-amber-100 px-1 font-mono text-xs">
          tinacms dev
        </code>{" "}
        is running.
      </p>
    );
  }

  return <HomeIntroCard doc={doc} editable />;
}
