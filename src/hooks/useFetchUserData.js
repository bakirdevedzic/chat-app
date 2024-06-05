import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUserData } from "../services/userFirebaseFunctions";
// import { fetchUserData } from "../services/firebase";

function useFetchUserData(userId) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserDataApi() {
      try {
        const userData = await fetchUserData(userId);
        setUserData(userData);
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchUserDataApi();
  }, [userId]);

  return { userData };
}

export default useFetchUserData;
