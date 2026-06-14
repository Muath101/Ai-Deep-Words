import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/** Shared entrance animation used across every page for a consistent feel. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Consistent vertical rhythm: tighter on mobile, generous on desktop. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`py-14 sm:py-20 lg:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}
