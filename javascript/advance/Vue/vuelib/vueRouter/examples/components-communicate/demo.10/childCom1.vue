<template class="border">
  <div>
     <button @click="onClick">点击执行父组件change 方法</button>
  </div>
</template>
<script>
export default {
  methods: {
    onClick: function() {
      this.$listeners.change()
    }
  }
 
};
</script>
