import { PromoBannerBgColor, PromoBannerBgColorType } from "./shared.types";

export interface PromoBannerProps {
  headline: string;
  subhead?: string;
  ctaText?: string;
  bgColor?: PromoBannerBgColorType;
}

export const PromoBanner = ({
  headline,
  subhead,
  ctaText,
  bgColor = PromoBannerBgColor.INDIGO,
}: PromoBannerProps) => {
  return (
    <div
      className={`p-8 rounded-xl shadow-lg text-white text-center ${bgColor} my-8 w-full max-w-4xl mx-auto`}
    >
      <h2 className="text-3xl font-extrabold tracking-tight mb-3">
        {headline}
      </h2>
      {subhead && (
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">{subhead}</p>
      )}
      {ctaText && (
        <a
          href="/checkout"
          className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
        >
          {ctaText}
        </a>
      )}
    </div>
  );
};
