'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/loginPage/app.vue';
import sign_in from './components/loginPage/sign_in.vue';
import sign_up from './components/loginPage/sign_up.vue';

/* eslint-disable no-new */
new Vue({
  el        : 'body',
  //replace   : false,
  components: {App}
});

// install router
//Vue.use(VueRouter);
//
//var router = new VueRouter();
//
//router.map({
//  '/sign_in': {
//    component: sign_in
//  },
//  '/sign_up': {
//    component: sign_up
//  }
//});
//
//router.start(app, 'body');
