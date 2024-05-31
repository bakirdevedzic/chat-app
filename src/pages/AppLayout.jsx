import { useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import { useMediaQuery } from "react-responsive";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarHidden = useMediaQuery({ maxWidth: 750 });
  const sidebarVisible = useMediaQuery({ minWidth: 751 });

  return (
    <div className="flex flex-row min-h-full h-[calc(100dvh)]">
      <SidebarComponent
        showSidebar={showSidebar}
        sidebarHidden={sidebarHidden}
        sidebarVisible={sidebarVisible}
        setShowSidebar={setShowSidebar}
      />

      <div className="w-[100%] bg-red-300">Chat</div>
    </div>
  );
}

export default AppLayout;
