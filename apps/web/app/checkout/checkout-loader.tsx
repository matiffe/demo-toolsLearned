"use client";

import dynamic from "next/dynamic";

/**
 * `dynamic(..., { ssr: false })` must live in a Client Component (Next.js 16+).
 * RecurlyProvider also requires the browser (window.recurly).
 */
const CheckoutClient = dynamic(() => import("./checkout-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <p className="text-gray-600">Loading checkout…</p>
    </div>
  ),
});

export default function CheckoutLoader() {
  return <CheckoutClient />;
}
