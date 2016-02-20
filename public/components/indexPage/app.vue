<template>
  <div id="app">
    <h1>this is index!!</h1>
    <img class="logo" src="../../assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
  import Hello from './../Hello.vue';

  export default {
    components: {
      Hello
    }
  };
</script>

<style>
  body {
    font-family : Helvetica, sans-serif;
  }
</style>
