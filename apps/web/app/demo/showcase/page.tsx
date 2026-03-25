import { redirect } from "next/navigation";

/** Old DEMO showcase URL — plan selection lives on `/plans`. */
export default function DemoShowcaseRedirect() {
  redirect("/plans");
}
