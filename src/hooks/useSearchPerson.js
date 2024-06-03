import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { searchUsers } from "../services/firebase";

function useSearchPerson() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
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
            console.log(error);
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
    };

    fetchData();

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);
  console.log("people2", people);

  return { search, setSearch, loading, people };
}
export default useSearchPerson;
