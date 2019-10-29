<template>
  <div class="section">
    <child-com1 :name="name" :age="age" :gender="gender" :height="height" title="程序员成长指北"></child-com1>
    <div class="des"> 
      <p>1.$attrs</p>
      <p> 场景:如果父传子有很多值,那么在子组件需要定义多个 props</p>     
      <p>解决:$attrs获取子传父中未在 props 定义的值</p>
    </div>
    <div class="type">9.$attr(inheritAttrs)</div>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      name: "zhang",
      age: "18",
      gender: "女",
      height: "158"
    };
  }
};
</script>
 