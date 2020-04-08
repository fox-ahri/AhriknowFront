<template>
  <div
    id="index-show"
    class="index-show"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="edit">
      <mavon-editor
        v-model="content"
        :tabSize="4"
        codeStyle="atom-one-dark"
        style="height: 100%"
        @save="save_content"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'index-show',
  data() {
    return {
      content: '',
      loading: false
    }
  },
  methods: {
    save_content() {
      this.loading = true
      this.axios
        .put(`${this.url}/admin/setting/index-show/`, {
          content: this.content
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_content() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/setting/index-show/`)
        .then(res => {
          if (res.data.code === 200) {
            this.content = res.data.data.content
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    this.get_content()
  }
}
</script>

<style lang="scss" scoped>
#index-show {
  width: 100%;
  height: 100%;
  position: relative;
  .edit {
    position: absolute;
    top: 40px;
    bottom: 40px;
    left: 40px;
    right: 40px;
  }
}
</style>
