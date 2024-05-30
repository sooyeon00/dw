import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDS6FfGDKGBrRww_GRBO-O1YChuvMZHS-k",
  authDomain: "zzzz-6e610.firebaseapp.com",
  projectId: "zzzz-6e610",
  storageBucket: "zzzz-6e610.appspot.com",
  messagingSenderId: "879592350896",
  appId: "1:879592350896:web:5dc5f0b82121b188a40775",
  measurementId: "G-7VBMYHY2NH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMembers() {
  const collect = await collection(db, "member");
  const snapshot = await getDocs(collect);
  return snapshot;
}

export { db, getMembers };
