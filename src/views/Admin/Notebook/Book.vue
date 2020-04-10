<template>
  <div
    id="book"
    class="book"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>我的笔记</h2>
    </div>
    <el-divider></el-divider>
    <div class="container">
      <div class="item" v-for="i in books" :key="i.id" @click="goto_edit(i)">
        <el-tooltip placement="top">
          <div slot="content">
            <p class="name" style="width:240px;font-size:18px">{{i.name}}</p>
            <hr style="margin: 10px 0" />
            <p class="describe" style="width:240px;font-size:16px">{{i.describe}}</p>
            <hr style="margin: 10px 0" />
            <p class="create_time" style="width:240px;font-size:16px">{{i.create_time}}</p>
            <hr style="margin: 10px 0" />
            <p class="user" style="width:240px;font-size:18px">{{i.nickname}}</p>
          </div>
          <el-card>
            <i class="el-icon-help edit" @click.stop="handlerEdit(i)"></i>
            <i class="el-icon-circle-close delete" @click.stop="handlerDelete(i.id)"></i>
            <!-- <img :src="i.image" alt="image" /> -->
            <el-image :src="i.image" lazy>
              <div slot="placeholder" class="image-slot">
                加载中
                <span class="dot">...</span>
              </div>
            </el-image>
            <p class="name">{{i.name}}</p>
          </el-card>
        </el-tooltip>
      </div>
      <div class="item" @click="dialogVisible = true">
        <el-card>
          <div class="new">
            <i class="el-icon-plus"></i>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog title="新建笔记" :visible.sync="dialogVisible" width="800px" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-input v-model="form.image"></el-input>
        </el-form-item>
        <el-form-item label="公开">
          <el-switch v-model="form.public"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple placeholder="请选择">
            <el-option
              v-for="i in tags"
              :key="i.id"
              :label="i.name"
              :value="i.id"
            ></el-option>
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
  name: 'book',
  data() {
    return {
      form: {
        name: '',
        describe: '',
        image: '',
        tags: [],
        public: false
      },
      dialogVisible: false,
      books: [],
      tags: [],
      loading: false
    }
  },
  methods: {
    handlerAdd() {
      if (this.form.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/admin/notebook/book/${this.form.id}/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_books()
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
          .post(`${this.url}/admin/notebook/book/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.get_books()
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
    handlerEdit(val) {
      this.form = val
      this.dialogVisible = true
    },
    handlerDelete(id) {
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/notebook/book/${id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_books()
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
      this.form = {
        name: '',
        describe: '',
        image: '',
        tags: [],
        public: false
      }
      this.dialogVisible = false
    },
    get_books() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/notebook/book/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.books = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_tags() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/notebook/tag/`)
        .then(res => {
          if (res.data.code === 200) {
            this.tags = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    goto_edit(val) {
      this.$router.push({ name: 'edit', query: { name: val.name, id: val.id } })
    }
  },
  mounted() {
    this.get_books()
    this.get_tags()
  }
}
</script>

<style lang="scss" scoped>
#book {
  width: 100%;
  height: 100%;
  padding: 40px;
  .container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .el-card {
      position: relative;
      margin: 16px;
      display: flex;
      justify-content: center;
      width: 240px;
      height: 340px;
      padding: 15px;
      cursor: pointer;
      &:hover .name {
        text-decoration: underline;
      }
      i {
        position: absolute;
        font-size: 20px;
        display: none;
        color: #888;
        &:hover {
          color: #333;
        }
      }
      &:hover i {
        display: block;
      }
      .delete {
        top: 6px;
        right: 6px;
      }
      .edit {
        top: 6px;
        right: 36px;
      }
      .el-image {
        height: 240px;
        width: 170px;
        margin: 0 20px;
      }
      .name {
        width: 210px;
        font-size: 20px;
        font-weight: 600;
        white-space: nowrap;
        text-align: center;
      }
      .new {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700px;
        color: #888;
        transition: 0.3s;
        &:hover {
          color: #333;
        }
        i {
          font-size: 42px;
          display: block;
        }
      }
    }
  }
}
</style>
