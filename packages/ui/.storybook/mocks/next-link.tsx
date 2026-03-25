import type { ComponentProps, ReactNode } from "react";

type LinkProps = {
  href: string;
  children?: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/** Minimal stand-in for `next/link` in Storybook (Vite). */
export default function Link({ href, children, ...rest }: LinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
