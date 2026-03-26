import type { CheckoutPlan, CheckoutPlansDoc } from "../../../../../apps/web/app/checkout/types";

import fixture from "../../../../../apps/web/content/demo/checkout-plans.json";

const plansDocFixture = fixture as CheckoutPlansDoc;

function parseFeatures(s: string): string[] {
  return s
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function planPatch(
  base: CheckoutPlan,
  overrides: {
    name: string;
    description: string;
    price: string;
    period: string;
    badge: string;
    features: string;
  },
  featured: boolean,
): CheckoutPlan {
  return {
    ...base,
    name: overrides.name,
    description: overrides.description.trim() || null,
    price: overrides.price,
    period: overrides.period.trim() || null,
    badge: overrides.badge.trim() || null,
    featured,
    features: parseFeatures(overrides.features),
  };
}

function planById(
  doc: CheckoutPlansDoc,
  id: string,
): CheckoutPlan | undefined {
  return doc.plans.find((p) => p.id === id);
}

export type FriendlyPlansDocArgs = {
  sectionTitle: string;
  sectionSubtitle: string;
  ctaLabel: string;
  pageTitle: string;
  pageDescription: string;
  featuredPlanId: string;
  starterName: string;
  starterDescription: string;
  starterPrice: string;
  starterPeriod: string;
  starterBadge: string;
  starterFeatures: string;
  proName: string;
  proDescription: string;
  proPrice: string;
  proPeriod: string;
  proBadge: string;
  proFeatures: string;
  enterpriseName: string;
  enterpriseDescription: string;
  enterprisePrice: string;
  enterprisePeriod: string;
  enterpriseBadge: string;
  enterpriseFeatures: string;
};

export function friendlyDefaultsFromFixture(): FriendlyPlansDocArgs {
  const d = plansDocFixture;
  const s = planById(d, "starter")!;
  const p = planById(d, "pro")!;
  const e = planById(d, "enterprise")!;
  const featuredId = d.plans.find((x) => x.featured)?.id ?? "pro";
  return {
    sectionTitle: d.sectionTitle,
    sectionSubtitle: d.sectionSubtitle ?? "",
    ctaLabel: d.ctaLabel ?? "",
    pageTitle: d.pageTitle ?? "",
    pageDescription: d.pageDescription ?? "",
    featuredPlanId: featuredId,
    starterName: s.name,
    starterDescription: s.description ?? "",
    starterPrice: s.price,
    starterPeriod: s.period ?? "",
    starterBadge: s.badge ?? "",
    starterFeatures: s.features.join("\n"),
    proName: p.name,
    proDescription: p.description ?? "",
    proPrice: p.price,
    proPeriod: p.period ?? "",
    proBadge: p.badge ?? "",
    proFeatures: p.features.join("\n"),
    enterpriseName: e.name,
    enterpriseDescription: e.description ?? "",
    enterprisePrice: e.price,
    enterprisePeriod: e.period ?? "",
    enterpriseBadge: e.badge ?? "",
    enterpriseFeatures: e.features.join("\n"),
  };
}

export function buildPlansDocFromFriendlyArgs(
  args: FriendlyPlansDocArgs & { noPlans?: boolean },
): CheckoutPlansDoc {
  if (args.noPlans) {
    return {
      sectionTitle: "",
      sectionSubtitle: "",
      ctaLabel: null,
      pageTitle: null,
      pageDescription: null,
      plans: [],
    };
  }

  const d = plansDocFixture;
  const s0 = planById(d, "starter")!;
  const p0 = planById(d, "pro")!;
  const e0 = planById(d, "enterprise")!;
  const fid = args.featuredPlanId;

  const starter = planPatch(
    s0,
    {
      name: args.starterName,
      description: args.starterDescription,
      price: args.starterPrice,
      period: args.starterPeriod,
      badge: args.starterBadge,
      features: args.starterFeatures,
    },
    fid === "starter",
  );
  const pro = planPatch(
    p0,
    {
      name: args.proName,
      description: args.proDescription,
      price: args.proPrice,
      period: args.proPeriod,
      badge: args.proBadge,
      features: args.proFeatures,
    },
    fid === "pro",
  );
  const enterprise = planPatch(
    e0,
    {
      name: args.enterpriseName,
      description: args.enterpriseDescription,
      price: args.enterprisePrice,
      period: args.enterprisePeriod,
      badge: args.enterpriseBadge,
      features: args.enterpriseFeatures,
    },
    fid === "enterprise",
  );

  const pageTitle = args.pageTitle.trim();
  const pageDescription = args.pageDescription.trim();

  return {
    sectionTitle: args.sectionTitle,
    sectionSubtitle: args.sectionSubtitle.trim() || null,
    ctaLabel: args.ctaLabel.trim() || null,
    pageTitle: pageTitle || null,
    pageDescription: pageDescription || null,
    plans: [starter, pro, enterprise],
  };
}

export const tierIds = ["starter", "pro", "enterprise"] as const;
