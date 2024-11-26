<template>
  
  <CriarUser></CriarUser>
  <router-view></router-view>
</template>

<script>
import CriarUser from './components/CriarUser.vue'

export default {
  name: 'App',
  components: {
    CriarUser
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
