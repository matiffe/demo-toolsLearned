import type { Meta, StoryObj } from "@storybook/react";
import { PromoBanner } from "../PromoBanner";

const meta: Meta<typeof PromoBanner> = {
  title: "UI/PromoBanner",
  component: PromoBanner,
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

/** Matches Tina `post` → rich-text → PromoBanner template options in `apps/web/tina/config.ts` */
export const Default: Story = {
  args: {
    headline: "Upgrade to Pro today",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
};

/** Same block as Tina, `bg-black` + `text-white` — pairs with `Limited-Time-Offer.mdx` */
export const Dark: Story = {
  name: "Limited-time (bg-black)",
  args: {
    headline: "Today only — upgrade before midnight",
    bgColor: "bg-black",
    textColor: "text-white",
  },
};
