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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
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
  // getDatas 전체 가져옴
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  // getDocs 전체문서를 가져오는 함수,  getDoc 문서하나만 가져오는 함수
  return resultData;
}

async function getDatasByOrder(collectionName, options) {
  // getDatasByOrder 정렬 기능까지 추가해서 가져옴
  const collect = await collection(db, collectionName);
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3...);
  const q = query(collect, orderBy(options.order, "desc"));
  // options -객체 , order -프로퍼티 / asc -오름차순, desc -내림차순
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}
// 어떤 필드를 기준으로 할지, 부합하는 값

async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }

  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  console.log(lastQuery);
  // console.log(lastQuery);
  // console.log(snapshot.docs);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return { resultData, lastQuery };
}

async function addDatas(collectionName, dataObj) {
  try {
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);

    dataObj.imgUrl = url;
    // createdAt, updatedAt ==> 현재 날짜 밀리세컨즈로 바꿔서
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // id 필드의 값 ==> 가장 큰 id + 1
    const lastId = await getLastNum(collectionName, "id");
    dataObj.id = lastId + 1;

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    const docSnap = await getDoc(result); //  result == > documentReference
    console.log(result);

    const resultData = { ...docSnap.data(), docId: docSnap.id };

    return resultData;
    return true;
  } catch (error) {
    return false; // 오류에 대한 처리
  }
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();
  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);
  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);
  // 저장한 File의 url 가져오기
  const url = await getDownloadURL(imageRef);
  return url;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();

  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // 3. 컬렉션에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, dataObj, docId) {
  // doc(db, 컬렉션명, 문서ID);
  // getDocs(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);
  // 수정할 데이터 양식 생성 => title, content, rating, updateAt, imgUrl
  const time = new Date().getTime();
  dataObj.updatedAt = time;
  // 사진파일이 수정되면 => 기존사진 삭제 => 새로운사진 추가 => url 받아와서 imgUrl 값 셋팅
  if (dataObj.imgUrl !== null) {
    // 기존사진 url 가져오기
    const docSnap = await getDoc(docRef);
    const prevImgUrl = docSnap.data().imgUrl;
    // 스토리지에서 기존사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, prevImgUrl);
    await deleteObject(deleteRef);
    // 새로운 사진 추가
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;
  } else {
    // imgUrl 프로퍼티 삭제 (객체, 삭제할 프롭)
    delete dataObj["imgUrl"];
  }
  // 사진파일이 수정되지 않으면 => 변경데이터만 업데이트
  await updateDoc(docRef, dataObj);
  const updatedData = await getDoc(docRef); // getDocs().docs.map (doc => {})
  const resultData = { docId: updatedData.id, ...updatedData.data() };
  return resultData;
}

// 비동기 async,await(=than) - 순서대로 실행될 수 있게끔
export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
}; // export 외부로 보낼 때
// c:create , r:read, u:update(회원정보 수정), d:delete
