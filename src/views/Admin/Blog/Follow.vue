<template>
  <div
    id="blog-follow"
    class="blog-follow"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>我的关注</h2>
      <div></div>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="follows.filter(data => !search || data.nickname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      :default-sort="{prop: 'update', order: 'descending'}"
    >
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="文章数" prop="articles"></el-table-column>
      <el-table-column label="Ta 的博客" prop="articles" width="180">
        <template slot-scope="scope">
          <el-link type="primary" @click="to_blog(scope.row.id)">Ta 的博客</el-link>
        </template>
      </el-table-column>
      <el-table-column align="right" width="210">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入标题进行搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">取消关注</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'blog-follow',
  data () {
    return {
      loading: false,
      follows: [],
      search: ''
    }
  },
  methods: {
    to_blog (id) {
      const h = this.$router.resolve({
        name: 'index-blog-author',
        query: { id: id }
      })
      window.open(h.href, '_blank')
    },
    handleDelete (val) {
      this.$confirm('取消关注?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .post(`${this.url}/admin/blog/follow/`, {
              fans: false,
              who: this.$store.state.userinfo.id,
              what: val.id
            })
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message.info('取消关注')
                this.follows = this.follows.filter(follow => follow.id != val.id)
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error(err.message)
            })
        })
        .catch(() => {
        })
    },
    get_follows () {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/follow/`, {
          params: {
            id: this.$store.state.userinfo.id
          }
        })
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.follows = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted () {
    this.get_follows()
  }
}
</script>

<style lang="scss" scoped>
#blog-follow {
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
