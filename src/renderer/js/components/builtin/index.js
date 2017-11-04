import Splitter from './Splitter.vue';
import TextLabel from './TextLabel.vue';

export default function BuiltinComponents(Vue) {
  Vue.component('splitter', Splitter);
  Vue.component('text-label', TextLabel);
}