import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  interactive = false,
  padding = "md",
}) {
  const MotionDiv = motion.div;

  const paddingMap = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      whileHover={
        interactive ? { y: -3, transition: { duration: 0.18 } } : undefined
      }
      className={`rounded-3xl border border-gray-200 bg-white shadow-sm ${paddingMap[padding]} ${interactive ? "will-change-transform" : ""} ${className}`.trim()}
    >
      {children}
    </MotionDiv>
  );
}

export default Card;
