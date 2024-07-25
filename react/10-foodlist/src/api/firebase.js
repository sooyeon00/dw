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

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("food/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

async function getDatasOrderByLimit(collectionName, options) {
  const { fieldName, limits } = options;
  let q;
  if (!options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      startAfter(options.lq),
      limit(limits)
    );
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  console.log(lastQuery);
  const resultData = docs.map(function (doc) {
    return { ...doc.data(), docId: doc.id };
  });
  return { resultData, lastQuery };
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 스토리이제 있는 이미지를 삭제할 때 필요한 것 ==> 파일명(경로포함) or 파일 url
  // 스토리지 객체 생성
  const storage = getStorage();
  let message;
  try {
    message = "이미지 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 삭제할 파일의 참조객체 생성(ref 함수 사용)
    const deleteRef = ref(storage, imgUrl);
    // 파일 삭제
    await deleteObject(deleteRef);

    message = "문서 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 삭제할 문서의 참조객체 생성(doc 함수 사용)
    const deleteDocRef = doc(db, collectionName, docId);
    // 문서 삭제
    await deleteDoc(deleteDocRef);

    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
}

async function updateDatas() {
  console.log("updateDatas 함수 실행!!");
}

export { addDatas, getDatasOrderByLimit, deleteDatas, updateDatas };
