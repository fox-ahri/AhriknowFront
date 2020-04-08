<template>
  <div
    id="edit"
    class="edit"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-container>
      <el-aside width="320px">
        <div class="back">
          <el-button type="text" size="mini" @click="$router.go(-1)">
            <i class="el-icon-back"></i>
          </el-button>
        </div>
        <div class="title">
          <p class="name" :title="$route.query.name">{{$route.query.name}}</p>
        </div>
        <div class="catalog">
          <el-tree
            :data="catalogs"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="open_edit"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.data.name }}</span>
              <span>
                <el-button type="text" size="mini" @click.stop="() => edit(data)">
                  <i class="el-icon-s-help"></i>
                </el-button>
                <el-button type="text" size="mini" @click.stop="() => append(data)">
                  <i class="el-icon-circle-plus"></i>
                </el-button>
                <el-button type="text" size="mini" @click.stop="() => remove(data.id)">
                  <i class="el-icon-remove"></i>
                </el-button>
              </span>
            </span>
          </el-tree>
          <el-button style="width:290px;margin:15px;" size="small" @click="dialogVisible = true">添加</el-button>
        </div>
      </el-aside>
      <el-main>
        <div class="opera">
          <div v-show="current.name" class="name">{{current.name}}</div>
          <div></div>
          <div>
            <!-- <el-button @click="download" size="small">下载</el-button> -->
            <el-button type="primary" @click="save_content" size="small">保存</el-button>
          </div>
        </div>
        <div class="edit">
          <mavon-editor
            v-model="content.content"
            :tabSize="4"
            codeStyle="atom-one-dark"
            style="height: 100%"
            @save="save_content"
          />
        </div>
      </el-main>
    </el-container>
    <el-dialog title="新建笔记" :visible.sync="dialogVisible" width="800px" @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级目录">
          <el-input v-model="form.p_name" disabled></el-input>
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
  name: 'edit',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        parent: null,
        p_name: '顶级目录'
      },
      catalogs: [],
      loading: false,
      content: {},
      current: {}
    }
  },
  methods: {
    handlerAdd() {
      if (this.form.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/admin/notebook/catalog/${this.form.id}/`, this.form)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_catalogs()
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        this.loading = true
        this.axios
          .post(
            `${this.url}/admin/notebook/catalog/${this.$route.query.id}/`,
            this.form
          )
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.get_catalogs()
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    edit(val) {
      this.form = val
      this.dialogVisible = true
    },
    append(val) {
      this.form = {
        name: '',
        parent: val.id,
        p_name: val.name
      }
      this.dialogVisible = true
    },
    remove(id) {
      this.$confirm('此操作将永久删除该目录及其下级目录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/notebook/catalog/${id}/`)
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_catalogs()
              } else {
                this.$message.error(res.data.msg)
              }
              this.loading = false
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
        parent: null,
        p_name: '顶级目录'
      }
      this.dialogVisible = false
    },
    getJsonTree(data, parentId) {
      var itemArr = []
      for (var i = 0; i < data.length; i++) {
        var node = data[i]
        if (node.parent == parentId) {
          var newNode = {}
          newNode.id = node.id
          newNode.name = node.name
          newNode.p_name = node.p_name
          newNode.children = this.getJsonTree(data, node.id)
          itemArr.push(newNode)
        }
      }
      return itemArr
    },
    get_catalogs() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/notebook/catalog/${this.$route.query.id}/`)
        .then(res => {
          if (res.data.code === 200) {
            this.catalogs = this.getJsonTree(res.data.data, null)
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
    open_edit(val) {
      this.current = val
      this.loading = true
      this.axios
        .get(`${this.url}/admin/notebook/content/${val.id}/`)
        .then(res => {
          if (res.data.code === 200) {
            this.content = res.data.data
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
    save_content() {
      if (!this.current.hasOwnProperty('id')) {
        return
      }
      this.loading = true
      this.axios
        .put(`${this.url}/admin/notebook/content/${this.content.id}/`, this.content)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    if (this.$store.state.jurisdictions.indexOf('狸知云笔记') < 0) {
      this.axios
        .get(`${this.url}/admin/person/jur/`)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data.indexOf('狸知云笔记') < 0) {
              this.$router.push('/admin')
              return
            }
            this.$store.commit('jurisdictions', res.data.data)
          } else {
            console.log(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
    this.get_catalogs()
  }
}
</script>

<style lang="scss" scoped>
#edit {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    box-shadow: 8px 0 10px #eee;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .back {
      padding: 5px 20px;
      box-shadow: 0 6px 10px #eee;
      .el-button {
        font-size: 40px;
      }
    }
    .title {
      height: 120px;
      line-height: 120px;
      text-align: center;
      box-shadow: 0 6px 10px #eee;
      margin-bottom: 20px;
      .name {
        font-size: 30px;
        font-weight: 600;
        cursor: pointer;
      }
    }
    .catalog {
      flex: 1;
      overflow: auto;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        padding-right: 8px;
        i {
          font-size: 20px;
        }
      }
    }
  }

  .el-main {
    height: 100%;
    position: relative;
    .opera {
      position: absolute;
      height: 70px;
      top: 0;
      left: 15px;
      right: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 6px 10px #eee;
      }
    }
    .edit {
      position: absolute;
      top: 70px;
      left: 15px;
      right: 15px;
      bottom: 20px;
    }
  }
}
</style>
