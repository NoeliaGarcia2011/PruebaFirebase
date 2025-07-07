<script setup>
import HelloWorld from './components/HelloWorld.vue' //Componente de Vue
import { getAuth, signInAnonymously } from 'firebase/auth' //Auth anónima Firebase
import { getToken, onMessage } from 'firebase/messaging' //Parámetros necesarios para Cloud Messaging
import { messaging } from '@/firebase.js' //Export de función de mensajes de la config para esta app
import { onMounted } from 'vue' //Import de Vue para inicializar funciones una vez los elementos del DOM han cargado
import Toastify from 'toastify-js' //Importamos Toastify para usarlo
import 'toastify-js/src/toastify.css' //CSS de Toastify

//Inicio de sesión anónima con una Promise
const login = () => {
  signInAnonymously(getAuth()).then(usuario => console.log(usuario))
};

//Lógica de los mensajes
const activarMensajes = async () => {
  const permission = await Notification.requestPermission();

  console.log("¿Notificaciones permitidas (granted) o denegadas (denied)?:", permission);

  if (permission !== 'granted') {
    console.log("❌ notificaciones");
    return;
  }

  //Solicita un token de registro para recibir notificaciones push usando la clave VAPID proporcionada
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
  }).catch(error => console.log('Error: ', error));
  //Si hay token lo imprime por consola

  token ? console.log('Token:', token) : console.log('No hay token');
  console.log("Escuchando mensajes...");

  //Escucha los mensajes entrantes y muestra una notificación Toast con el cuerpo del mensaje
  onMessage(messaging, (message) => {
    console.log('Se ha enviado el siguiente mensaje:\n' + '"' + message.notification.title + '...' + '\n' + message.notification.body + '"' );
    myToast(message.notification.body);
  });

//   const sendNotification = httpsCallable(functions, 'sendNotification');
//   sendNotification({
//     title: '¡Hola!',
//     body: 'Esta es una notificación de prueba',
//     token: token,
//   })
//       .then((result) => {
//         console.log('Notificación enviada correctamente:', result.data);
//       })
//       .catch((error) => {
//         console.error('Error al enviar notificación:', error);
//       });
//
};

//Realiza la función de mostrar mensajes automáticamente al cargar todos los elementos del DOM
onMounted(() => {
  activarMensajes()
})

//Configuración de las notificaciones Toast, Toastificar el mensaje a imprimir
const myToast = (message) => {
  Toastify({
    text: message,
    duration: 7000,
    gravity: "top",
    position: "right",
    style: {
      background: "#42b983",
      color: "#ffffff",
      fontFamily: "Inter, sans-serif",
      padding: "12px 16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    }
  }).showToast();
};

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Probando Firebase..."
                  @login="login"
                  @activarMensajes="activarMensajes"
      />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
