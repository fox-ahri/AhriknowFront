<template>
  <div
    id="role"
    class="role"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>角色列表</h2>
      <el-button @click="dialogVisible = true">添加角色</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="departments.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Describe" prop="describe"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">更新</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="manage(scope.row)">权限管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色管理" :visible.sync="dialogVisible" @close="close">
      <el-form :model="form" label-width="80px" style="margin-right: 40px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限管理" :visible.sync="dialogManage" width="800px">
      <el-transfer
        :titles="['所有权限', '角色权限']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入权限搜索"
        v-model="value"
        :data="jurisdictions"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogManage = false">取 消</el-button>
        <el-button type="primary" @click="handlerManage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'role',
  data() {
    return {
      search: '',
      departments: [],
      jurisdictions: [],
      dialogVisible: false,
      dialogManage: false,
      loading: false,
      form: {},
      value: [],
      filterMethod(query, item) {
        return item.name.indexOf(query) > -1
      },
      current: {}
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handlerManage() {
      this.loading = true
      this.axios
        .put(`${this.url}/person/department/${this.current.id}/`, {
          jurisdiction: this.value
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.dialogManage = false
            this.$store.commit('refresh', new Date().getTime())
            if (
              this.$store.state.jurisdictions.indexOf('系统管理-分组管理') < 0
            ) {
              this.$router.push('/admin')
              return
            }
            this.get_departments()
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    },
    handleEdit(data) {
      this.form = data
      this.dialogVisible = true
    },
    close() {
      this.form = {}
      this.dialogVisible = false
    },
    add() {
      if (this.form.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/person/role/${this.form.id}/`, this.form)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_departments()
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      } else {
        this.loading = true
        this.axios
          .post(`${this.url}/person/role/`, this.form)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.get_departments()
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err)
            this.loading = false
          })
      }
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该角色及其下属角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/person/role/${data.id}/`)
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_departments()
              } else {
                this.$message.error(res.data.msg)
              }
              this.loading = false
            })
            .catch(err => {
              this.$message.error(err)
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
    manage(data) {
      this.value = data.jurisdiction
      this.current = data
      this.dialogManage = true
    },
    get_departments() {
      this.loading = true
      this.axios
        .get(`${this.url}/person/role/`)
        .then(res => {
          if (res.data.code === 200) {
            this.departments = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    },
    get_jurisdictions() {
      this.loading = true
      this.axios
        .get(`${this.url}/person/jurisdiction/`)
        .then(res => {
          if (res.data.code === 200) {
            res.data.data.forEach(item => {
              this.jurisdictions.push({
                label: item.name,
                key: item.id,
                name: item.name
              })
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    }
  },
  mounted() {
    // if (this.$store.state.jurisdictions.indexOf('系统管理-分组管理') < 0) {
    //   this.axios
    //     .get(`${this.url}/person/jur/${this.$store.state.token}/`)
    //     .then(res => {
    //       if (res.data.code === 200) {
    //         if (res.data.data.indexOf('系统管理-分组管理') < 0) {
    //           this.$router.push('/admin')
    //           return
    //         }
    //       } else {
    //         console.log(res.data.msg)
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.error(err)
    //     })
    // }
    this.get_departments()
    this.get_jurisdictions()
  }
}
</script>

<style lang="scss" scoped>
#role {
  width: 100%;
  height: 100%;
  padding: 40px;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-right: 8px;
    .describe {
      font-size: 14px;
      padding-left: 20px;
      overflow: hidden;
    }
  }
  .el-transfer {
    width: 600px;
    margin: 0 auto;
  }
}
</style>
