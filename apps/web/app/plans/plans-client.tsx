"use client";

import { useMemo, useState } from "react";
import { tinaField, useTina } from "tinacms/dist/react";

import type { DemoQuery } from "../../tina/__generated__/types";

type TinaDemoDoc = NonNullable<DemoQuery["demo"]>;
import { mapDemoToCheckoutPlansDoc } from "../../lib/checkout-plans-map";
import type { CheckoutPlansDoc } from "../checkout/types";
import { resolvedPlansCtaLabel } from "../checkout/types";
import { PlanPicker } from "./PlanPicker";

const btnPrimary =
  "inline-flex min-h-11 min-w-[220px] cursor-pointer items-center justify-center rounded-xl border-0 bg-blue-600 px-8 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none";

function field(
  editable: boolean,
  obj: unknown,
  prop: string,
  index?: number,
) {
  return editable && obj && typeof obj === "object"
    ? tinaField(obj as Parameters<typeof tinaField>[0], prop as never, index)
    : undefined;
}

function PlansView({
  doc,
  editable,
  tinaDemo,
}: {
  doc: CheckoutPlansDoc;
  editable: boolean;
  tinaDemo?: TinaDemoDoc | null;
}) {
  const root = tinaDemo ?? null;

  const defaultId = useMemo(() => {
    const featured = doc.plans.find((p) => p.featured);
    return featured?.id ?? doc.plans[0]?.id ?? "";
  }, [doc.plans]);

  const [selectedId, setSelectedId] = useState(defaultId);

  const checkoutHref = `/checkout?plan=${encodeURIComponent(selectedId)}`;

  const canContinue =
    Boolean(selectedId) && doc.plans.some((p) => p.id === selectedId);

  const ctaText = resolvedPlansCtaLabel(doc);

  function goToCheckout() {
    if (!canContinue || typeof window === "undefined") return;
    const url = new URL(checkoutHref, window.location.origin).href;
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.assign(url);
        return;
      }
    } catch {
      // Sandboxed parent — fall back to same frame.
    }
    window.location.assign(url);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-slate-100 to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-8 mx-auto max-w-6xl">
        <header className="flex flex-col items-center justify-center mb-10 text-center gap-4">
          <h1
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
            data-tina-field={root ? field(editable, root, "sectionTitle") : undefined}
          >
            {doc.sectionTitle}
          </h1>
          {doc.sectionSubtitle || editable ? (
            <p
              className="mx-auto mt-3 max-w-2xl text-balance text-slate-600"
              data-tina-field={
                root ? field(editable, root, "sectionSubtitle") : undefined
              }
            >
              {doc.sectionSubtitle ?? ""}
            </p>
          ) : null}
        </header>

        <PlanPicker
          doc={doc}
          selectedId={selectedId}
          onSelect={setSelectedId}
          editable={editable}
          tinaDemo={root ?? undefined}
        />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            disabled={!canContinue}
            onClick={(e) => {
              e.stopPropagation();
              goToCheckout();
            }}
            className={btnPrimary}
            data-tina-field={root ? field(editable, root, "ctaLabel") : undefined}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlansTinaConnected({
  query,
  variables,
  data,
}: {
  query: string;
  variables: { relativePath: string };
  data: DemoQuery;
}) {
  const { data: tinaData } = useTina({ query, variables, data });
  const demo = tinaData?.demo;
  const doc = useMemo(() => mapDemoToCheckoutPlansDoc(demo), [demo]);

  if (!doc) {
    return (
      <p className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Plans content is missing. Add{" "}
        <code className="rounded bg-amber-100 px-1 font-mono text-xs">
          content/demo/checkout-plans.json
        </code>{" "}
        and ensure the Tina datalayer can load the{" "}
        <code className="rounded bg-amber-100 px-1 font-mono text-xs">demo</code>{" "}
        collection.
      </p>
    );
  }

  return <PlansView doc={doc} editable tinaDemo={demo} />;
}

function PlansStatic({ plans }: { plans: CheckoutPlansDoc }) {
  return (
    <>
      <PlansView doc={plans} editable={false} />
      <p className="mx-auto mt-8 max-w-xl text-center text-xs text-slate-500">
        Showing{" "}
        <code className="rounded bg-slate-100 px-1 font-mono text-[0.7rem]">
          content/demo/checkout-plans.json
        </code>{" "}
        from disk. For Tina sidebar editing on this page, run{" "}
        <code className="rounded bg-slate-100 px-1 font-mono text-[0.7rem]">
          tinacms dev
        </code>{" "}
        (or fix the datalayer) so the GraphQL API can load{" "}
        <code className="rounded bg-slate-100 px-1 font-mono text-[0.7rem]">
          demo
        </code>
        .
      </p>
    </>
  );
}

export type PlansClientProps =
  | {
      tina: {
        query: string;
        variables: { relativePath: string };
        data: DemoQuery;
      };
    }
  | { plans: CheckoutPlansDoc };

export default function PlansClient(props: PlansClientProps) {
  if ("tina" in props) {
    return <PlansTinaConnected {...props.tina} />;
  }
  return <PlansStatic plans={props.plans} />;
}
