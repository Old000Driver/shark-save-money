import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugin from "./plugin";
import Layout from "@/components/Layout.vue";

Vue.component('Layout', Layout);
Vue.use(plugin, {imports: []})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
