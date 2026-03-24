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
    <div
      className={`p-4 ${bgColor} text-white items-center text-center rounded-lg mb-4 flex flex-col w-dvh h-44 justify-evenly mt-10`}
    >
      <h2 className={`text-2xl ${textColor}`}>{headline}</h2>
      <a
        href="/checkout"
        className="flex px-4 py-2 w-40 h-10 hover:scale-105 items-center justify-center bg-black text-sm font-bold rounded-md text-white"
      >
        Go to Checkout
      </a>
    </div>
  );
};
