<template>
  <div
    id="db"
    class="db"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>数据库</h2>
      <el-button @click="dialogVisible = true">新 建</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="dbs.filter(data => !search || data.dbname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="Type">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type == 'mysql'?'primary':'success'">{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="DB name" prop="dbname"></el-table-column>
      <el-table-column label="Username" prop="username"></el-table-column>
      <el-table-column label="Password">
        <template slot-scope="scope">{{scope.row.password}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建数据库" :visible.sync="dialogVisible" width="800px" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择数据库类型">
            <el-option label="Mysql" value="mysql"></el-option>
            <el-option label="Mongo" value="mongo"></el-option>
          </el-select>
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
  name: 'db',
  data() {
    return {
      dbs: [],
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
    handlerAdd() {
      this.loading = true
      this.axios
        .post(`${this.url}/admin/database/db/`, this.form)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.get_dbs()
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
      this.$confirm('此操作将永久删除该数据库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/database/db/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_dbs()
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
    get_dbs() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/database/db/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.dbs = res.data.data
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
    this.get_dbs()
  }
}
</script>

<style lang="scss" scoped>
#db {
  width: 100%;
  height: 100%;
  padding: 40px;
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
