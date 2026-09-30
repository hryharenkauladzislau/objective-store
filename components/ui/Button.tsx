import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary: "border border-line bg-surface text-ink hover:border-ink/25 hover:bg-canvas",
  ghost: "text-accent hover:bg-tint",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string; onClick?: () => void; ariaLabel?: string };
type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ariaLabel } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
