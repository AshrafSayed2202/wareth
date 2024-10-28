import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjPwhSpYl74p6QK16re45WjgohSApRGC0",
    authDomain: "el-wareth.firebaseapp.com",
    projectId: "el-wareth",
    storageBucket: "el-wareth.appspot.com",
    messagingSenderId: "231590554318",
    appId: "1:231590554318:web:f3f71a1ad48460fe67fe9f",
    measurementId: "G-8DS97KTEWJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);