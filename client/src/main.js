// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vue2Filters from 'vue2-filters'

Vue.config.productionTip = false

// set axios global config
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/charset=UTF-8'

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
Vue.prototype.$http = axios
Vue.prototype.$baseURI = process.env.NODE_ENV == "production" ? "http://13.125.169.219:3000" : "http://127.0.0.1:3000";
console.log('Vue.prototype.$baseURI: ', Vue.prototype.$baseURI)
Vue.prototype.$exchangeURI = "https://openexchangerates.org/api/"
Vue.prototype.$appId = "de0ac08850bb4c2a8eb573c120c5b74f"

Vue.use(Vue2Filters)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
