import { db } from "./firebaseClient"; 
import { doc } from "firebase/firestore";




export async function userRefDatabase(uid) {
  console.log(uid,"kddnk")
  if(uid)
    throw new Error("❌ userId is missing");
  const userRef = doc(db, "users", uid);
  return userRef;
}



