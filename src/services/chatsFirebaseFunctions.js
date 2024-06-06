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
  getCountFromServer,
  startAfter,
  addDoc,
} from "firebase/firestore";
import { getUsers, transformMessage } from "../utils/helpers";
import { addUserToChat, fetchUserData } from "./userFirebaseFunctions";

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

    const fetchChatPromises = [...privateChatIds, ...groupChatIds].map(
      (chatId) => {
        const chatType = privateChatIds.includes(chatId) ? "private" : "group";
        return fetchChatAndAddListener(chatId, chatType, onNewMessage, userId);
      }
    );

    const chats = (await Promise.all(fetchChatPromises)).filter(Boolean);

    return chats;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return [];
  }
};

export const sendMessage = async (chatId, chatType, message, userId) => {
  try {
    const chatDocRef = doc(
      collection(db, chatType === "private" ? "privateChats" : "groupChats"),
      chatId
    );
    const messagesCollectionRef = collection(chatDocRef, "messages");

    const newMessageRef = doc(messagesCollectionRef);
    const newMessage = {
      text: message,
      sender: userId,
      timestamp: serverTimestamp(),
    };

    await setDoc(newMessageRef, newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const fetchChatMessages = async (chatId, chatType, userId) => {
  try {
    const chatCollection = chatType === "group" ? "groupChats" : "privateChats";

    const chatDocRef = doc(collection(db, chatCollection), chatId);
    const chatSnapshot = await getDoc(chatDocRef);
    const chatData = chatSnapshot.exists() ? chatSnapshot.data() : null;

    if (!chatData) {
      console.warn(`Chat not found: ${chatId}`);
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

    const latestMessageTimestamp =
      messages.length > 0 ? messages[0].timestamp : null;

    const participantNames = await getUsers({ chatData, userId });
    const messageCount = await getMessageCount(chatId, "group");
    const transformedMessages = messages.map((message) =>
      transformMessage(message, participantNames)
    );
    return {
      id: chatDocRef.id,
      messageCount: messageCount,
      type: chatType,
      ...chatData,
      participants: participantNames,
      messages: transformedMessages,
      fetchedMessageAmount: messages.length,
      latestMessageTimestamp,
    };
  } catch (error) {
    throw new Error(error);
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
    const chat = await fetchChatMessages(chatId, chatType, userId);

    if (!chat) {
      console.warn(`Chat not found or failed to fetch: ${chatId}`);
      return null;
    }

    addSingleChatMessageListener(chat, onNewMessage);

    return chat;
  } catch (error) {
    console.error("Error fetching chat and adding listener:", error);
    return null;
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

export const loadMoreMessages = async (
  chatId,
  chatType,
  lastTimestamp,
  participantNames,
  pageSize = 20
) => {
  try {
    const chatCollection = chatType === "group" ? "groupChats" : "privateChats";
    const messagesRef = collection(db, chatCollection, chatId, "messages");

    const messagesQuery = query(
      messagesRef,
      orderBy("timestamp", "desc"),
      startAfter(lastTimestamp),
      limit(pageSize)
    );

    const messagesSnapshot = await getDocs(messagesQuery);
    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const transformedMessages = messages.map((message) =>
      transformMessage(message, participantNames)
    );
    return transformedMessages;
  } catch (error) {
    throw new Error("Failed to load more messages");
  }
};

export const createPrivateChat = async (userId1, userId2, initialMessage) => {
  try {
    const chatRef = await addDoc(collection(db, "privateChats"), {
      type: "private",
      users: [userId1, userId2],
      createdAt: serverTimestamp(),
    });

    const messageRef = await addDoc(collection(chatRef, "messages"), {
      text: initialMessage,
      sender: userId1,
      timestamp: serverTimestamp(),
    });

    await addUserToChat(userId1, chatRef.id, "private");
    await addUserToChat(userId2, chatRef.id, "private");

    return chatRef.id;
  } catch (error) {
    console.error("Error creating private chat:", error);
    throw new Error("Failed to create private chat");
  }
};
