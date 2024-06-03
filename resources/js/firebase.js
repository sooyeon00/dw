import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// import, from 불러올 때

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

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  // getDocs 전체문서를 가져오는 함수,  getDoc 문서하나만 가져오는 함수
  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  try {
    // 문서 ID 수동
    // const saveDoc = await doc(db, collectionName, "2");  "2"=> 문서아이디
    // console.log(`doc() 결과: ${saveDoc}`);
    // const saveResult = await setDoc(saveDoc, dataObj);
    // console.log(`setdoc() 결과: ${saveResult}`);

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj); // 결과가 == undefined
    return true;
  } catch (error) {
    return false; // 오류에 대한 처리
  }
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, upcateInfoObj) {
  // doc(db, 컬렉션명, 문서ID);
  // getDocs(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);
  // const getData = await getDoc(docRef);
  await updateDoc(docRef, upcateInfoObj);
}

// 비동기 async,await(=than) - 순서대로 실행될 수 있게끔
export { db, getDatas, addDatas, deleteDatas, updateDatas }; // export 외부로 보낼 때
// c:create , r:read, u:update(회원정보 수정), d:delete
