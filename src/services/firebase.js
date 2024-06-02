import { db } from "../firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  getDoc,
  doc,
  serverTimestamp,
  setDoc,
  onSnapshot,
  where,
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

export const fetchUserChats = async (userId, onNewMessage, setChats) => {
  try {
    const userData = await fetchUserData(userId);

    const privateChatIds = userData?.privateChats || [];
    const groupChatIds = userData?.groupChats || [];

    const privateChats = await Promise.all(
      privateChatIds.map(async (chatId) => {
        const chatDocRef = doc(collection(db, "privateChats"), chatId);
        const chatSnapshot = await getDoc(chatDocRef);
        const chatData = chatSnapshot.exists() ? chatSnapshot.data() : null;

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

        const latestMessageTimestamp =
          messages.length > 0 ? messages[0].timestamp : null;

        return {
          id: chatDocRef.id,
          type: "private",
          ...chatData,
          participants: participantNames,
          messages,
          latestMessageTimestamp,
        };
      })
    );

    const groupChats = await Promise.all(
      groupChatIds.map(async (chatId) => {
        const chatDocRef = doc(collection(db, "groupChats"), chatId);
        const chatSnapshot = await getDoc(chatDocRef);
        const chatData = chatSnapshot.exists() ? chatSnapshot.data() : null;

        if (!chatData) {
          console.warn(`Group chat not found: ${chatId}`);
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

        const latestMessageTimestamp =
          messages.length > 0 ? messages[0].timestamp : null;

        return {
          id: chatDocRef.id,
          type: "group",
          ...chatData,
          messages,
          participants: participantNames,
          latestMessageTimestamp,
        };
      })
    );

    const chats = [...privateChats, ...groupChats].filter(Boolean);

    addMessageListeners(chats, onNewMessage, setChats);

    return chats;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return [];
  }
};

export const addMessageListeners = (chats, onNewMessage, setChats) => {
  chats.forEach((chat) => {
    if (!chat.latestMessageTimestamp) return;

    const messagesRef = query(
      collection(
        db,
        chat.type === "private" ? "privateChats" : "groupChats",
        chat.id,
        "messages"
      ),
      where("timestamp", ">", chat.latestMessageTimestamp),
      orderBy("timestamp", "desc")
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

export const sendMessage = async (chatId, chatType, message) => {
  try {
    const chatDocRef = doc(
      collection(db, chatType === "private" ? "privateChats" : "groupChats"),
      chatId
    );
    const messagesCollectionRef = collection(chatDocRef, "messages");

    const newMessageRef = doc(messagesCollectionRef);
    const newMessage = {
      text: message,
      sender: "4QXIEU92mtzeoxE3x9f0",
      timestamp: serverTimestamp(),
    };

    await setDoc(newMessageRef, newMessage);

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
