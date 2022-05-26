// section父组件
<template>
  <div class="section">
    <div>父组件的值为:{{currentValue}}</div>
    <com-child />
    <button @click="changeA">点击改变子组件值</button>
    <div class="type"> 3.父组件通过$children 向子组件传递数据</div>
  </div>
</template>

<script>
import comChild from './child.vue'
export default {
  components: { comChild },
  data() {
    return {
      currentValue: 0
    }
  },
  methods: {
    changeA() {
      this.currentValue ++;
      this.$children[0].messageA = 'this is new value' + this.currentValue
    }
  }
}
</script>