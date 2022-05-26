<template>
  <div class="com_a">
    <span>Child C: {{messageA}}</span>
    <com-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageA: this.for
    }
  },
  inject: ['for'],
}
</script>
 