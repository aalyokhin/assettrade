import Vue from 'vue';
import WordsCloud from './components/WordsCloud.vue';

Vue.config.productionTip = false;

const WordsCloudInstance = Vue.extend(WordsCloud);

new WordsCloudInstance().$mount('#words-cloud');
