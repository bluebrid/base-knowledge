<template>
  <div class="com_a">
    <span>Child B: {{messageA}}</span>
    <com-child />
  </div>
</template>

<script>
import comChild from './c.vue'
export default {
   components: { comChild },
  data() {
    return {
      messageA: this.for
    }
  },
  inject: ['for'],
}
</script>
 