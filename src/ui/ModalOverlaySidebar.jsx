function ModalOverlaySideBar({ setShowSidebar }) {
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-[1] h-full w-full"
      onClick={() => setShowSidebar(false)} // Update setShowSidebar to false on click
    />
  );
}

export default ModalOverlaySideBar;
