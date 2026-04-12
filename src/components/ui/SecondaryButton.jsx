function SecondaryButton({ children, className = "", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-base font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-100 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
