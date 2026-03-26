import type { FriendlyPlansDocArgs } from "./plans-doc-story-builders";
import { tierIds } from "./plans-doc-story-builders";

const text = { control: "text" as const };
const featuresControl = { control: { type: "text" as const, rows: 5 } };

/** Flat controls grouped by category (similar to simple Button-style stories). */
export const friendlyPlansArgTypes: Partial<{
  [K in keyof FriendlyPlansDocArgs]: {
    name?: string;
    control: "text" | "select" | "boolean" | { type: "text"; rows: number };
    options?: string[];
    table?: { category?: string };
  };
}> = {
  sectionTitle: {
    name: "Section title",
    ...text,
    table: { category: "Page" },
  },
  sectionSubtitle: {
    name: "Section subtitle",
    ...text,
    table: { category: "Page" },
  },
  ctaLabel: {
    name: "CTA label",
    ...text,
    table: { category: "Page" },
  },
  pageTitle: {
    name: "Page title (SEO)",
    ...text,
    table: { category: "Page" },
  },
  pageDescription: {
    name: "Meta description",
    ...text,
    table: { category: "Page" },
  },
  featuredPlanId: {
    name: "Featured tier",
    control: "select",
    options: [...tierIds],
    table: { category: "Page" },
  },
  starterName: {
    name: "Name",
    ...text,
    table: { category: "Starter" },
  },
  starterDescription: {
    name: "Description",
    ...text,
    table: { category: "Starter" },
  },
  starterPrice: {
    name: "Price",
    ...text,
    table: { category: "Starter" },
  },
  starterPeriod: {
    name: "Period",
    ...text,
    table: { category: "Starter" },
  },
  starterBadge: {
    name: "Badge",
    ...text,
    table: { category: "Starter" },
  },
  starterFeatures: {
    name: "Features (one per line)",
    ...featuresControl,
    table: { category: "Starter" },
  },
  proName: {
    name: "Name",
    ...text,
    table: { category: "Pro" },
  },
  proDescription: {
    name: "Description",
    ...text,
    table: { category: "Pro" },
  },
  proPrice: {
    name: "Price",
    ...text,
    table: { category: "Pro" },
  },
  proPeriod: {
    name: "Period",
    ...text,
    table: { category: "Pro" },
  },
  proBadge: {
    name: "Badge",
    ...text,
    table: { category: "Pro" },
  },
  proFeatures: {
    name: "Features (one per line)",
    ...featuresControl,
    table: { category: "Pro" },
  },
  enterpriseName: {
    name: "Name",
    ...text,
    table: { category: "Enterprise" },
  },
  enterpriseDescription: {
    name: "Description",
    ...text,
    table: { category: "Enterprise" },
  },
  enterprisePrice: {
    name: "Price",
    ...text,
    table: { category: "Enterprise" },
  },
  enterprisePeriod: {
    name: "Period",
    ...text,
    table: { category: "Enterprise" },
  },
  enterpriseBadge: {
    name: "Badge",
    ...text,
    table: { category: "Enterprise" },
  },
  enterpriseFeatures: {
    name: "Features (one per line)",
    ...featuresControl,
    table: { category: "Enterprise" },
  },
};
