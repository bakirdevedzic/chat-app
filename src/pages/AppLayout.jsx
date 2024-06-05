import { useContext } from "react";

import SidebarComponent from "../components/Sidebar/SidebarComponent";
import { mainContext } from "../context/MainContext";
import Spinner from "../ui/Spinner";
import Chat from "../components/Chat/Chat";

function AppLayout() {
  const { sidebarVisible, chatsLoading } = useContext(mainContext);
  return (
    <div className="flex flex-row h-[calc(100dvh)] sm:flex sm:flex-col">
      {chatsLoading ? (
        <Spinner />
      ) : (
        <>
          <SidebarComponent />
          <div className={`flex-1 ${sidebarVisible ? "ml-[300px]" : ""}`}>
            <Chat />
          </div>
        </>
      )}
    </div>
  );
}

export default AppLayout;
