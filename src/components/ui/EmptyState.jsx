function EmptyState({ title, description, className = "", action = null }) {
  return (
    <div
      className={`rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center ${className}`.trim()}
    >
      <div className="mx-auto max-w-md space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        {action && <div className="pt-3">{action}</div>}
      </div>
    </div>
  );
}

export default EmptyState;
