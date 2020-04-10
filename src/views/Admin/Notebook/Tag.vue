<template>
  <div
    id="tag"
    class="tag"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>标签</h2>
    </div>
    <el-divider></el-divider>
    <div class="container">
      <el-tag
        v-for="(i, n) in tags"
        :type="n%4==1?'primary':(n%4==2?'success':(n%4==3?'warning':n%4==0?'danger':'info'))"
        :key="i.id"
        closable
        :disable-transitions="false"
        @close="handleDelete(i.id)"
      >{{i.name}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="form.name"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handlerAdd"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tag',
  data() {
    return {
      tags: [],
      form: {
        name: ''
      },
      inputVisible: false,
      loading: false
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handlerAdd() {
      if (this.form.name.length < 2) {
        return
      }
      this.tags.forEach(item => {
        if (this.form.name == item.name) {
          return
        }
      })
      this.loading = true
      this.axios
        .post(`${this.url}/admin/notebook/tag/`, this.form)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.form, (name = '')
            this.get_tags()
            this.inputVisible = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/notebook/tag/${id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_tags()
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              this.$message.error(err.message)
              this.loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    get_tags() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/notebook/tag/`)
        .then(res => {
          if (res.data.code === 200) {
            this.tags = res.data.data
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
    this.get_tags()
  }
}
</script>

<style lang="scss" scoped>
#tag {
  width: 100%;
  height: 100%;
  padding: 40px;
  .container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
}
</style>
