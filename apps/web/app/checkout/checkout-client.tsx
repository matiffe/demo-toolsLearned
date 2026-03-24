"use client";

import {
  RecurlyProvider,
  Elements,
  CardElement,
  useRecurly,
} from "@recurly/react-recurly";
import { useRef, useState } from "react";

const recurlyPublicKey =
  process.env.NEXT_PUBLIC_RECURLY_PUBLIC_KEY ?? "ewr1-your-public-test-key";

const cardStyle = {
  fontSize: "16px",
  fontColor: "#0f172a",
  fontFamily: "system-ui, -apple-system, sans-serif",
  placeholder: {
    color: "#94a3b8",
  },
  invalid: {
    fontColor: "#ef4444",
  },
};

function CheckoutForm() {
  const recurly = useRecurly();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setLoading(true);
    setMessage("");

    recurly.token(form, (error, token) => {
      setLoading(false);
      if (error) {
        setMessage(
          `❌ ${error.message ?? "Could not tokenize payment details."}`,
        );
        return;
      }
      if (token?.id) {
        console.log("Token ready for the backend:", token.id);
        setMessage(`✅ Success! Secure Token: ${token.id.substring(0, 12)}...`);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout Seguro
          </h2>
          <p className="mt-2 text-slate-500 font-medium">
            Suscripción Pro -{" "}
            <span className="text-blue-600 font-bold">$15/mo</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              First name
            </span>
            <input
              type="text"
              data-recurly="first_name"
              name="first_name"
              autoComplete="given-name"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
              placeholder="Jane"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Last name
            </span>
            <input
              type="text"
              data-recurly="last_name"
              name="last_name"
              autoComplete="family-name"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
              placeholder="Doe"
            />
          </label>
        </div>

        <div className="mb-8">
          <span className="text-sm font-semibold text-slate-700 mb-1.5 block">
            Card details
          </span>
          <div className="p-4 border border-slate-300 rounded-xl bg-slate-50 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition min-h-[52px]">
            <CardElement style={cardStyle} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 active:transform active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-200"
        >
          {loading ? "Processing Secure Payment..." : "Submit Payment"}
        </button>

        {message ? (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium border ${message.includes("❌") ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}
          >
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default function CheckoutClient() {
  if (!recurlyPublicKey) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
        <p className="text-center text-slate-800 max-w-md bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          Set{" "}
          <code className="rounded bg-slate-100 text-pink-600 px-1.5 py-0.5 font-mono text-sm">
            NEXT_PUBLIC_RECURLY_PUBLIC_KEY
          </code>{" "}
          in your environment.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <RecurlyProvider publicKey={recurlyPublicKey}>
        <Elements>
          <CheckoutForm />
        </Elements>
      </RecurlyProvider>
    </div>
  );
}
