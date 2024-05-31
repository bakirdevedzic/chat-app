import ModalOverlaySideBar from "../ui/ModalOverlaySidebar";
import Search from "../ui/Search";
import TypesOfChats from "./TypesOfChats";

function SidebarComponent({
  showSidebar,
  sidebarHidden,
  sidebarVisible,
  setShowSidebar,
}) {
  let classNameBase =
    "h-full bg-white row-span-full col-[1/2] px-[1.5rem] py-[1.5rem] flex flex-col border-solid border-0 border-r border-slate-200  fixed top-0 left-0 z-10 w-[300px] overflow-y-auto transition-[margin-left] ease-in-out duration-500";
  let className = "";
  if (sidebarVisible || (sidebarHidden && showSidebar))
    className = classNameBase;
  if (sidebarHidden && !showSidebar) className = classNameBase + " ml-[-300px]";

  return (
    <>
      <div className={className}>
        <div>Osoba </div>
        <Search />
        <TypesOfChats />
        <div>Chats</div>
      </div>

      {sidebarHidden && showSidebar && (
        <ModalOverlaySideBar setShowSidebar={setShowSidebar} />
      )}
    </>
  );
}

export default SidebarComponent;
