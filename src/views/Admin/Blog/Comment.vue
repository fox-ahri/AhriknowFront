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
      <div class="opera">
        <el-input
          v-model="article_name"
          placeholder="%文章标题%"
          v-show="!$route.query.hasOwnProperty('id')"
        ></el-input>
        <el-date-picker
          v-show="!$route.query.hasOwnProperty('id')"
          v-model="article_date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button @click="find" v-show="!$route.query.hasOwnProperty('id')">查询</el-button>
        <el-button @click="$router.go(-1)" v-show="$route.query.hasOwnProperty('id')">返回文章列表</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="comments.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="评论时间" prop="date" width="160"></el-table-column>
      <el-table-column prop="content">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入评论内容搜索" />
        </template>
        <template slot-scope="scope">{{scope.row.content}}</template>
      </el-table-column>
      <el-table-column label="文章标题" prop="article"></el-table-column>
      <el-table-column label="删除" align="center" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      currentPage: 1,
      size: 10,
      count: 0,
      comments: [],
      loading: false,
      search: '',
      article_name: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      article_date: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.get_comments(null)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.get_comments(null)
    },
    find() {
      this.currentPage = 1
      this.get_comments(null)
    },
    get_comments(id) {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/comment/`, {
          params: {
            id: id,
            article: this.article_name,
            from: this.article_date[0],
            to: this.article_date[1],
            page: this.currentPage,
            size: this.size
          }
        })
        .then(res => {
          this.loading = false
          this.comments = res.data.results
          this.count = res.data.count
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
    .opera {
      display: flex;
      width: 700px;
      justify-content: flex-end;
      .el-input {
        width: 200px;
        margin-right: 10px;
      }
      .el-button {
        margin-left: 10px;
      }
    }
  }
  .pagination {
    text-align: right;
    padding-top: 10px;
  }
}
</style>
