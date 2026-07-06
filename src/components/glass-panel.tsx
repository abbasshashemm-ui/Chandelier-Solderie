import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "gold";
  as?: "div" | "section" | "aside" | "header" | "article";
};

const variants = {
  light: "liquid-glass shadow-[0_4px_20px_rgba(26,26,26,0.05)]",
  dark: "liquid-glass shadow-[0_4px_20px_rgba(26,26,26,0.05)]",
  gold: "liquid-glass bg-gradient-to-br from-[#c9a962]/16 via-[#fff8eb]/40 to-[#d4bc7a]/12 shadow-[0_8px_32px_rgba(201,169,98,0.1)]",
};

export function GlassPanel({
  children,
  className = "",
  variant = "light",
  as: Tag = "div",
}: GlassPanelProps) {
  return (
    <Tag
      className={`glass-panel backdrop-blur-2xl backdrop-saturate-150 ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
