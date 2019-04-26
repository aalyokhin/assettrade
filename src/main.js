import Vue from 'vue';
import WordsCloud from './components/WordsCloud.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(WordsCloud),
}).$mount('#words-cloud');
