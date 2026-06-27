import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "gold";
  as?: "div" | "section" | "aside" | "header";
};

const variants = {
  light:
    "bg-white/55 border-white/70 shadow-[0_8px_32px_rgba(26,26,26,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]",
  dark: "bg-[#1a1a1a]/75 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
  gold: "bg-[#c9a962]/12 border-[#c9a962]/25 shadow-[0_8px_32px_rgba(201,169,98,0.12),inset_0_1px_0_rgba(255,255,255,0.5)]",
};

export function GlassPanel({
  children,
  className = "",
  variant = "light",
  as: Tag = "div",
}: GlassPanelProps) {
  return (
    <Tag
      className={`glass-panel backdrop-blur-2xl backdrop-saturate-150 border rounded-3xl ${variants[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
