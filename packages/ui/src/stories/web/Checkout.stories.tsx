import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { CheckoutView } from "../../../../../apps/web/app/checkout/checkout-client";

import { friendlyPlansArgTypes } from "./plans-doc-story-arg-types";
import {
  buildPlansDocFromFriendlyArgs,
  friendlyDefaultsFromFixture,
  tierIds,
} from "./plans-doc-story-builders";

type CheckoutStoryArgs = ReturnType<typeof friendlyDefaultsFromFixture> & {
  planParam: string;
  noPlans: boolean;
};

const planParamOptions = [...tierIds, "", "not-a-real-plan"];

const meta = {
  title: "Web/Checkout",
  args: {
    ...friendlyDefaultsFromFixture(),
    planParam: "pro",
    noPlans: false,
  },
  argTypes: {
    ...friendlyPlansArgTypes,
    planParam: {
      name: "Plan in URL",
      control: "select",
      options: planParamOptions,
      table: { category: "Checkout" },
    },
    noPlans: {
      name: "No plans (empty state)",
      control: "boolean",
      table: { category: "Checkout" },
    },
  },
  render: (args: CheckoutStoryArgs) => (
    <CheckoutView
      plans={buildPlansDocFromFriendlyArgs(args)}
      planParam={args.planParam}
    />
  ),
  parameters: {
    layout: "fullscreen" as const,
    docs: {
      description: {
        component:
          "Checkout shell and payment form (`CheckoutView`). Use the controls to tweak copy and pricing like the Button example—no raw JSON.",
      },
    },
  },
} satisfies Meta<CheckoutStoryArgs>;

export default meta;

type Story = StoryObj<CheckoutStoryArgs>;

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
    noPlans: true,
    planParam: "",
  },
};
