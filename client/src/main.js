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

Vue.prototype.$http = axios

Vue.use(Vue2Filters)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
