import { CardElement, useRecurly } from "@recurly/react-recurly";
import { useRef, useState, type FormEvent } from "react";
import { CheckoutPlan } from "./types";

export default function CheckoutForm({ plan }: { plan: CheckoutPlan }) {
  const recurly = useRecurly();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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

  const priceLine = `${plan.price}${plan.period ?? ""}`;

  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-10 shadow-2xl shadow-slate-200/50"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Payment details
          </h2>
          <p className="mt-2 font-medium text-slate-500">
            {plan.name} —{" "}
            <span className="font-bold text-blue-600">{priceLine}</span>
          </p>
          <input type="hidden" name="plan_id" value={plan.id} readOnly />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
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
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Doe"
            />
          </label>
        </div>

        <div className="mb-8">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            Card details
          </span>
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-4 font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Processing secure payment…" : `Pay ${priceLine}`}
        </button>

        {message ? (
          <div
            className={`mt-6 rounded-xl border p-4 text-center font-medium ${message.includes("❌") ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
          >
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
