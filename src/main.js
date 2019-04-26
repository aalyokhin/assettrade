import Vue from 'vue';
import WordsCloud from './components/WordsCloud.vue';

Vue.config.productionTip = false;

new Vue({
  el: '#vue-app',
  components: {
    WordsCloud,
  },
});
