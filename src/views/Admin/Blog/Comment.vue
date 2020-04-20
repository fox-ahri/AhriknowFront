<template>
  <div
    id="comment"
    class="comment"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>评论管理</h2>
      <div></div>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="comments.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Content" prop="content"></el-table-column>
      <el-table-column label="Article" prop="article"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      comments: [],
      loading: false,
      search: ''
    }
  },
  methods: {
    get_comments(id) {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/comment/${id}`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.comments = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleDelete(val) {
      this.$confirm('是否删除该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/blog/comment/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_comments(this.$route.query.id)
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
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('id')) {
      this.get_comments(this.$route.query.id)
    } else {
      this.get_comments(null)
    }
  }
}
</script>

<style lang="scss" scoped>
#comment {
  width: 100%;
  height: 100%;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
