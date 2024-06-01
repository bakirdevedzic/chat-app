import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getUsers({ chatData, userId }) {
  const participantUserIds = chatData.users.filter(
    (user_Id) => user_Id !== userId
  );

  const participantDataPromises = participantUserIds.map(async (user_Id) => {
    const userDocRef = doc(db, "users", user_Id);
    const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.exists ? userSnapshot.data().username : null;
  });

  const participantNames = await Promise.all(participantDataPromises);
  return participantNames;
}
