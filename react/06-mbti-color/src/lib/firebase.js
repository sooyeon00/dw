import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8ZLtAW47em5k9K6OwaTpWOSHnRcgsQZ0",
  authDomain: "mbti-project-2d385.firebaseapp.com",
  projectId: "mbti-project-2d385",
  storageBucket: "mbti-project-2d385.appspot.com",
  messagingSenderId: "1006708069660",
  appId: "1:1006708069660:web:b4d2fd89a70ea46958d6d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy(order, "desc")); // desc : 내림차순
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
  //   debugger; // 디버거를 하면서 코드로 옮김
}

export { getAllDatas };
