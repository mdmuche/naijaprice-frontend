function PageIntro({ title, subtitle, action = null, className = "" }) {
  return (
    <div
      className={`flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between ${className}`.trim()}
    >
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-gray-500 md:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export default PageIntro;
