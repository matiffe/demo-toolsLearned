import type { ReactNode } from "react";
import Script from "next/script";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css" />
      <Script
        src="https://js.recurly.com/v4/recurly.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
