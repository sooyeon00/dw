import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZxyo_CCbGwPPhoVZmCQeimyncNyE8ywk",
  authDomain: "dwos-9568e.firebaseapp.com",
  projectId: "dwos-9568e",
  storageBucket: "dwos-9568e.appspot.com",
  messagingSenderId: "603765095149",
  appId: "1:603765095149:web:f6e7f14d3c4233e2c22ae4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}

export { getDatas };
