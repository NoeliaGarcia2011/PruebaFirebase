/*-----Archivo de configuración de Firebase-----*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCKaVHGI6oRz2DIRhk--yvK15vDtIFsso",
    authDomain: "prueba-30f36.firebaseapp.com",
    projectId: "prueba-30f36",
    storageBucket: "prueba-30f36.firebasestorage.app",
    messagingSenderId: "677981103342",
    appId: "1:677981103342:web:f2c17719904b6cef79ffff",
    measurementId: "G-8K5MDVJF4X"
};

// Initialize Firebase & Messaging
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);