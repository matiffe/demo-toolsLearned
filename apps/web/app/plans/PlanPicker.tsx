"use client";

import { tinaField } from "tinacms/dist/react";

import type { DemoQuery } from "../../tina/__generated__/types";
import type { CheckoutPlansDoc } from "../checkout/types";

type TinaDemoDoc = NonNullable<DemoQuery["demo"]>;

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

export function PlanPicker({
  doc,
  selectedId,
  onSelect,
  editable = false,
  tinaDemo,
}: {
  doc: CheckoutPlansDoc;
  selectedId: string;
  onSelect: (id: string) => void;
  editable?: boolean;
  tinaDemo?: TinaDemoDoc | null;
}) {
  const { plans } = doc;
  const root = tinaDemo ?? null;

  return (
    <div
      className="grid gap-5 md:grid-cols-3"
      role="radiogroup"
      aria-label="Subscription plan"
    >
      {plans.map(
        (
          {
            id,
            name,
            description,
            price,
            period,
            badge,
            featured,
            features,
          },
          i,
        ) => {
          const planNode = root?.plans?.[i] ?? null;
          const selected = id === selectedId;
          const featuredPlan = featured === true;

          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(id)}
              data-tina-field={
                root && planNode
                  ? field(editable, root, "plans", i)
                  : undefined
              }
              className={`cursor-pointer relative flex flex-col rounded-2xl border-2 p-6 text-left transition outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                selected
                  ? "border-blue-600 bg-white shadow-lg shadow-blue-100 ring-1 ring-blue-100"
                  : "border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-md"
              } ${featuredPlan && !selected ? "border-blue-200/80" : ""} ${
                featuredPlan ? "md:-mt-1 md:shadow-xl" : ""
              }`}
            >
              {badge ? (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white shadow-sm"
                  data-tina-field={
                    planNode ? field(editable, planNode, "badge") : undefined
                  }
                >
                  {badge}
                </span>
              ) : null}
              <span
                className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                data-tina-field={
                  planNode ? field(editable, planNode, "name") : undefined
                }
              >
                {name}
              </span>
              <p
                className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900"
                data-tina-field={
                  planNode ? field(editable, planNode, "price") : undefined
                }
              >
                {price}
                <span
                  className="text-lg font-semibold text-slate-500"
                  data-tina-field={
                    planNode ? field(editable, planNode, "period") : undefined
                  }
                >
                  {period ?? ""}
                </span>
              </p>
              {description || (editable && planNode) ? (
                <p
                  className="mt-2 text-sm leading-relaxed text-slate-600"
                  data-tina-field={
                    planNode
                      ? field(editable, planNode, "description")
                      : undefined
                  }
                >
                  {description ?? ""}
                </p>
              ) : null}
              <span
                className="sr-only"
                data-tina-field={
                  planNode ? field(editable, planNode, "featured") : undefined
                }
              >
                {featured ? "Featured plan" : "Standard plan"}
              </span>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-700">
                {features.map((f, fi) => (
                  <li
                    key={`${id}-f-${fi}`}
                    className="flex gap-2"
                    data-tina-field={
                      planNode
                        ? field(editable, planNode, "features", fi)
                        : undefined
                    }
                  >
                    <span className="mt-0.5 text-emerald-500" aria-hidden>
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        },
      )}
    </div>
  );
}
