import type { CheckoutPlansDoc } from "../app/checkout/types";
import type { DemoQuery } from "../tina/__generated__/types";

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
