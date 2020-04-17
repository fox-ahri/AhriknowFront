<template>
  <div
    id="blog-category"
    class="blog-category"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>分类管理</h2>
      <el-button @click="dialogVisible = true">分类管理</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="categories.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Describe" prop="describe"></el-table-column>
      <el-table-column label="Image" prop="image">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="200" trigger="hover">
            <div slot="reference">{{scope.row.image}}</div>
            <el-image :src="scope.row.image" fit="cover"></el-image>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分类管理" :visible.sync="dialogVisible" width="50%" :before-close="close">
      <el-form :model="form" :label-width="'100px'">
        <el-form-item label="分类名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input v-model="form.describe" type="textarea" row="4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :headers="{token: token}"
          >
            <img v-if="image" :src="image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  name: 'blog-category',
  data() {
    return {
      action: `${this.url}/admin/blog/upload/`,
      loading: false,
      dialogVisible: false,
      categories: [],
      search: '',
      form: {},
      token: localStorage.getItem('token'),
      image: ''
    }
  },
  methods: {
    handleImageSuccess(res) {
      if (res.code === 200) {
        this.image = res.data
      } else {
        this.$message.error('上传失败')
      }
    },
    handleAdd() {
      this.form.image = this.image
      if (this.form.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/admin/blog/category/${this.form.id}/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_categories()
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
          .post(`${this.url}/admin/blog/category/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.get_categories()
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
      this.image = val.image
      this.dialogVisible = true
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该分类及其下属文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/blog/category/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.categories = this.categories.filter(
                  category => category.id != val.id
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
    close() {
      this.form = {}
      this.dialogVisible = false
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
  }
}
</script>

<style lang="scss" scoped>
#blog-category {
  width: 100%;
  height: 100%;
  padding: 40px;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: dashed 2px #ccc;
  }
  .avatar {
    max-width: 478px;
    max-height: 378px;
    display: block;
  }
}
</style>
