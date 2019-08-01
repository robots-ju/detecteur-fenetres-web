import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';

let socket = io('http://192.169.138:8081');

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://192.168.1.138:8081', //IP robots-ju wifi 192.168.2.98
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }),
  socket
);

Vue.prototype.$http = axios;

axios.defaults.baseURL = 'http://192.168.1.138:8080/api'; ///IP robots-ju wifi 192.168.2.98

Vue.config.productionTip = false;

new Vue({
  store,
  router: router,
  render: h => h(App)
}).$mount('#app');
