<template>
  <OrbitTime />
</template>

<script>
import OrbitTime from './components/OrbitTime.vue';

export default {
  name: 'App',
  components: {
    OrbitTime
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #929292;
  background-color: #0A0A0A;
  width: 100%;
  min-height: 100vh;
  padding-top: 40px;
}

</style>
