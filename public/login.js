'use strict';
/**
 * 登录页面的入口文件
 * @author Knight Young
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

//components
import app from './components/loginPage/app.vue';
import sign_in from './components/loginPage/sign_in.vue';
import register from './components/loginPage/register.vue';

//let App=Vue.extend(app);

 //install router
Vue.use(VueRouter);

let router = new VueRouter({
  transitionOnLoad:false
});

router.beforeEach(function(){
  window.scrollTo(0,0)
});

router.map({
  '/sign_in': {
    component: sign_in
  },
  '/register': {
    component: register
  }
});

 //default router
router.redirect({
  '*': '/sign_in'
});

router.start(app, 'app');
