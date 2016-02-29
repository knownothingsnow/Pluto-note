<template>
  <div id="app">
    <h1>Pluto note</h1>
    <sign-in></sign-in>
  </div>
</template>

<style>
  body {
    height          : 100%;
    font-family     : Helvetica, sans-serif;
    background      : url("../../img/Pluto.jpg") no-repeat;
    background-size : cover;
  }

  div#app {
    display         : flex;
    height          : 100%;
    flex-flow       : column wrap;
    justify-content : center;
  }

  div#app h1 {
    display         : inline-flex;
    justify-content : center;
    font-size       : 50px;
    color           : #FFFFFF;
  }


</style>

<script>
  import signIn from './sign_in.vue'

  export default {
    components: {signIn}
  };
</script>