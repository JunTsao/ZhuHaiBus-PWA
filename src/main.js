import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
// import "vuetify/dist/vuetify.min.css"
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/src/stylus/main.styl';
import RequestMudule from './script/RequestMudule';
// import "./style/main.styl";

Vue.use(Vuetify);
Vue.config.productionTip = false;
// Vue.config.silent = true;
// Vue.config.devtools = true;
Vue.prototype.$http = RequestMudule;
new Vue({
  el: '#app',
  template: '<App></App>',
  components: {
    App,
  },
});
// AliCDN https://g.alicdn.com/kg/workbox/3.6.3/workbox-sw.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {})
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(({ usage, quota }) => {
    console.log(`Using ${usage} out of ${quota} bytes.`);
  });
}
