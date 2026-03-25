import { cache } from "react";

import type { CheckoutPlansDoc } from "../app/checkout/types";
import type { DemoQuery } from "../tina/__generated__/types";
import client from "../tina/__generated__/client";
import plansFallback from "../content/demo/checkout-plans.json";

function normalizeFromJson(raw: typeof plansFallback): CheckoutPlansDoc {
  const plans = (raw.plans ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    price: p.price,
    period: p.period ?? null,
    badge: p.badge?.trim() ? p.badge : null,
    featured: p.featured ?? false,
    features: (p.features ?? []).filter(
      (f): f is string => typeof f === "string" && f.length > 0,
    ),
  }));
  return {
    sectionTitle: raw.sectionTitle,
    sectionSubtitle: raw.sectionSubtitle ?? null,
    ctaLabel: raw.ctaLabel ?? null,
    pageTitle: raw.pageTitle ?? null,
    pageDescription: raw.pageDescription ?? null,
    plans,
  };
}

/** Maps Tina `demo` document to the shared checkout/plans shape. */
export function mapDemoToCheckoutPlansDoc(
  d: DemoQuery["demo"] | null | undefined,
): CheckoutPlansDoc | null {
  if (!d) return null;
  return {
    sectionTitle: d.sectionTitle,
    sectionSubtitle: d.sectionSubtitle ?? null,
    ctaLabel: d.ctaLabel ?? null,
    pageTitle: d.pageTitle ?? null,
    pageDescription: d.pageDescription ?? null,
    plans: (d.plans ?? [])
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? null,
        price: p.price,
        period: p.period ?? null,
        badge: p.badge?.trim() ? p.badge : null,
        featured: p.featured ?? false,
        features: (p.features ?? []).filter(
          (f): f is string => typeof f === "string" && f.length > 0,
        ),
      })),
  };
}

async function loadCheckoutPlansDocUncached(): Promise<CheckoutPlansDoc> {
  try {
    const res = await client.queries.demo({
      relativePath: "checkout-plans.json",
    });
    const hasErrors = Boolean(res.errors?.length);
    const d = res.data?.demo;
    if (d && !hasErrors) {
      const mapped = mapDemoToCheckoutPlansDoc(d);
      if (mapped) return mapped;
    }
  } catch {
    // Local GraphQL / Tina datalayer unavailable — fall back to bundled JSON.
  }

  return normalizeFromJson(plansFallback);
}

export const loadCheckoutPlansDoc = cache(loadCheckoutPlansDocUncached);
