// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0KIHDZnHtJL-LlSFFVTKG_tqG65eP8gY",
    authDomain: "tembea-kenya-17a67.firebaseapp.com",
    projectId: "tembea-kenya-17a67",
    storageBucket: "tembea-kenya-17a67.firebasestorage.app",
    messagingSenderId: "390772638277",
    appId: "1:390772638277:web:4bfb9641a41b188480592c",
    measurementId: "G-F8KB597L6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth,analytics };
export default app;