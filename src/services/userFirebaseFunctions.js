import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserData = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.exists ? userSnapshot.data() : null;
  return userData;
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
  } catch (error) {
    console.error("Error adding user to group chat:", error);
    throw new Error("Failed to add user to group chat");
  }
};

export const searchUsers = async (searchText) => {
  const usersRef = collection(db, "users");

  const q = query(
    usersRef,
    orderBy("username"),
    startAt(searchText),
    endAt(searchText + "\uf8ff")
  );

  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    users.push({ id: doc.id, username: data.username });
  });

  return users;
};

export const addUserToChat = async (userId, chatId, chatType) => {
  const userDocRef = doc(db, "users", userId);
  const chatCollection = chatType === "group" ? "groupChats" : "privateChats";
  const chatDocRef = doc(db, chatCollection, chatId);

  try {
    await updateDoc(chatDocRef, {
      users: arrayUnion(userId),
    });

    const userChatArray = chatType === "group" ? "groupChats" : "privateChats";
    await updateDoc(userDocRef, {
      [userChatArray]: arrayUnion(chatId),
    });
  } catch (error) {
    console.error(`Error adding user to ${chatType} chat:`, error);
    throw new Error(`Failed to add user to ${chatType} chat`);
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
  } catch (error) {
    console.error("Error removing user from group chat:", error);
    throw new Error("Failed to remove user from group chat");
  }
};
