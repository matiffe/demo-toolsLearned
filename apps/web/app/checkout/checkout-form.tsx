"use client";

import {
  RecurlyProvider,
  Elements,
  CardElement,
  useRecurly,
} from "@recurly/react-recurly";
import { useState } from "react";

const CheckoutForm = () => {
  const recurly = useRecurly();
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    recurly.token(event.currentTarget, (error, token) => {
      if (error) {
        setMessage(`Error: ${error.message}`);
        return;
      }
      setMessage(`Success! Secure Token generated: ${token.id}`);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "2rem",
        border: "1px solid #ccc",
        maxWidth: "400px",
        margin: "2rem auto",
      }}
    >
      <h2>EXAMPLE: Subscribe to Pro Plan ($15/mo)</h2>

      <div
        style={{
          margin: "1rem 0",
          padding: "0.5rem",
          border: "1px solid #999",
        }}
      >
        <CardElement />
      </div>

      <button
        type="submit"
        style={{ padding: "0.5rem 1rem", background: "blue", color: "white" }}
      >
        Submit Payment
      </button>

      {message && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
      )}
    </form>
  );
};

export default function CheckoutFormRoot() {
  return (
    <RecurlyProvider publicKey="ewr1-your-public-test-key">
      <Elements>
        <CheckoutForm />
      </Elements>
    </RecurlyProvider>
  );
}
