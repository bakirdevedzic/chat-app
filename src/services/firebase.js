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
  updateDoc,
  arrayUnion,
  arrayRemove,
  getCountFromServer,
} from "firebase/firestore";
import { getUsers } from "../utils/helpers";

export const fetchUserData = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.exists ? userSnapshot.data() : null;
  return userData;
};

export const fetchExploreGroups = async (userId) => {
  try {
    const userData = await fetchUserData(userId);
    const userGroupChatIds = new Set(userData?.groupChats || []);

    const groupChatsRef = collection(db, "groupChats");
    const groupChatsSnapshot = await getDocs(groupChatsRef);

    const allGroupChats = groupChatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      type: "explore",
    }));

    const exploreGroups = allGroupChats.filter(
      (group) => !userGroupChatIds.has(group.id)
    );

    return exploreGroups;
  } catch (error) {
    console.error("Error fetching explore groups:", error);
    return [];
  }
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
        const messageCount = await getMessageCount(chatId, "private");
        return {
          id: chatDocRef.id,
          messageCount: messageCount,
          type: "private",
          ...chatData,
          newMessage: false,
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
        const messageCount = await getMessageCount(chatId, "group");
        return {
          id: chatDocRef.id,
          messageCount: messageCount,
          type: "group",
          newMessage: false,
          ...chatData,
          messages,
          participants: participantNames,
          latestMessageTimestamp,
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

export const fetchChatMessages = async (chatId, chatType, userId) => {
  try {
    // Determine the collection based on chat type
    const chatCollection = chatType === "group" ? "groupChats" : "privateChats";

    // Fetch the chat document
    const chatDocRef = doc(collection(db, chatCollection), chatId);
    const chatSnapshot = await getDoc(chatDocRef);
    const chatData = chatSnapshot.exists() ? chatSnapshot.data() : null;

    if (!chatData) {
      console.warn(`Chat not found: ${chatId}`);
      return null;
    }

    // Fetch the last 50 messages
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

    const participantNames = await getUsers({ chatData, userId });
    const messageCount = await getMessageCount(chatId, "group");
    return {
      id: chatDocRef.id,
      messageCount: messageCount,
      type: chatType,
      ...chatData,
      participants: participantNames,
      messages,
      latestMessageTimestamp,
    };
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return null;
  }
};

export const addSingleChatMessageListener = (chat, onNewMessage) => {
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
};

export const fetchChatAndAddListener = async (
  chatId,
  chatType,
  onNewMessage,
  userId
) => {
  try {
    // Fetch chat messages
    const chat = await fetchChatMessages(chatId, chatType, userId);

    if (!chat) {
      console.warn(`Chat not found or failed to fetch: ${chatId}`);
      return null;
    }

    // Add message listener
    addSingleChatMessageListener(chat, onNewMessage);

    return chat;
  } catch (error) {
    console.error("Error fetching chat and adding listener:", error);
    return null;
  }
};

export const addUserToGroupChat = async (userId, chatId) => {
  const userDocRef = doc(db, "users", userId);
  const chatDocRef = doc(db, "groupChats", chatId);

  try {
    await updateDoc(chatDocRef, {
      users: arrayUnion(userId),
    });

    await updateDoc(userDocRef, {
      groupChats: arrayUnion(chatId),
    });

    console.log("User added to group chat successfully");
  } catch (error) {
    console.error("Error adding user to group chat:", error);
    throw new Error("Failed to add user to group chat");
  }
};

export const removeUserFromGroupChat = async (userId, chatId) => {
  const userDocRef = doc(db, "users", userId);
  const chatDocRef = doc(db, "groupChats", chatId);

  try {
    await updateDoc(chatDocRef, {
      users: arrayRemove(userId),
    });

    await updateDoc(userDocRef, {
      groupChats: arrayRemove(chatId),
    });

    console.log("User removed from group chat successfully");
  } catch (error) {
    console.error("Error removing user from group chat:", error);
    throw new Error("Failed to remove user from group chat");
  }
};

const getMessageCount = async (chatId, chatType) => {
  try {
    const chatCollection = chatType === "group" ? "groupChats" : "privateChats";
    const messagesRef = collection(db, chatCollection, chatId, "messages");

    const snapshot = await getCountFromServer(messagesRef);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting message count:", error);
    throw new Error("Failed to get message count");
  }
};
