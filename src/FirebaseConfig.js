import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD5VuVUoFQ9Tn8NpTjgDkUi5_Z5xTslIvI",
  authDomain: "qrimageuploader.firebaseapp.com",
  projectId: "qrimageuploader",
  storageBucket: "qrimageuploader.firebasestorage.app",
  messagingSenderId: "372209523986",
  appId: "1:372209523986:web:daa5698a754115e3d0a7cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
