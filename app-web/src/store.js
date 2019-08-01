import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    windows: [],
    isUserAuth: false
  },
  mutations: {
    '<SOCKET_><WINDOWS>'(state, payload) {
      console.log('Mutations event', payload);
      state.windows = payload;
    },
    fetchData(state, payload) {
      state.windows = payload;
    },
    userAuthentication(state, payload) {
      state.isUserAuth = payload;
    }
  },
  actions: {
    '<SOCKET_><WINDOWS>'(context, payload) {
      console.log('Actions event', payload);
      context.commit('SOCKET_WINDOWS', payload);
    },
    firstFetchData(context) {
      console.log('fist fetch');
      
      this.$socket.emit('connect');
      this.$socket.on('windows', data => {
        context.commit('fetchData', data);
      })
    }
  }
});

export default store;
