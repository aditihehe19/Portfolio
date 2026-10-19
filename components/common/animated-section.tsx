"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  id?: string;
}

// Sections arrive in 3D: they tip up from a slight backward tilt on their
// bottom edge while rising into place, like a card laid onto the page.
const directionOffset = {
  up: { y: 70, rotateX: 14 },
  down: { y: -70, rotateX: -14 },
  left: { x: 60, rotateY: -12 },
  right: { x: -60, rotateY: 12 },
};

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}: AnimatedSectionProps) => {
  const reduced = useReducedMotion();
  const initialOffset = reduced ? {} : directionOffset[direction];

  return (
    <motion.div
      id={id}
      className={className}
      style={{ transformPerspective: 1400, transformOrigin: "50% 100%" }}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.97, ...initialOffset }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 70,
          damping: 18,
          mass: 0.9,
          delay,
        },
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
};
