import Navigation from "../Navigation";
import { motion } from "framer-motion";

function AppShell({
  children,
  className = "",
  contentClassName = "",
  withMobileOffset = true,
}) {
  const MotionMain = motion.main;

  return (
    <div className={`flex min-h-screen bg-gray-50 ${className}`.trim()}>
      <Navigation />
      <MotionMain
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`w-full overflow-y-auto md:ml-64 ${
          withMobileOffset ? "mt-14 lg:mt-0" : ""
        } ${contentClassName}`.trim()}
      >
        {children}
      </MotionMain>
    </div>
  );
}

export default AppShell;
