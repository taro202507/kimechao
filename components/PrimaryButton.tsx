import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_4px_0_var(--accent-dark)] hover:bg-accent-dark active:translate-y-0.5 active:shadow-none",
  secondary:
    "bg-card text-foreground border-2 border-line shadow-[0_3px_0_var(--line)] hover:bg-white active:translate-y-0.5 active:shadow-none",
  ghost: "bg-transparent text-muted hover:text-foreground",
};

const baseClass =
  "block w-full rounded-2xl px-6 py-4 text-center text-lg font-bold transition touch-manipulation disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:translate-y-0";

type Common = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type LinkProps = Common & {
  href: string;
};

export function PrimaryButton(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const className = `${baseClass} ${variants[variant]} ${props.className ?? ""}`;

  if ("href" in props) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
