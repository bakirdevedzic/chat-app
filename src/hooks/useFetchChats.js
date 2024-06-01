import { useQuery } from "@tanstack/react-query";
import { fetchUserChats } from "../services/firebase";

const useFetchChats = (userId) => {
  const queryResult = useQuery(
    ["chats", userId],
    () => fetchUserChats(userId),
    {
      enabled: !!userId,
    }
  );

  return {
    status: queryResult.status,
    error: queryResult.error,
    chats: queryResult.data,
  };
};

export default useFetchChats;
