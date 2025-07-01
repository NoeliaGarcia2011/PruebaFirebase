/*-----Worker de Firebase-----*/

//Los imports no funcionan en un worker, hace falta usar URLs e importScripts
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js")

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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//Función para mensajes en segundo plano (por defecto, solo se muestran por pantalla con Toastify)
messaging.onBackgroundMessage(payload => {
    console.log('Este mensaje se envió cuando estabas ausente');

    //Se separa el título de lo demás de la notificación, ya que showNotification espera los parámetros así
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/favicon.ico"
    }

    return self.registration.showNotification(notificationTitle, notificationOptions);
})