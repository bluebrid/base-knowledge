<template>
  <div class="section">
    <child-com1 @change="change"></child-com1>
    {{value}}
    <div class="des"> 
      <p>2.$listeners</p>
      <p>场景:子组件需要调用父组件的方法</p>     
      <p>解决:父组件的方法可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用</p>
    </div>
    <div class="type">10.$listeners</div>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      value: 'defualt text'
    };
  },
  methods: {
    change: function() {
      this.value = '触发父组件的change 事件'
    }
  }
};
</script>
 