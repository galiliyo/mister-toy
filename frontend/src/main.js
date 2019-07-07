import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
