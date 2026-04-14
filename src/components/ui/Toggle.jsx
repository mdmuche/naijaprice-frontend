function Toggle({ active, label, desc, onToggle }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-all duration-300 relative outline-none focus:ring-2 focus:ring-[#00C950]/20 ${
          active ? "bg-[#00C950]" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
            active ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
export default Toggle;
