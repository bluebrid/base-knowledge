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
  props: {
    articles: {
      type: Array,
      require: false,
      default: () => ['a', 'b', 'c'], // 对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
      validator: function(value) {
        return true
      }
    }
  }
}
</script>