type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M13.63 0H2.37A2.37 2.37 0 0 0 0 2.37v11.26A2.37 2.37 0 0 0 2.37 16h11.26A2.37 2.37 0 0 0 16 13.63V2.37A2.37 2.37 0 0 0 13.63 0ZM4.89 13.47H2.53V6.03h2.36v7.44ZM3.71 5.02a1.36 1.36 0 1 1 0-2.73 1.36 1.36 0 0 1 0 2.73Zm9.76 8.45h-2.35V9.85c0-.86-.02-1.97-1.2-1.97-1.2 0-1.38.94-1.38 1.91v3.68H6.19V6.03h2.26v1.02h.03a2.48 2.48 0 0 1 2.23-1.22c2.38 0 2.82 1.57 2.82 3.6v4.04Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className} {...stroke}>
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="2" />
      <path d="m2.5 4.5 5.5 4 5.5-4" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className} {...stroke}>
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className} {...stroke}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className} {...stroke}>
      <path d="M5 2.5h6v3.25a3 3 0 0 1-6 0V2.5ZM5 3.75H3v.5a2.5 2.5 0 0 0 2.2 2.48M11 3.75h2v.5a2.5 2.5 0 0 1-2.2 2.48M8 8.75v3.5M5.5 13.25h5" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={className} {...stroke}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M1.75 8h12.5M8 1.75c1.7 1.75 2.5 3.83 2.5 6.25S9.7 12.5 8 14.25C6.3 12.5 5.5 10.42 5.5 8S6.3 3.5 8 1.75Z" />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={className} {...stroke}>
      <path d="M8 13V3.5M4 7.5l4-4 4 4" />
    </svg>
  );
}

// two lines that cross into an x when the menu is open
export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={`menu-icon ${className ?? ""}`} {...stroke}>
      <path d="M2.5 5h11" />
      <path d="M2.5 11h11" />
    </svg>
  );
}
