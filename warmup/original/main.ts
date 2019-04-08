import Vue          from 'nativescript-vue';
import App          from './components/Profile.vue';

import RadDataFormPlugin from 'nativescript-ui-dataform/vue';

Vue.use(RadDataFormPlugin);

// Vue.registerElement(
//     'RadSideDrawer',
//     () => require('nativescript-ui-sidedrawer').RadSideDrawer
// )

// import VueDevtools  from 'nativescript-vue-devtools';
//
// if(TNS_ENV !== 'production') {
//   Vue.use( VueDevtools, { host: '192.168.178.28' } );
// }

// import router     from './router/routes';
//
// Vue.prototype.$router = router;
//
// Vue.prototype.$goto = function (to, options) {
//   var options = options || {
//     clearHistory: false,
//     backstackVisible: true,
//     transition: {
//       name: "slide",
//       duration: 380,
//       curve: "easeIn"
//     }
//   }
//   this.$navigateTo(this.$router[to], options)
// }

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

new Vue({
//  render: h => h('frame', [h(router['home'])])
  render: h => h('frame', [h(App)])
}).$start();
