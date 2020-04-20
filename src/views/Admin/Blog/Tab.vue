<template>
  <div
    id="blog-tab"
    class="blog-tab"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>专栏管理</h2>
      <el-button @click="dialogVisible = true">专栏管理</el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="tabs" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Index" prop="index"></el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="专栏管理" :visible.sync="dialogVisible" width="50%" :before-close="close">
      <el-form :model="form" :label-width="'100px'">
        <el-form-item label="专栏名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专栏顺序">
          <el-input v-model="form.index" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'blog-tab',
  data() {
    return {
      loading: false,
      dialogVisible: false,
      tabs: [],
      form: {}
    }
  },
  methods: {
    handleAdd() {
      if (this.form.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/admin/blog/tab/${this.form.id}/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_tabs()
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        this.loading = true
        this.axios
          .post(`${this.url}/admin/blog/tab/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.get_tabs()
              this.dialogVisible = false
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
    handleEdit(val) {
      this.form = val
      this.dialogVisible = true
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该专栏及其下属文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/blog/tab/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.tabs = this.tabs.filter(tab => tab.id != val.id)
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
    close() {
      this.form = {}
      this.dialogVisible = false
    },
    get_tabs() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/tab/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.tabs = res.data.data
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
    this.get_tabs()
  }
}
</script>

<style lang="scss" scoped>
#blog-tab {
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
