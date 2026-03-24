import type { ReactNode } from "react";

/** Default styles for Recurly Elements (card iframe) — only needed under /checkout. */
export default function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="https://js.recurly.com/v4/recurly.css" />
      {children}
    </>
  );
}
