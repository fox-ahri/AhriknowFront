<template>
  <div
    id="project"
    class="project"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>项目</h2>
      <el-button @click="dialogVisible = true">新 建</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="projects.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="项目名" prop="name"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="Api Auth" prop="auth"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入项目名搜索" />
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button size="mini" type="success" @click="handleManage(scope.row)">管理</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建项目" :visible.sync="dialogVisible" width="800px" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名">
          <el-input v-model="form.name"></el-input>
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
  name: 'project',
  data() {
    return {
      projects: [],
      search: '',
      loading: false,
      dialogVisible: false,
      form: {}
    }
  },
  methods: {
    close() {
      this.form = {}
      this.dialogVisible = false
    },
    handleManage(val) {
      this.$router.push({ name: 'restapi-url', query: { id: val.id } })
    },
    handlerAdd() {
      this.loading = true
      this.axios
        .post(`${this.url}/admin/restapi/project/`, this.form)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.get_projects()
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
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/restapi/project/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_projects()
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
    get_projects() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/restapi/project/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.projects = res.data.data
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
    this.get_projects()
  }
}
</script>

<style lang="scss" scoped>
#project {
  width: 100%;
  height: 100%;
  padding: 40px;
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
