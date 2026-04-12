import { motion } from "framer-motion";

function SecondaryButton({ children, className = "", type = "button", ...props }) {
  const MotionButton = motion.button;

  return (
    <MotionButton
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-base font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-100 ${className}`.trim()}
      {...props}
    >
      {children}
    </MotionButton>
  );
}

export default SecondaryButton;
