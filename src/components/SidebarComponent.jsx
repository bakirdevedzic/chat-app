import { collection, getDocs } from "firebase/firestore";

import ModalOverlaySideBar from "../ui/ModalOverlaySidebar";
import Search from "../ui/Search";
import MessagePreview from "./MessagePreview";
import ProfilePreview from "./ProfilePreview";
import TypesOfChats from "./TypesOfChats";
import { db } from "../firebase";
import { useEffect } from "react";

const fetchChats = async () => {
  const snapshot = await getDocs(collection(db, "groupChats"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name, // Assuming "name" field exists in chats
    users: doc.data().users, // Assuming "users" field exists
  }));
};

function SidebarComponent({
  showSidebar,
  sidebarHidden,
  sidebarVisible,
  setShowSidebar,
  chats,
}) {
  let classNameBase =
    "h-full bg-white row-span-full col-[1/2]  flex flex-col border-solid border-0 border-r border-slate-200  fixed top-0 left-0 z-10 w-[300px] overflow-y-auto transition-[margin-left] ease-in-out duration-500 divide-y";
  let className = "";
  if (sidebarVisible || (sidebarHidden && showSidebar))
    className = classNameBase;
  if (sidebarHidden && !showSidebar) className = classNameBase + " ml-[-300px]";

  return (
    <>
      <div className={className}>
        <ProfilePreview />
        <div className="flex items-center justify-center">
          <Search />
        </div>
        <TypesOfChats />
        <div className="pt-2 divide-y-2 ">
          {chats?.map((chat) => (
            <MessagePreview key={chat.id} chat={chat} />
          ))}
        </div>
      </div>

      {sidebarHidden && showSidebar && (
        <ModalOverlaySideBar setShowSidebar={setShowSidebar} />
      )}
    </>
  );
}

export default SidebarComponent;
