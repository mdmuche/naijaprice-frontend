const inputClassName =
  "w-full rounded-xl border-2 border-gray-100 px-4 py-3 outline-none transition focus:border-[#00C950]";

function FormField({ label, className = "", ...inputProps }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-bold text-gray-800">{label}</span>
      <input
        {...inputProps}
        className={`${inputClassName} ${className}`.trim()}
      />
    </label>
  );
}

export default FormField;
