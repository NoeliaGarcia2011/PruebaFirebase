<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {getAuth, signInAnonymously} from 'firebase/auth' //Auth anónima Firebase
import {getToken, onMessage} from 'firebase/messaging' //Parámetros necesarios para Cloud Messaging
import {messaging} from '@/firebase.js' //Export de mensajes para esta app
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

//Inicio de sesión anónima con una Promise
const login = () => {
  signInAnonymously(getAuth()).then(usuario => console.log(usuario))
};

const activarMensajes = async () => {
  //Solicita un token de registro para recibir notificaciones push usando la clave VAPID proporcionada
  const token = await getToken(messaging, {
    vapidKey: 'BKkCvX7DF3-6H-K7dsTwiNxbCfrjlgglvLcEuGkcV3CRTIAkrgC8Iduifv0FB2emj4SUDyS--ilpDGUD407bea0'
  }).catch(error => console.log('Error: ', error));

  //Si hay token lo imprime por consola
  token ? console.log('Token:', token) : console.log('No hay token');

  //Escucha los mensajes entrantes y muestra una notificación Toast con el cuerpo del mensaje
  onMessage(messaging, (message) => {
    console.log('Tu mensaje: ', message);
    myToast(message.notification.body);
  });

};

//Configuración de las notificaciones Toast
const myToast = (message) => {
  Toastify({
    text: message,
    duration: 7000,
    gravity: "top",
    position: "right",
    close: true,
    ariaLive: "polite",
    style: {
      background: "#00bd7e",
      color: "#000",
      fontFamily: "Inter, sans-serif",
      borderRadius: "8px",
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
