import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  icon,
  iconPosition = "right",
  className = "",
}: ButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm md:text-base tracking-wide transition-colors duration-300 select-none";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[#1a1014] shadow-[0_8px_30px_rgba(255,107,129,0.25)]"
      : "border border-white/20 text-white/90 hover:border-white/40 hover:bg-white/5";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${base} ${styles} ${className}`}
    >
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </motion.button>
  );
}
