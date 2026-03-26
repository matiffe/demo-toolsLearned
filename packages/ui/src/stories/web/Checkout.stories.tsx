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

const planParamOptions = [
  ...plansDoc.plans.map((p) => p.id),
  "",
  "not-a-real-plan",
];

const meta = {
  component: CheckoutView,
  title: "Web/Checkout",
  args: {
    plans: plansDoc,
    planParam: "pro",
  },
  argTypes: {
    planParam: {
      control: "select",
      options: planParamOptions,
    },
    plans: {
      control: "object",
    },
  },
  parameters: {
    layout: "fullscreen" as const,
    docs: {
      description: {
        component:
          "Checkout shell and payment form (`CheckoutView`), using the same demo plans JSON as production.",
      },
    },
  },
} satisfies Meta<typeof CheckoutView>;

export default meta;

type Story = StoryObj<typeof CheckoutView>;

export const ProPlan: Story = {
  name: "Featured plan (Pro)",
};

export const StarterPlan: Story = {
  name: "Starter plan",
  args: {
    planParam: "starter",
  },
};

export const UnknownPlanInUrl: Story = {
  name: "Unknown plan in URL",
  args: {
    planParam: "not-a-real-plan",
  },
};

export const EmptyPlans: Story = {
  name: "No plans configured",
  args: {
    plans: emptyPlansDoc,
    planParam: "",
  },
};
