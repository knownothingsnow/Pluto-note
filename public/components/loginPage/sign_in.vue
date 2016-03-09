<template>
  <div class="form-wrapper">
    <form class="am-form" method="post" action="/login/submit">
      <fieldset>
        <div class="am-form-group">
          <label for="user-id">账号</label>
          <input type="text" id="user-id" name="userId" placeholder="请输入账号">
        </div>
        <div class="am-form-group">
          <label for="user-password">密码</label>
          <input type="password" id="user-password" name="passWord" placeholder="请输入密码">
        </div>
        <div class="am-checkbox">
          <label>
            <input type="checkbox">记住密码
          </label>
        </div>
      </fieldset>
      <input type="submit" class="am-btn am-radius am-btn-success">
    </form>
  </div>
</template>

<style>
  .form-wrapper {
    width            : 500px;
    padding          : 1%;
    border-radius    : 15px;
    background-color : #CCCCCC;
  }

</style>
<script>
  'use strict';
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>