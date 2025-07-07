/**
 * Import function triggers from their respective submodules:
 *
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions"); //Opciones necesarias de firebase-functions
const admin = require("firebase-admin"); //Módulo necesario para acceder a servicios administrativos (en este caso auth, messages)
const serviceAccount = require('../serviceAccount.json'); //JSON para autentificar con Firebase

//Inicializa la app con el JSON
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//En este caso, limita el número de instancias simultáneas a 10
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//Variable con el mensaje y el token del dispositivo al que se envía la notificación
const message = {
    token: 'cqtB-pyiqQitw93dIOXKG5:APA91bHcddn3rr83y1I3_Bc1VL3FVHcsHlz5ove5zR2Xh5rnRk4T4dVtqaoyoFzR4PyvDSUhUW0xVrxsPATj-eVqP1NWzgD4qS7MOfC6zyagE924N0AtVrQ',
    notification: {
        title: 'On a night like tonight',
        body: 'Are we just two stars passing by?'
    },
};

//Envía el mensaje
admin.messaging().send(message)
    .then(response => {
        console.log('Mensaje enviado con éxito:', response);
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
    });
