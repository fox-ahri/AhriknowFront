<template>
  <div
    id="url"
    class="url"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>URL</h2>
      <el-button @click="dialogVisible = true">新 建</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="urls.filter(data => !search || data.path.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="Url" prop="path"></el-table-column>
      <el-table-column label="Method" prop="method"></el-table-column>
      <el-table-column label="Describe" prop="describe"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button size="mini" type="success" @click="handleManage(scope.row)">Manage</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建项目" :visible.sync="dialogVisible" width="800px" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="Method">
          <el-select v-model="form.method" placeholder="请选择请求类型">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="PATCH" value="PATCH"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描 述">
          <el-input type="textarea" show-word-limit maxlength="200" v-model="form.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'url',
  data() {
    return {
      urls: [],
      search: '',
      loading: false,
      dialogVisible: false,
      form: {},
      project: ''
    }
  },
  methods: {
    close() {
      this.form = {}
      this.dialogVisible = false
    },
    handleManage(val) {
      this.$router.push({ name: 'restapi-opera', query: { id: val.url_id } })
    },
    handlerAdd() {
      this.form.project = this.project
      this.loading = true
      this.axios
        .post(`${this.url}/admin/restapi/url/`, this.form)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.get_urls()
            this.dialogVisible = false
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
      this.$confirm('此操作将永久删除该 url, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/restapi/url/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_urls()
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
    get_urls() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/restapi/url/${this.project}/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.urls = res.data.data
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
    this.project = this.$route.query.id
    this.get_urls()
  }
}
</script>

<style lang="scss" scoped>
#url {
  width: 100%;
  height: 100%;
  padding: 40px;
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
