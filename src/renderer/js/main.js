import Vue from 'vue'
import { MPC } from 'mpc-js';

import App from './App.vue'
import Builtin from './components/builtin';

Vue.use(Builtin);
Vue.use((Vue, options) => {
  const mpc = new MPC();
  Vue.prototype.$mpc = mpc;
});

new Vue({
  el: '#app',
  render: h => h(App)
})