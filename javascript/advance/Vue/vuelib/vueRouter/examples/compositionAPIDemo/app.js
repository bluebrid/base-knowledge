import Vue from 'vue';
import install, {reactive, computed, watch} from 'vueFunctionApi';

Vue.config.productionTip = false;
Vue.use(install);

new Vue({
  template: `
    <div>
    <button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>
    <div v-text="state.msg"> </div>
    </div>
  `,
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
      msg: ''
    });

    function increment() {
      state.count++;
    }

    watch(() => {
      state.msg = `count is ${state.count}`;
    });
    
    return {
      state,
      increment
    };
  }
}).$mount('#app');
