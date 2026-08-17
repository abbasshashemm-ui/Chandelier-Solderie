type IconProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChandelierIcon({ className = "size-4" }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden>
      <path d="M12 3v3.5" />
      <path d="M4.5 9.5h15L12 6.5 4.5 9.5z" />
      <path d="M7.5 9.5v2.25a4.5 4.5 0 009 0V9.5" />
      <path d="M6 13.5l-1.5 4h4l-1.5-4z" />
      <path d="M18 13.5l-1.5 4h4l-1.5-4z" />
      <path d="M12 16.75V21" />
    </svg>
  );
}

export function RulerIcon({ className = "size-4" }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden>
      <path d="M3.75 15.75l12-12 4.5 4.5-12 12-4.5-4.5z" />
      <path d="M7.5 12l1.5 1.5" />
      <path d="M10.5 9l1.5 1.5" />
      <path d="M13.5 6l1.5 1.5" />
    </svg>
  );
}

export function InstallationIcon({ className = "size-4" }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden>
      <path d="M12 3l7.5 3v5.25c0 4.5-3.15 7.9-7.5 9.75-4.35-1.85-7.5-5.25-7.5-9.75V6L12 3z" />
      <path d="M9.25 11.75l2 2 3.5-3.75" />
    </svg>
  );
}

export function ConsultIcon({ className = "size-4" }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden>
      <path d="M20.25 11.25c0 4.03-3.7 7.25-8.25 7.25a9.3 9.3 0 01-2.6-.36L4.5 19.5l1.1-3.44A6.9 6.9 0 013.75 11.25C3.75 7.22 7.45 4 12 4s8.25 3.22 8.25 7.25z" />
      <path d="M8.75 11.25h.01" />
      <path d="M12 11.25h.01" />
      <path d="M15.25 11.25h.01" />
    </svg>
  );
}
