import { useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import { useMediaQuery } from "react-responsive";
import Chat from "../components/Chat";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarHidden = useMediaQuery({ maxWidth: 850 });
  const sidebarVisible = useMediaQuery({ minWidth: 851 });

  return (
    <div className="flex flex-row h-[calc(100dvh)] sm:flex sm:flex-col">
      <SidebarComponent
        showSidebar={showSidebar}
        sidebarHidden={sidebarHidden}
        sidebarVisible={sidebarVisible}
        setShowSidebar={setShowSidebar}
      />

      <div className={`flex-1 ${sidebarVisible ? "ml-[300px]" : ""}`}>
        <Chat setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}

export default AppLayout;
