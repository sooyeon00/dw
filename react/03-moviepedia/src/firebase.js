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
} from "firebase/firestore";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// import, from 불러올 때

const firebaseConfig = {
  apiKey: "AIzaSyDOUz1yfB1zaSKLOWMP4bVRyT_dqJwCMT0",
  authDomain: "movie-foodit-6b8e5.firebaseapp.com",
  projectId: "movie-foodit-6b8e5",
  storageBucket: "movie-foodit-6b8e5.appspot.com",
  messagingSenderId: "220100702279",
  appId: "1:220100702279:web:695ff61de8d14de84cc162",
  measurementId: "G-QRHTD4DJM5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  // getDocs 전체문서를 가져오는 함수,  getDoc 문서하나만 가져오는 함수
  return resultData;
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
