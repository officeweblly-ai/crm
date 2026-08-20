/* Line icons in the Lucide idiom — 1.7px strokes, 24px grid, no emoji. */

type P = { className?: string };
const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconCrm = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="18" rx="2" />
    <rect x="14" y="3" width="7" height="8" rx="2" />
    <rect x="14" y="15" width="7" height="6" rx="2" />
  </svg>
);

export const IconZap = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
  </svg>
);

export const IconPlug = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 7V3M15 7V3" />
    <path d="M6 7h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V7Z" />
    <path d="M12 17v4" />
  </svg>
);

export const IconBot = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="8" width="18" height="12" rx="4" />
    <path d="M12 8V4" />
    <circle cx="8.5" cy="14" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="14" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 7.1 4.8a1.6 1.6 0 0 0 1.8 0L20 8" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19 12H5" />
    <path d="m12 5-7 7 7 7" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6.5 3Z" />
  </svg>
);

export const SERVICE_ICONS = {
  crm: IconCrm,
  automation: IconZap,
  api: IconPlug,
  ai: IconBot,
  mail: IconMail,
} as const;
