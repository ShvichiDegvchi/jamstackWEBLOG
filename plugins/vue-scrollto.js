import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

/**
 * @param {*} context
 * @param {*} inject
 */
export default function vueScrollTo(context, inject) {
  inject('scrollTo', VueScrollTo.scrollTo);
}
