import Navigation from "../Navigation";

function AppShell({
  children,
  className = "",
  contentClassName = "",
  withMobileOffset = true,
}) {
  return (
    <div className={`flex min-h-screen bg-gray-50 ${className}`.trim()}>
      <Navigation />
      <main
        className={`w-full overflow-y-auto md:ml-64 ${
          withMobileOffset ? "mt-14 lg:mt-0" : ""
        } ${contentClassName}`.trim()}
      >
        {children}
      </main>
    </div>
  );
}

export default AppShell;
