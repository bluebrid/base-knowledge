<template>
  <div class="section">
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
    <div class="type">6.eventBus</div>
  </div>
</template>

<script>
import showNumCom from './showNum.vue'
import additionNumCom from './addtionNum.vue'
export default {
  components: { showNumCom, additionNumCom }
}
</script>
 