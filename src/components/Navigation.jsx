import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

function Navigation() {
  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopNav />
      {/* Mobile Bottom Nav */}
      <MobileNav />
    </>
  );
}

export default Navigation;
