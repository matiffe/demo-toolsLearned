import type { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css" />
      {children}
    </>
  );
}
