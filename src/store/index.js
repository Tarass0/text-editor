import Vue from 'vue';
import Vuex from 'vuex';
import textBlocks from './modules/textBlocks';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    textBlocks,
  },
});
