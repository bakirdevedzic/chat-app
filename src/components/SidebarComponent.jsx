import ModalOverlaySideBar from "../ui/ModalOverlaySidebar";
import Search from "../ui/Search";
import MessagePreview from "./MessagePreview";
import ProfilePreview from "./ProfilePreview";
import TypesOfChats from "./TypesOfChats";

function SidebarComponent({
  showSidebar,
  sidebarHidden,
  sidebarVisible,
  setShowSidebar,
}) {
  let classNameBase =
    "h-full bg-white row-span-full col-[1/2] py-[0.75rem] flex flex-col border-solid border-0 border-r border-slate-200  fixed top-0 left-0 z-10 w-[300px] overflow-y-auto transition-[margin-left] ease-in-out duration-500 divide-y";
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
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
          <MessagePreview />
        </div>
      </div>

      {sidebarHidden && showSidebar && (
        <ModalOverlaySideBar setShowSidebar={setShowSidebar} />
      )}
    </>
  );
}

export default SidebarComponent;
