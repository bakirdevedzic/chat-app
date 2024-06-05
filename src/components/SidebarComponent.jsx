import { mainContext } from "../context/MainContext";
import ModalOverlaySideBar from "../ui/ModalOverlaySidebar";
import Search from "../ui/Search";
import Spinner from "../ui/Spinner";
import MessagePreview from "./MessagePreview";
import ProfilePreview from "./ProfilePreview";
import TypesOfChats from "./TypesOfChats";
import { useContext, useEffect, useState } from "react";

function SidebarComponent() {
  const {
    chats,
    showSidebar,
    sidebarVisible,
    sidebarHidden,
    people,
    searchLoad,
  } = useContext(mainContext);

  let classNameBase =
    "h-full bg-white row-span-full col-[1/2]  flex flex-col border-solid border-0 border-r border-slate-200  fixed top-0 left-0 z-10 w-[300px] overflow-y-auto transition-[margin-left] ease-in-out duration-500 divide-y";

  let className = "";
  if (sidebarVisible || (sidebarHidden && showSidebar))
    className = classNameBase;
  if (sidebarHidden && !showSidebar) className = classNameBase + " ml-[-300px]";

  const [activeTab, setActiveTab] = useState("Private");
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    if (activeTab === "Private") {
      setFilteredChats(chats.filter((chat) => chat.type === "private"));
    } else if (activeTab === "Groups") {
      setFilteredChats(chats.filter((chat) => chat.type === "group"));
    } else if (activeTab === "Explore") {
      setFilteredChats(chats.filter((chat) => chat.type === "explore"));
    }
  }, [activeTab, chats]);

  return (
    <>
      <div className={className}>
        <ProfilePreview />
        <div className="flex items-center justify-center">
          <Search />
        </div>
        {searchLoad ? (
          <Spinner />
        ) : people.length > 0 ? (
          people.map((person) => (
            <MessagePreview
              key={person.id}
              isSearch={true}
              chat={person}
              setActiveTab={setActiveTab}
            />
          ))
        ) : (
          <>
            <TypesOfChats activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="pt-2 divide-y-2">
              {filteredChats?.map((chat) => (
                <MessagePreview
                  key={chat.id}
                  isSearch={false}
                  chat={chat}
                  setActiveTab={setActiveTab}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {sidebarHidden && showSidebar && <ModalOverlaySideBar />}
    </>
  );
}

export default SidebarComponent;
