import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import type { CheckoutPlansDoc } from "../../../../../apps/web/app/checkout/types";
import PlansClient from "../../../../../apps/web/app/plans/plans-client";
import { PlanPicker } from "../../../../../apps/web/app/plans/PlanPicker";

import fixture from "../../../../../apps/web/content/demo/checkout-plans.json";

const plansDoc = fixture as CheckoutPlansDoc;

const featuredId =
  plansDoc.plans.find((p) => p.featured)?.id ?? plansDoc.plans[0]?.id ?? "";

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

type Story = StoryObj;

export const FullPage: Story = {
  name: "Full page (static JSON)",
  render: () => <PlansClient plans={plansDoc} />,
};

function PlanPickerCanvas({ initialId }: { initialId: string }) {
  const [selectedId, setSelectedId] = useState(initialId);
  return (
    <div className="min-h-[480px] bg-linear-to-b from-slate-100 to-slate-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <PlanPicker
          doc={plansDoc}
          selectedId={selectedId}
          onSelect={setSelectedId}
          editable={false}
        />
      </div>
    </div>
  );
}

export const PlanPickerStory: Story = {
  name: "Plan picker (featured selected)",
  render: () => <PlanPickerCanvas initialId={featuredId} />,
};

export const StarterSelected: Story = {
  name: "Plan picker (starter selected)",
  render: () => <PlanPickerCanvas initialId="starter" />,
};

export const EnterpriseSelected: Story = {
  name: "Plan picker (enterprise selected)",
  render: () => <PlanPickerCanvas initialId="enterprise" />,
};
