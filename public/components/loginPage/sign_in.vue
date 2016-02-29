<template>
  <div class="form-wrapper">
    <form class="am-form">
      <fieldset>
        <div class="am-form-group">
          <label for="doc-ipt-email-1">账号</label>
          <input type="email" class="" id="doc-ipt-email-1" placeholder="请输入账号">
        </div>
        <div class="am-form-group">
          <label for="doc-ipt-pwd-1">密码</label>
          <input type="password" class="" id="doc-ipt-pwd-1" placeholder="请输入密码">
        </div>
        <div class="am-checkbox">
          <label>
            <input type="checkbox"> 记住密码
          </label>
        </div>
      </fieldset>
      <button type="button" class="am-btn am-radius am-btn-success">提交</button>
    </form>
  </div>
</template>

<style>
  .form-wrapper {
    display          : flex;
    width            : 500px;
    padding          : 1%;
    border-radius    : 10px;
    background-color : #CCCCCC;
  }

  .form-wrapper form {
    align-self : center;
  }
</style>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>