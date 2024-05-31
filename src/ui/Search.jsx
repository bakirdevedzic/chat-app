function Search() {
  return (
    <div className="flex items-center border justify-center w-[80%] rounded-full px-3 py-1 bg-primary-gray shadow-sm  mt-4 mb-2 pl-[1.5rem]">
      <div>
        <input
          type="text"
          placeholder="Search people..."
          className="ml-2 outline-none bg-transparent text-gray-700"
        />
      </div>
    </div>
  );
}

export default Search;
