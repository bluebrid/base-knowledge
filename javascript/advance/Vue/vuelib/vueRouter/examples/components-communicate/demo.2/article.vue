// 子组件 article.vue
<template>
  <div>
      <ul>
          <li v-for="(item, index) in articles" :key="index" @click="click(index)">{{item}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ['articles'],
  methods: {
    click(index) {
      this.$emit('onEmitIndex', index)
    }
  }
}
</script>