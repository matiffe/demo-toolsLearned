import type { Metadata } from "next";

import client from "../../tina/__generated__/client";
import type { DemoQuery } from "../../tina/__generated__/types";
import { loadCheckoutPlansDoc } from "../../lib/checkout-plans";
import {
  resolvedPlansPageDescription,
  resolvedPlansPageTitle,
} from "../checkout/types";
import PlansClient from "./plans-client";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await loadCheckoutPlansDoc();
  return {
    title: resolvedPlansPageTitle(doc),
    description: resolvedPlansPageDescription(doc),
  };
}

export default async function PlansPage() {
  try {
    const res = await client.queries.demo({
      relativePath: "checkout-plans.json",
    });
    const hasErrors = Boolean(res.errors?.length);
    const demo = res.data?.demo;
    if (demo && !hasErrors && res.data) {
      const tina: {
        query: string;
        variables: { relativePath: string };
        data: DemoQuery;
      } = {
        query: res.query,
        variables: res.variables as { relativePath: string },
        data: res.data as DemoQuery,
      };
      return <PlansClient tina={tina} />;
    }
  } catch {
    // Tina datalayer not running, or content not indexed — fall back below.
  }

  const doc = await loadCheckoutPlansDoc();
  return <PlansClient plans={doc} />;
}
