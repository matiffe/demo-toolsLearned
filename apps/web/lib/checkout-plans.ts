import { cache } from "react";

import type { CheckoutPlansDoc } from "../app/checkout/types";
import client from "../tina/__generated__/client";
import plansFallback from "../content/demo/checkout-plans.json";

import { mapDemoToCheckoutPlansDoc } from "./checkout-plans-map";

export { mapDemoToCheckoutPlansDoc };

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
