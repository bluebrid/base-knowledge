<template class="border">
  <div>
    <p>name: {{ name}}</p>
    <p>childCom1的$attrs: {{ $attrs }} (在props定义的prop 是不会出现在this.$attrs中的)</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: true, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  /**
   * 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。
   * 当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。
   * 通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。
   * 而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。
   */
  props: {
    name: String // name作为props属性绑定
  },
  created() {
    console.log(this.$attrs);
    // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
  }
};
</script>
