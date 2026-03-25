interface PromoBannerProps {
  headline: string;
  bgColor?: string;
  textColor?: string;
}

export const PromoBanner = ({
  headline,
  bgColor,
  textColor,
}: PromoBannerProps) => {
  return (
    <div className={`w-full overflow-hidden rounded-lg text-white ${bgColor}`}>
      <div className="flex min-h-28 w-full flex-col items-center justify-evenly p-4 text-center gap-4">
        <h2 className={`text-2xl ${textColor ?? ""}`}>{headline}</h2>
        <a
          href="/checkout"
          className="flex h-10 w-40 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-bold text-white hover:scale-105"
        >
          Go to Checkout
        </a>
      </div>
    </div>
  );
};
