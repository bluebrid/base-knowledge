<template>
  <div class="com_a">
    <span>Child B: {{name}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    }
  }
}
 
</script>
 