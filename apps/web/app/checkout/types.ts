/** Matches Tina `demo` collection / `checkout-plans.json` (serialized for the client). */
export type CheckoutPlan = {
  id: string;
  name: string;
  description?: string | null;
  price: string;
  period?: string | null;
  badge?: string | null;
  featured?: boolean | null;
  features: string[];
};

export type CheckoutPlansDoc = {
  sectionTitle: string;
  sectionSubtitle?: string | null;
  /** Primary CTA on /plans; empty uses default in UI */
  ctaLabel?: string | null;
  /** SEO / `<title>`; empty uses default */
  pageTitle?: string | null;
  /** Meta description; empty uses default */
  pageDescription?: string | null;
  plans: CheckoutPlan[];
};

export const PLANS_PAGE_DEFAULTS = {
  ctaLabel: "Continue to checkout",
  pageTitle: "Choose your plan",
  pageDescription:
    "Pick a subscription tier, then continue to secure checkout.",
} as const;

export function resolvedPlansCtaLabel(doc: CheckoutPlansDoc): string {
  const t = doc.ctaLabel?.trim();
  return t || PLANS_PAGE_DEFAULTS.ctaLabel;
}

export function resolvedPlansPageTitle(doc: CheckoutPlansDoc): string {
  const t = doc.pageTitle?.trim();
  return t || PLANS_PAGE_DEFAULTS.pageTitle;
}

export function resolvedPlansPageDescription(doc: CheckoutPlansDoc): string {
  const t = doc.pageDescription?.trim();
  return t || PLANS_PAGE_DEFAULTS.pageDescription;
}
