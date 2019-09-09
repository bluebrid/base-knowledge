// section父组件
<template>
  <div class="section">
    <div>父组件的值为:{{currentValue}}</div>
    <com-child />
    <div class="type">4.provide / inject</div>
  </div>
</template>

<script>
import comChild from "./child.vue";
export default {
  components: { comChild },
  data() {
    return {
      currentValue: 0
    };
  },
  provide: {
    for: "demo value for provide and inject."
  }
};
</script>