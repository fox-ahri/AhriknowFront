<template>
  <div id="home" class="home">
    <div
      class="index-show"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-card>
        <markdown-it-vue class="md-body" :content="content" />
      </el-card>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  name: 'home',
  components: {
    MarkdownItVue
  },
  data() {
    return {
      content: '# your markdown content',
      loading: false
    }
  },
  methods: {
    get_index_show() {
      this.loading = true
      this.axios
        .get(`${this.url}/index/setting/index-show/`)
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
    this.get_index_show()
  }
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  .index-show {
    width: 1200px;
    margin: 30px auto;
    .el-card {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
