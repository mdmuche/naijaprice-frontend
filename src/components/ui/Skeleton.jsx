function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gray-200/80 ${className}`.trim()}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
