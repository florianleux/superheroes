import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/'
import cloneDeep from 'lodash.clonedeep';
import i18n from '@/i18n'

Vue.config.productionTip = false;

Vue.prototype.$cloneDeep = cloneDeep;

new Vue({
  vuetify,
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
