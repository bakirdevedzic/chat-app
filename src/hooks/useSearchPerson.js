import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
// import { searchUsers } from "../services/firebase";
import toast from "react-hot-toast";
import { searchUsers } from "../services/userFirebaseFunctions";

function useSearchPerson() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search.length > 1) {
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          setLoading(true);
          searchTimeoutRef.current = setTimeout(async () => {
            try {
              const fetchedPeople = await searchUsers(search);
              setPeople(fetchedPeople);
            } catch (error) {
              toast.error(error.message);
            } finally {
              setLoading(false);
            }
          }, 1000);
        } else {
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
            searchTimeoutRef.current = null;
            setPeople([]);
            setLoading(false);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  return {
    search,
    setSearch,
    loading,
    people,
    selectedPerson,
    setSelectedPerson,
    setPeople,
  };
}
export default useSearchPerson;
