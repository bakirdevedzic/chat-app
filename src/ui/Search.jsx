import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm">
      <FiSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search message"
        className="ml-2 outline-none bg-transparent text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
