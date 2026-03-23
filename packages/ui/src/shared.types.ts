export enum PromoBannerBgColor {
  INDIGO = "bg-indigo-600",
  ROSE = "bg-rose-600",
  EMERALD = "bg-emerald-600",
}

export type PromoBannerBgColorType =
  (typeof PromoBannerBgColor)[keyof typeof PromoBannerBgColor];
