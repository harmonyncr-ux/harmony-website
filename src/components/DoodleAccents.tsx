"use client";

import { motion } from "motion/react";

export function UnderlineDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-full h-4 sm:h-6 ${className}`}
      viewBox="0 0 300 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Primary Thick Organic Curved Swoosh */}
      <motion.path
        d="M 3 14 C 60 22, 130 6, 200 16 C 240 21, 275 11, 297 12"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.4, ease: "easeOut" }}
      />
      {/* Secondary Accent Curve Line */}
      <motion.path
        d="M 10 20 C 70 26, 140 12, 210 21 C 245 25, 270 17, 290 17"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.75, delay: 0.7, ease: "easeOut" }}
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
