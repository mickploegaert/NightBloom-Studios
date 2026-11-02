import type { ReactNode } from "react";

type IconName =
  | "check"
  | "monitor"
  | "bag"
  | "device"
  | "game"
  | "cube"
  | "briefcase"
  | "calm"
  | "motion"
  | "spark"
  | "phone"
  | "file"
  | "flag";

const PATHS: Record<IconName, ReactNode> = {
  check: <path d="M5 12.5 9.2 17 19 7" />,
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6.5A3 3 0 0 1 12 3.5 3 3 0 0 1 15 6.5V8" />
    </>
  ),
  device: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  game: (
    <>
      <path d="M7 9h10a4 4 0 0 1 3.8 5.2l-.9 2.6A3 3 0 0 1 17 19h-.2a2 2 0 0 1-1.8-1.1L14.2 16H9.8l-.8 1.9A2 2 0 0 1 7.2 19H7a3 3 0 0 1-2.9-2.2l-.9-2.6A4 4 0 0 1 7 9Z" />
      <path d="M8 12.5v3M6.5 14h3M16.5 13h.01M18 15h.01" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
    </>
  ),
  calm: (
    <>
      <path d="M3 15c2.5-4 5-4 7.5 0s5 4 7.5 0" />
      <path d="M4 8h16" />
    </>
  ),
  motion: (
    <>
      <path d="M4 16c2-6 4-6 6 0" />
      <path d="M10 16c2-8 4-8 6 0" />
      <path d="M16 16c1.2-4 2.2-4 3.2 0" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="m6 6 3.2 3.2M14.8 14.8 18 18M18 6l-3.2 3.2M9.2 14.8 6 18" />
    </>
  ),
  phone: (
    <>
      <path d="M8 4h2l1 4-2 1a12 12 0 0 0 6 6l1-2 4 1v2a2 2 0 0 1-2.2 2A16 16 0 0 1 6 6.2 2 2 0 0 1 8 4Z" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h7l4 4V20.5H7V3.5Z" />
      <path d="M14 3.5v4h4M9.5 12h5M9.5 16h5" />
    </>
  ),
  flag: (
    <>
      <path d="M6 21V4" />
      <path d="M6 5h11l-2 3.5L17 12H6" />
    </>
  ),
};

export default function LineIcon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}

export type { IconName };
