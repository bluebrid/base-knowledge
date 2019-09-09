// 子组件 article.vue
<template>
  <div>
      <ul>
          <li v-for="(item, index) in articles" :key="index">{{item}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ['articles']
}
</script>