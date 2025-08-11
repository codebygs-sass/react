import { auth } from "./firebaseClient";

const user = auth.currentUser ?? '';
if (user) {
  console.log("UID:", user.uid);
  console.log("Email:", user.email);
  console.log("Display Name:", user.displayName);
  console.log("Phone:", user.phoneNumber); // Only if phone auth used
  console.log("Photo URL:", user.photoURL);
} else {
  console.log("No user is signed in");
}

export default user;

