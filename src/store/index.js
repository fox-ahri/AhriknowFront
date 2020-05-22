import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    refresh: "",
    token: localStorage.getItem("token"),
    jurisdictions: [],
    axiosPromiseCancel: [],
    userinfo: JSON.parse(localStorage.getItem("userinfo")) || { id: "" },
    time: localStorage.getItem("time"),
  },
  mutations: {
    refresh(state, time) {
      state.refresh = time;
    },
    token(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    jurisdictions(state, jurisdictions) {
      state.jurisdictions = jurisdictions;
    },
    userinfo(state, u) {
      localStorage.setItem("userinfo", JSON.stringify(u));
      state.userinfo = u;
    },
    time(state, time) {
      localStorage.setItem("time", time);
      state.time = time;
    },
  },
  actions: {},
  modules: {},
});
