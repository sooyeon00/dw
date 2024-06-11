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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}

async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj); // 컬렉션,문서명,
}
