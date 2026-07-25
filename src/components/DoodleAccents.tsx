export function UnderlineDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-full h-3 sm:h-4 ${className}`}
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Top curved line */}
      <path
        d="M 2.5 4 C 45 1.5, 125 1.5, 237.5 3.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom curved line with distinct gap */}
      <path
        d="M 6 13.5 C 50 10.5, 130 10.5, 234 13"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDoodle({ className = "h-8 w-8 text-indigo-400" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C20 8 32 14 30 26C29 32 20 36 16 28C14 24 18 18 26 22C32 25 38 34 38 34M38 34L30 32M38 34L36 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleDoodle({ className = "h-6 w-6 text-indigo-400" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
