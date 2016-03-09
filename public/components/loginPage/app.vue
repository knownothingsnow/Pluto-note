<template>
  <div id="app">
    <div class="am-g am-g-fixed"><h1 class="am-u-lg-2 am-u-md-3 am-u-sm-3 am-u-sm-centered am-u-md-centered am-u-lg-centered">Pluto note</h1></div>
    <span>
      <a v-link="{ path: '/sign_in',exact: true }">登录</a>
      <a v-link="{ path: '/register',exact: true }">注册</a>
    </span>
    <router-view class="view" keep-alive transition transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  'use strict';

</script>

<style>
  body {
    height          : 100%;
    font-family     : Helvetica, serif;
    background      : url("../../img/Pluto.jpg") no-repeat;
    background-size : cover;
  }

  div#app {
    height          : 100%;
  }

  div#app h1 {
    font-size       : 50px;
    color           : #FFFFFF;
  }


</style>