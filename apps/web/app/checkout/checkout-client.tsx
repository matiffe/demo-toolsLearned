"use client";

import { RecurlyProvider, Elements } from "@recurly/react-recurly";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import type { CheckoutPlansDoc } from "./types";
import CheckoutForm from "./checkout-form";

export default function CheckoutClient({ plans }: { plans: CheckoutPlansDoc }) {
  const searchParams = useSearchParams();
  const planParam = searchParams?.get("plan")?.trim() ?? "";

  const selectedPlan = useMemo(() => {
    if (planParam) {
      const match = plans.plans.find((p) => p.id === planParam);
      if (match) return match;
    }
    return plans.plans.find((p) => p.featured) ?? plans.plans[0] ?? null;
  }, [plans.plans, planParam]);

  const unknownPlan =
    Boolean(planParam) && !plans.plans.some((p) => p.id === planParam);

  if (!selectedPlan) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-4">
        <p className="text-slate-600">No plans configured.</p>
        <Link href="/plans" className="font-medium text-blue-600 underline">
          Choose a plan
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-linear-to-b from-slate-100 to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-8 mx-auto max-w-6xl">
        <header className="flex flex-col items-center justify-center mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Checkout
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Complete your subscription
          </h1>
          {unknownPlan ? (
            <p className="mt-2 text-sm text-amber-800">
              Unknown plan in URL — showing default.{" "}
              <Link href="/plans" className="font-medium underline">
                Pick a plan
              </Link>
            </p>
          ) : null}
          <p className="mt-3 text-sm text-slate-600">
            <Link
              href="/plans"
              className="font-medium text-blue-600 underline decoration-blue-600/30"
            >
              Change plan
            </Link>
            {" · "}
            <Link href="/" className="text-slate-500 hover:text-slate-800">
              Home
            </Link>
          </p>
        </header>

        <RecurlyProvider publicKey={"test_public_key_here"}>
          <Elements>
            <CheckoutForm plan={selectedPlan} />
          </Elements>
        </RecurlyProvider>
      </div>
    </div>
  );
}
