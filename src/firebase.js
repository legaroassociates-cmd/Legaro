
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4wM4eKLjDdTNu1haGNcNeHssdMFQPv_Y",
    authDomain: "legaro-75541.firebaseapp.com",
    projectId: "legaro-75541",
    storageBucket: "legaro-75541.firebasestorage.app",
    messagingSenderId: "987991674014",
    appId: "1:987991674014:web:f214c25aca1e9f31c13f8f",
    measurementId: "G-15XKQY04RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
