import { useContext } from "react";
import Chat from "../components/Chat";
import SidebarComponent from "../components/SidebarComponent";
import { mainContext } from "../context/MainContext";

function AppLayout() {
  const { sidebarVisible } = useContext(mainContext);
  return (
    <div className="flex flex-row h-[calc(100dvh)] sm:flex sm:flex-col">
      <SidebarComponent />

      <div className={`flex-1 ${sidebarVisible ? "ml-[300px]" : ""}`}>
        <Chat />
      </div>
    </div>
  );
}

export default AppLayout;
