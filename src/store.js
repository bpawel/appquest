import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex)
const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT'

};
const roleRedirectMap = {
  admin: '/adminDashboard',
  instructor: '/instructorDashboard',
  student: '/studentDashboard',
};

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    // logged: localStorage.getItem('token')
  },
  getters: {
    isLogged: state => state.logged,
  token: state => state.token,
  },
  mutations: {
    [types.LOGIN] (state, payload) {
        state.logged = 1;
        state.user = payload.user;

        state.token = payload.token;
    },

    [types.LOGOUT] (state) {
        state.logged = 0;
        state.user = null;
        state.token = null;
    },

    registerSuccess(state) {
      state.status = {};
    },
},
  actions: {
    login ({commit, state}, credential) {
        Vue.http.post(`${process.env.VUE_APP_HOST}/auth/login`, credential)
            .then((response) =>  response.json())
            .then((result) => {
                commit(types.LOGIN, {
                  user: result.user,
                  token: result.token,
                });
                
                if(roleRedirectMap[result.user.role]) {
                  router.push({path: roleRedirectMap[result.user.role]});
                }
            });
            
    },

    register ({ commit }, credential) {
      Vue.http.post(`${process.env.VUE_APP_HOST}/auth/register`, credential)
          .then((response) =>  response.json())
          .then((result) => {
              localStorage.setItem('token', JSON.stringify(result.token));
              commit('registerSuccess');
          });
          
    },
    
    logout({commit}) {
      localStorage.removeItem('token');
      commit(types.LOGOUT);
      router.push({path: '/'});
    }
}
});

export default store