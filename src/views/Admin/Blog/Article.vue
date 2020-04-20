<template>
  <div
    id="blog-article"
    class="blog-article"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>文章管理</h2>
      <div>
        <el-select v-model="category" placeholder="请选择分类">
          <el-option label="全部分类" value="0"></el-option>
          <el-option v-for="i in categories" :key="i.id" :label="i.name" :value="i.id"></el-option>
        </el-select>
        <el-button @click="find">查询</el-button>
      </div>
      <el-button
        @click="$router.push({name: 'blog-edit'})"
        :disabled="$store.state.jurisdictions.indexOf('新建文章') < 0"
      >添加文章</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="articles.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
      :default-sort="{prop: 'update', order: 'descending'}"
    >
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="图片" prop="image">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="hover">
            <div slot="reference">{{scope.row.image}}</div>
            <el-image :src="scope.row.image" fit="cover"></el-image>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="update" width="160" sortable></el-table-column>
      <el-table-column label="草稿" prop="draft" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.draft"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="收回为草稿"
            inactive-text="发布"
            @change="change(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="right" width="210">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入标题进行搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleComment(scope.row)">评论</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-article',
  data() {
    return {
      loading: false,
      articles: [],
      search: '',
      categories: [],
      category: '0',
      currentPage: 1,
      count: 0,
      size: 10
    }
  },
  methods: {
    change(val) {
      this.axios
        .put(`${this.url}/admin/blog/article/${val.id}/`, {
          draft: val.draft
        })
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleComment(val) {
      this.$router.push({ name: 'blog-comment', query: { id: val.id } })
    },
    handleSizeChange(val) {
      this.size = val
      this.get_articles()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.get_articles()
    },
    find() {
      this.get_articles()
    },
    handleImageSuccess(res) {
      if (res.code === 200) {
        this.image = res.data
      } else {
        this.$message.error('上传失败')
      }
    },
    handleEdit(val) {
      this.$router.push({
        name: 'blog-edit',
        query: { id: val.id }
      })
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/blog/article/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.articles = this.articles.filter(
                  article => article.id != val.id
                )
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
    get_articles() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/article/`, {
          params: {
            category: this.category,
            size: this.size,
            page: this.currentPage
          }
        })
        .then(res => {
          this.loading = false
          this.count = res.data.count
          this.articles = res.data.results
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_categories() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/category/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.categories = res.data.data
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
  mounted() {
    this.get_categories()
    this.get_articles()
  }
}
</script>

<style lang="scss" scoped>
#blog-article {
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
  .pagination {
    text-align: right;
    padding-top: 10px;
  }
}
</style>
