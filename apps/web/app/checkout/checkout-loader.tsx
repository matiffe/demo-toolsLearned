"use client";

import dynamic from "next/dynamic";

const CheckoutFormRoot = dynamic(() => import("./checkout-form"), {
  ssr: false,
  loading: () => (
    <p style={{ padding: "2rem", textAlign: "center" }}>Loading checkout…</p>
  ),
});

export default function CheckoutLoader() {
  return <CheckoutFormRoot />;
}
