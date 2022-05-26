// section父组件
<template>
  <div class="section">
    <com-article :articles="articleList"></com-article>
    <div class="type"> 1.父组件通过props 向子组件传递数据</div>
  </div>
</template>

<script>
import comArticle from './article.vue'
export default {
  components: { comArticle },
  data() {
    return {
      articleList:  ['红楼梦', '西游记', '三国演义']
    }
  }
}
</script>