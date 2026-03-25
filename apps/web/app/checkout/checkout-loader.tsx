"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import type { CheckoutPlansDoc } from "./types";

const CheckoutClient = dynamic(() => import("./checkout-client"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <p className="text-slate-600">Loading checkout…</p>
    </div>
  ),
});

export default function CheckoutLoader({ plans }: { plans: CheckoutPlansDoc }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
          <p className="text-slate-600">Loading checkout…</p>
        </div>
      }
    >
      <CheckoutClient plans={plans} />
    </Suspense>
  );
}
