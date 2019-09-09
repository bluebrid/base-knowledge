// section父组件
<template>
  <div class="section">
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <div> Active Index {{currentIndex}}.</div>
    <div class="type"> 2.子组件通过$emit向父组件传递数据</div>
  </div>
</template>

<script>
import comArticle from './article.vue'
export default {
  components: { comArticle },
  data() {
    return {
      articleList: ['红楼梦', '西游记', '三国演义'],
      currentIndex: 0
    }
  },
  methods: {
    onEmitIndex(index) {
      this.currentIndex = index;
    }
  }
}
</script>