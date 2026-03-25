import type { Meta, StoryObj } from "@storybook/react";

import type { CheckoutPlansDoc } from "../../../../../apps/web/app/checkout/types";
import { CheckoutView } from "../../../../../apps/web/app/checkout/checkout-client";

import fixture from "../../../../../apps/web/content/demo/checkout-plans.json";

const plansDoc = fixture as CheckoutPlansDoc;

const emptyPlansDoc: CheckoutPlansDoc = {
  sectionTitle: "",
  sectionSubtitle: "",
  ctaLabel: null,
  pageTitle: null,
  pageDescription: null,
  plans: [],
};

const meta = {
  title: "Web/Checkout",
  parameters: {
    layout: "fullscreen" as const,
    docs: {
      description: {
        component:
          "Checkout shell and payment form (`CheckoutView`), using the same demo plans JSON as production.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const ProPlan: Story = {
  name: "Featured plan (Pro)",
  render: () => <CheckoutView plans={plansDoc} planParam="pro" />,
};

export const StarterPlan: Story = {
  name: "Starter plan",
  render: () => <CheckoutView plans={plansDoc} planParam="starter" />,
};

export const UnknownPlanInUrl: Story = {
  name: "Unknown plan in URL",
  render: () => <CheckoutView plans={plansDoc} planParam="not-a-real-plan" />,
};

export const EmptyPlans: Story = {
  name: "No plans configured",
  render: () => <CheckoutView plans={emptyPlansDoc} planParam="" />,
};
