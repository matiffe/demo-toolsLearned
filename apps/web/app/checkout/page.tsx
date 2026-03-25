import CheckoutLoader from "./checkout-loader";
import { loadCheckoutPlansDoc } from "../../lib/checkout-plans";

export default async function CheckoutPage() {
  const doc = await loadCheckoutPlansDoc();
  return <CheckoutLoader plans={doc} />;
}
