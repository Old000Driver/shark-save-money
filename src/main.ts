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

if (document.documentElement.clientWidth > 500) {
  window.alert('建议使用手机打开页面以保证浏览效果');
  // 页面二维码
  const img = document.createElement('img');
  img.src = './qrcode.png';
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%,-50%)';
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
  document.body.appendChild(img);
}