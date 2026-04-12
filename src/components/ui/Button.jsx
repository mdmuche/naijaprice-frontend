function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "inline-flex items-center justify-center rounded-2xl px-4 py-3 font-bold transition-all active:scale-[0.99] bg-[#00C950] text-white shadow-sm hover:bg-[#00b548]",
    text: "inline-flex items-center justify-center font-bold text-[#00C950] transition-colors hover:text-[#00b548]",
  };

  return (
    <button
      type={type}
      className={`${variants[variant] || variants.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
