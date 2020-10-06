import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/'
import cloneDeep from 'lodash.clonedeep';
import i18n from '@/i18n'

Vue.config.productionTip = false;

Vue.prototype.$cloneDeep = cloneDeep;
Vue.prototype.$apiURL = 'https://gateway.marvel.com';
Vue.prototype.$apiPublicKey = '510d2c037b916956d5391d18a3c5001f';
Vue.prototype.$apiLimit = 48;

Vue.filter('firstName',(fullName) => {
  return fullName.split("(")[0];
})

Vue.filter('secondName',(fullName)=>{
  return fullName.split("(")[1] ? fullName.split("(")[1].slice(0,fullName.split("(")[1].length-1) : '';
})

new Vue({
  vuetify,
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
