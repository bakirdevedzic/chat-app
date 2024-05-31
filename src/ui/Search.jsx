function Search() {
  return (
    <div className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Search chats"
        className="ml-2 outline-none bg-transparent text-gray-700"
      />
    </div>
  );
}

export default Search;
