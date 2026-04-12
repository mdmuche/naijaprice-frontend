import { motion } from "framer-motion";

const inputClassName =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00C950] focus:ring-4 focus:ring-[#00C950]/10";

function FormField({ label, className = "", ...inputProps }) {
  const MotionInput = motion.input;

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <MotionInput
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.18 }}
        {...inputProps}
        className={`${inputClassName} ${className}`.trim()}
      />
    </label>
  );
}

export default FormField;
