import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import type { CheckoutPlansDoc } from "../../../../../apps/web/app/checkout/types";
import PlansClient from "../../../../../apps/web/app/plans/plans-client";
import { PlanPicker } from "../../../../../apps/web/app/plans/PlanPicker";

import { friendlyPlansArgTypes } from "./plans-doc-story-arg-types";
import {
  type FriendlyPlansDocArgs,
  buildPlansDocFromFriendlyArgs,
  friendlyDefaultsFromFixture,
  tierIds,
} from "./plans-doc-story-builders";

const meta = {
  title: "Web/Plans",
  parameters: {
    layout: "fullscreen" as const,
    docs: {
      description: {
        component:
          "Pricing page: full `PlansClient` and isolated `PlanPicker`. Controls are grouped (Page, Starter, Pro, Enterprise) with text fields instead of editing JSON.",
      },
    },
  },
} satisfies Meta;

export default meta;

type PlansFullPageStory = StoryObj<FriendlyPlansDocArgs>;

export const FullPage: PlansFullPageStory = {
  name: "Full page (static JSON)",
  args: friendlyDefaultsFromFixture(),
  argTypes: friendlyPlansArgTypes,
  render: (args) => (
    <PlansClient plans={buildPlansDocFromFriendlyArgs(args)} />
  ),
};

type PlanPickerStoryArgs = FriendlyPlansDocArgs & {
  initialId: string;
  editable: boolean;
};

function PlanPickerWithState({
  doc,
  initialId,
  editable,
}: {
  doc: CheckoutPlansDoc;
  initialId: string;
  editable: boolean;
}) {
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
  const doc = buildPlansDocFromFriendlyArgs(args);
  const { initialId, editable } = args;
  return (
    <div className="min-h-[480px] bg-linear-to-b from-slate-100 to-slate-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <PlanPickerWithState
          key={initialId}
          doc={doc}
          initialId={initialId}
          editable={editable}
        />
      </div>
    </div>
  );
}

type PlanPickerStory = StoryObj<PlanPickerStoryArgs>;

const featuredId =
  friendlyDefaultsFromFixture().featuredPlanId || tierIds[1] || "pro";

const planPickerArgTypes = {
  ...friendlyPlansArgTypes,
  initialId: {
    name: "Initial selection",
    control: "select" as const,
    options: [...tierIds],
    table: { category: "Picker" },
  },
  editable: {
    name: "Tina editable chrome",
    control: "boolean" as const,
    table: { category: "Picker" },
  },
};

const defaultPickerArgs: PlanPickerStoryArgs = {
  ...friendlyDefaultsFromFixture(),
  initialId: featuredId,
  editable: false,
};

/** Page-level fields do not affect `PlanPicker`; hide them to keep the panel focused. */
const pickerParameters = {
  controls: {
    exclude: [
      "sectionTitle",
      "sectionSubtitle",
      "ctaLabel",
      "pageTitle",
      "pageDescription",
    ],
  },
};

export const PlanPickerStory: PlanPickerStory = {
  name: "Plan picker (featured selected)",
  args: defaultPickerArgs,
  argTypes: planPickerArgTypes,
  parameters: pickerParameters,
  render: (args) => <PlanPickerStorybook {...args} />,
};

export const StarterSelected: PlanPickerStory = {
  name: "Plan picker (starter selected)",
  args: {
    ...defaultPickerArgs,
    initialId: "starter",
  },
  argTypes: planPickerArgTypes,
  parameters: pickerParameters,
  render: (args) => <PlanPickerStorybook {...args} />,
};

export const EnterpriseSelected: PlanPickerStory = {
  name: "Plan picker (enterprise selected)",
  args: {
    ...defaultPickerArgs,
    initialId: "enterprise",
  },
  argTypes: planPickerArgTypes,
  parameters: pickerParameters,
  render: (args) => <PlanPickerStorybook {...args} />,
};
