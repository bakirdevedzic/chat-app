import { db } from "../firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getUsers } from "../utils/helpers";

export const fetchGroups = async () => {
  const groups = [];
  const ref = collection(db, "groupChats");
  try {
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => {
      groups.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
    console.log(error);
  }
  return groups;
};

export const fetchUserData = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.exists ? userSnapshot.data() : null;
  return userData;
};

export const fetchUserChats = async (userId, onNewMessage) => {
  try {
    const userData = await fetchUserData(userId);

    const privateChatIds = userData?.privateChats || [];
    const groupChatIds = userData?.groupChats || [];

    const privateChats = await Promise.all(
      privateChatIds.map(async (chatId) => {
        const chatDocRef = doc(collection(db, "privateChats"), chatId);
        const chatSnapshot = await getDoc(chatDocRef);
        const chatData = chatSnapshot.exists ? chatSnapshot.data() : null;

        if (!chatData) {
          console.warn(`Private chat not found: ${chatId}`);
          return null;
        }
        const participantNames = await getUsers({ chatData, userId });

        const messagesRef = query(
          collection(chatDocRef, "messages"),
          orderBy("timestamp", "desc"),
          limit(50)
        );
        const messagesSnapshot = await getDocs(messagesRef);
        const messages = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          id: chatDocRef.id,
          type: "private",
          ...chatData,
          participants: participantNames,
          messages,
        };
      })
    );

    const groupChats = await Promise.all(
      groupChatIds.map(async (chatId) => {
        const chatDocRef = doc(collection(db, "groupChats"), chatId);
        const chatSnapshot = await getDoc(chatDocRef);
        const chatData = chatSnapshot.exists ? chatSnapshot.data() : null;

        if (!chatData) {
          console.warn(`Group chat not found: ${chatId}`);
          return null;
        }

        const messagesRef = query(
          collection(chatDocRef, "messages"),
          orderBy("timestamp", "desc"),
          limit(50)
        );
        const messagesSnapshot = await getDocs(messagesRef);
        const messages = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          id: chatDocRef.id,
          type: "group",
          ...chatData,
          messages,
        };
      })
    );

    const chats = [...privateChats, ...groupChats].filter(Boolean);

    addMessageListeners(chats, onNewMessage);

    return chats;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return [];
  }
};

export const addMessageListeners = (chats, onNewMessage) => {
  chats.forEach((chat) => {
    const messagesRef = query(
      collection(
        db,
        chat.type === "private" ? "privateChats" : "groupChats",
        chat.id,
        "messages"
      ),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    onSnapshot(messagesRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newMessage = { id: change.doc.id, ...change.doc.data() };
          onNewMessage(chat.id, newMessage);
        }
      });
    });
  });
};
