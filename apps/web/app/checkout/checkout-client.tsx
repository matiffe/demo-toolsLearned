"use client";

import {
  RecurlyProvider,
  Elements,
  CardElement,
  useRecurly,
} from "@recurly/react-recurly";
import { useRef, useState } from "react";

const recurlyPublicKey = process.env.NEXT_PUBLIC_RECURLY_PUBLIC_KEY ?? "provisionally-set-public-key";

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
        setMessage(error.message ?? "Could not tokenize payment details.");
        return;
      }
      if (token?.id) {
        console.log("Token ready for the backend:", token.id);
        setMessage(
          "Payment method tokenized successfully. Send this token to your server from a secure API route.",
        );
      }
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-8 border rounded-xl shadow-lg bg-white"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Subscribe to Pro ($15/mo) testing
      </h2>

      <div className="grid gap-4 mb-4">
        <label className="block text-sm font-medium text-gray-700">
          First name
          <input
            type="text"
            data-recurly="first_name"
            name="first_name"
            autoComplete="given-name"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            placeholder="Jane"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Last name
          <input
            type="text"
            data-recurly="last_name"
            name="last_name"
            autoComplete="family-name"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            placeholder="Doe"
          />
        </label>
      </div>

      <div className="mb-6 p-3 border rounded-md bg-gray-50 min-h-11">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Processing..." : "Submit Payment"}
      </button>

      {message ? (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      ) : null}
    </form>
  );
}

export default function CheckoutClient() {
  if (!recurlyPublicKey) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <p className="text-center text-gray-800 max-w-md">
          Set{" "}
          <code className="rounded bg-gray-200 px-1 py-0.5">
            NEXT_PUBLIC_RECURLY_PUBLIC_KEY
          </code>{" "}
          in <code className="rounded bg-gray-200 px-1 py-0.5">.env.local</code>{" "}
          (your Recurly public API key from the dashboard).
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <RecurlyProvider publicKey={recurlyPublicKey}>
        <Elements>
          <CheckoutForm />
        </Elements>
      </RecurlyProvider>
    </div>
  );
}
