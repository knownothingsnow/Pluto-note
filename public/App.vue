<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  components: {
    Hello
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
