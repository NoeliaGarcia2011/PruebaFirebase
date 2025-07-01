<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { getAuth, signInAnonymously } from 'firebase/auth' //Auth anónima Firebase
import { getToken, onMessage } from 'firebase/messaging' //Parámetros necesarios para Cloud Messaging
import { messaging } from '@/firebase.js' //Export de mensajes para esta app
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

// Inicio de sesión anónima con una Promise
const login = () => {
  signInAnonymously(getAuth()).then(usuario => console.log(usuario))
};

const activarMensajes = async () => {
  const token = await getToken(messaging, {
    vapidKey: 'BKkCvX7DF3-6H-K7dsTwiNxbCfrjlgglvLcEuGkcV3CRTIAkrgC8Iduifv0FB2emj4SUDyS--ilpDGUD407bea0'
  }).catch(error => console.log('Error: ', error));

  token ? console.log('Token:', token) : console.log('No hay token');

  onMessage(messaging, (message) => {
    console.log('Tu mensaje: ', message);
    myToast(message.notification.body);
  });

};

const myToast = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#00bd7e",
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

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
