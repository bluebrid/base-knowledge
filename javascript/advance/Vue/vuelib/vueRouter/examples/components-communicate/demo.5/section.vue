<template>
  <div class="section">
    <com-child ref="comA"></com-child>
    <div class="type">5.ref / refs</div>
  </div>
</template>
<script>
import comChild from "./child.vue";
export default {
  components: { comChild },
  mounted() {
    const comA = this.$refs.comA;
    console.log(comA.name); // Vue.js
    comA.sayHello(); // hello
  }
};
</script>
 