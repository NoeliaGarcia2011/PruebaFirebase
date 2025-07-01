<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['login', 'activarMensajes'])
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <h3>
      <button @click="emit('login')">Login</button>
      &nbsp;
      <button @click="emit('activarMensajes')">Generar Token (para pruebas)</button>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 4rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
}

button:hover {
  background-color: #369d75;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.4);
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
