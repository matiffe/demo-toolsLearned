import type { Meta, StoryObj } from "@storybook/react";
import { PromoBanner } from "../PromoBanner";

const meta: Meta<typeof PromoBanner> = {
  title: "UI/PromoBanner",
  component: PromoBanner,
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const Default: Story = {
  args: {
    headline: "Upgrade to Pro Today!",
    bgColor: "blue",
    textColor: "text-white",
  },
};

export const Sale: Story = {
  args: {
    headline: "Limited Time Offer!",
    bgColor: "red",
    textColor: "text-white",
  },
};
