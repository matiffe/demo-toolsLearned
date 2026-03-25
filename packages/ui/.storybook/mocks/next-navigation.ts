import { useMemo } from "react";

/**
 * Minimal `next/navigation` mock for Storybook.
 * Prefer `CheckoutView` with explicit `planParam` in stories instead of relying on this.
 */
export function useSearchParams() {
  return useMemo(() => new URLSearchParams(), []);
}
