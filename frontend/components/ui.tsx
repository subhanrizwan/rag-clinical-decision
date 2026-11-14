
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

// BUTTON

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-primary text-obsidian hover:bg-primary-hover",
    secondary:
      "bg-obsidian text-white hover:bg-obsidian-soft",
    outline:
      "border border-line bg-white text-heading hover:bg-surface-muted",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex min-h-11 items-center justify-center gap-2
        rounded-control px-5 py-2.5 text-sm font-bold
        transition-colors duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${styles[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

// CARD

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-card border border-line bg-surface p-5
        shadow-[0_4px_18px_rgba(28,32,38,0.025)]
        sm:p-6 ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

// BADGE

type BadgeProps = {
  children: ReactNode;
  variant?: "success" | "warning" | "danger" | "info";
};

export function Badge({
  children,
  variant = "info",
}: BadgeProps) {
  const styles = {
    success: "bg-[#E6F5EE] text-[#116849]",
    warning: "bg-[#FFF1D9] text-[#88530D]",
    danger: "bg-[#FCE8EB] text-[#A52F3D]",
    info: "bg-[#E8F0FA] text-[#285E98]",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-md
        px-2.5 py-1 text-xs font-semibold
        ${styles[variant]}
      `}
    >
      {children}
    </span>
  );
}

// INPUT

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({
  label,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-heading"
      >
        {label}
      </label>

      <input
        id={inputId}
        className={`
          min-h-11 w-full rounded-control border border-line
          bg-white px-3.5 py-2.5 text-sm text-heading
          outline-none transition-colors
          placeholder:text-muted
          focus:border-primary-hover
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
