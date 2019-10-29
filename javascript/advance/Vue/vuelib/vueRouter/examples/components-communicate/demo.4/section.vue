// section父组件
<template>
  <div class="section">
    <div>父组件的值为:{{currentValue}}</div>
    <com-child />
    <div class="des"> 
      <p>2.2.0 新增</p>
      <p>场景:provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中;</p>     
      <p>解决:以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。</p>
    </div>
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