<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$t('login.thirdparty')
      console.log('===================')
      // this.$confirm('message', 'title', {})
      this.$notify({
        message: `alert(1)`,
        type: 'success',
        dangerouslyUseHTMLString: false,
        duration: 0,
        onClose: () => {
          // this.$message({
          //   message: 'Switch Language1111 Success',
          //   type: 'success'
          // })
        }
      })
    }
  }
}
</script>
