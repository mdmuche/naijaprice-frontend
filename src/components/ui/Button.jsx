import { motion } from "framer-motion";

function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}) {
  const MotionButton = motion.button;

  const variants = {
    primary:
      "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors bg-[#00C950] text-white shadow-sm hover:bg-[#00b548]",
    secondary:
      "inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-100",
    text: "inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#00C950] transition-colors hover:text-[#00b548]",
  };

  return (
    <MotionButton
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className={`${variants[variant] || variants.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </MotionButton>
  );
}

export default Button;
