import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import type { CheckoutPlansDoc } from "../../../../../apps/web/app/checkout/types";
import PlansClient from "../../../../../apps/web/app/plans/plans-client";
import { PlanPicker } from "../../../../../apps/web/app/plans/PlanPicker";

import fixture from "../../../../../apps/web/content/demo/checkout-plans.json";

const plansDoc = fixture as CheckoutPlansDoc;

const featuredId =
  plansDoc.plans.find((p) => p.featured)?.id ?? plansDoc.plans[0]?.id ?? "";

const planIdOptions = plansDoc.plans.map((p) => p.id);

const meta = {
  title: "Web/Plans",
  parameters: {
    layout: "fullscreen" as const,
    docs: {
      description: {
        component:
          "Pricing page: full `PlansClient` (static JSON) and isolated `PlanPicker` states.",
      },
    },
  },
} satisfies Meta;

export default meta;

type PlansFullPageStory = StoryObj<{ plans: CheckoutPlansDoc }>;

export const FullPage: PlansFullPageStory = {
  name: "Full page (static JSON)",
  args: {
    plans: plansDoc,
  },
  argTypes: {
    plans: {
      control: "object",
    },
  },
  render: (args) => <PlansClient plans={args.plans} />,
};

type PlanPickerStoryArgs = {
  doc: CheckoutPlansDoc;
  initialId: string;
  editable: boolean;
};

function PlanPickerWithState({
  doc,
  initialId,
  editable,
}: PlanPickerStoryArgs) {
  const [selectedId, setSelectedId] = useState(initialId);
  return (
    <PlanPicker
      doc={doc}
      selectedId={selectedId}
      onSelect={setSelectedId}
      editable={editable}
    />
  );
}

function PlanPickerStorybook(args: PlanPickerStoryArgs) {
  return (
    <div className="min-h-[480px] bg-linear-to-b from-slate-100 to-slate-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <PlanPickerWithState key={args.initialId} {...args} />
      </div>
    </div>
  );
}

type PlanPickerStory = StoryObj<PlanPickerStoryArgs>;

const planPickerArgTypes = {
  doc: {
    control: "object" as const,
  },
  initialId: {
    control: "select" as const,
    options: planIdOptions,
  },
  editable: {
    control: "boolean" as const,
  },
};

const defaultPickerArgs: PlanPickerStoryArgs = {
  doc: plansDoc,
  initialId: featuredId,
  editable: false,
};

export const PlanPickerStory: PlanPickerStory = {
  name: "Plan picker (featured selected)",
  args: defaultPickerArgs,
  argTypes: planPickerArgTypes,
  render: (args) => <PlanPickerStorybook {...args} />,
};

export const StarterSelected: PlanPickerStory = {
  name: "Plan picker (starter selected)",
  args: {
    ...defaultPickerArgs,
    initialId: "starter",
  },
  argTypes: planPickerArgTypes,
  render: (args) => <PlanPickerStorybook {...args} />,
};

export const EnterpriseSelected: PlanPickerStory = {
  name: "Plan picker (enterprise selected)",
  args: {
    ...defaultPickerArgs,
    initialId: "enterprise",
  },
  argTypes: planPickerArgTypes,
  render: (args) => <PlanPickerStorybook {...args} />,
};
