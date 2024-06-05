import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getUsers({ chatData, userId }) {
  const participantUserIds = chatData.users.filter(
    (user_Id) => user_Id !== userId
  );

  const participantDataPromises = participantUserIds.map(async (user_Id) => {
    const userDocRef = doc(db, "users", user_Id);
    const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.exists
      ? { userId: user_Id, username: userSnapshot.data().username }
      : null;
  });

  const participantNames = await Promise.all(participantDataPromises);
  return participantNames;
}

function returnName(participants, userId) {
  for (const participant of participants) {
    if (participant.userId === userId) {
      return participant.username;
    }
  }
  return "You";
}

export function transformDate(timestamp) {
  if (!timestamp || !timestamp.seconds || !timestamp.nanoseconds) {
    return "Invalid timestamp";
  }

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  const today = new Date();

  const isSameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isSameDay) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    return `${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} (${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()})`;
  }
}

export function transformMessage(message, participants) {
  return {
    id: message.id,
    sender: returnName(participants, message.sender),
    text: message.text,
    timestamp: message.timestamp,
    time: transformDate(message.timestamp),
  };
}

export function setSeen(chats, setChats, chatId) {
  setChats(
    chats.map((chat) =>
      chat.id === chatId ? { ...chat, newMessage: false } : chat
    )
  );
}

export const isUserInGroup = (chatId, chats) => {
  const matchingChat = chats.find((chat) => {
    return (
      chat.id === chatId && (chat.type === "private" || chat.type === "group")
    );
  });

  return !!matchingChat; // Concise boolean check using double negation
};

export const removeChatById = (setChats, id) => {
  // Update chats directly using the callback function with setChats
  setChats((currentChats) => currentChats.filter((chat) => chat.id !== id));
};

export const appendMessagesToChat = (chats, setChats, chatId, messages) => {
  const matchingChatIndex = chats.findIndex((chat) => chat.id === chatId);

  if (matchingChatIndex !== -1) {
    setChats((currentChats) => {
      const updatedChats = [...currentChats];
      updatedChats[matchingChatIndex].messages =
        updatedChats[matchingChatIndex].messages.concat(messages);
      updatedChats[matchingChatIndex].fetchedMessageAmount =
        updatedChats[matchingChatIndex].messages.length;
      return updatedChats;
    });
  } else {
    console.warn("Chat not found with ID:", chatId);
  }
};

export function hasPrivateChat(chats, personId) {
  return chats.some(
    (chat) => chat.type === "private" && chat.users.includes(personId)
  );
}
