"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

/* ──────────────────────────────────────────────
   Shared animation variants
   ────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const variantMap = {
  "fade-up": fadeUp,
  "fade-in": fadeIn,
  "scale-up": scaleUp,
  "slide-left": slideLeft,
  "slide-right": slideRight,
} as const;

type AnimationType = keyof typeof variantMap;

/* ──────────────────────────────────────────────
   AnimatedSection
   Wraps any content with scroll-triggered entrance
   ────────────────────────────────────────────── */

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.15,
}: AnimatedSectionProps) {
  return (
    <motion.div
      variants={variantMap[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   StaggerContainer + StaggerItem
   Parent-child pattern for waterfall reveals
   ────────────────────────────────────────────── */

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0.1,
  once = true,
  amount = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
}

export function StaggerItem({
  children,
  className = "",
  animation = "fade-up",
}: StaggerItemProps) {
  return (
    <motion.div
      variants={variantMap[animation]}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   AnimatedBadge — small entrance for pills / tags
   ────────────────────────────────────────────── */

interface AnimatedBadgeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedBadge({
  children,
  className = "",
  delay = 0,
}: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   AnimatedHeading — heading entrance
   ────────────────────────────────────────────── */

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedHeading({
  children,
  className = "",
  delay = 0,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   FloatingElement — gentle continuous float
   ────────────────────────────────────────────── */

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FloatingElement({
  children,
  className = "",
  delay = 0,
  duration = 3,
  y = 8,
}: FloatingElementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <motion.div
        animate={{ y: [-y, y, -y] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Re-export variants for inline use
export { staggerContainerVariants, fadeUp, fadeIn, scaleUp, slideLeft, slideRight };
