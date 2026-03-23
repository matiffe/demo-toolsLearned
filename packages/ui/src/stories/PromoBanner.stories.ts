import type { Meta, StoryObj } from "@storybook/react";
import { PromoBanner } from "../promoBanner";
import { PromoBannerBgColor } from "../shared.types";

const meta: Meta<typeof PromoBanner> = {
  title: "Marketing/PromoBanner",
  component: PromoBanner,
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const Default: Story = {
  args: {
    headline: "Upgrade to Pro Today!",
    subhead: "Get access to premium features and priority support.",
    ctaText: "Start Free Trial",
    bgColor: PromoBannerBgColor.INDIGO,
  },
};

export const HolidaySale: Story = {
  args: {
    headline: "Holiday Flash Sale 🎄",
    subhead: "50% off all annual subscriptions for the next 24 hours.",
    ctaText: "Claim Discount",
    bgColor: PromoBannerBgColor.ROSE,
  },
};

export const NewProductLaunch: Story = {
  args: {
    headline: "New Product Launch",
    subhead: "Get access to our new product launch.",
    ctaText: "Learn More",
    bgColor: PromoBannerBgColor.EMERALD,
  },
};
