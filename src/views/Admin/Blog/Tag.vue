<template>
  <div
    id="blog-tag"
    class="blog-tag"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>标签管理</h2>
      <el-button @click="dialogVisible = true">添加标签</el-button>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="tags.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border
    >
      <el-table-column label="标签名" prop="name"></el-table-column>
      <el-table-column label="创建时间" prop="date"></el-table-column>
      <el-table-column label="排序" prop="weight"></el-table-column>
      <el-table-column align="right" width="210">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入标签名搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleManage(scope.row)">管理</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加标签" :visible.sync="dialogVisible" width="50%" :before-close="close">
      <el-input placeholder="请输入标签名" v-model="new_tag.name">
        <template slot="prepend">标签名</template>
      </el-input>
      <div style="height: 10px"></div>
      <el-input placeholder="请输入权重" v-model="new_tag.weight">
        <template slot="prepend">权 重</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="管理标签" :visible.sync="dialogManage" width="70%" :before-close="close">
      <el-tag
        v-for="(i, n) in children"
        :type="n%4==1?'primary':(n%4==2?'success':(n%4==3?'warning':n%4==0?'danger':'info'))"
        :key="i.id"
        closable
        :disable-transitions="false"
        @close="handleDelete(i)"
      >{{i.name}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="new_tag.name"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleAdd"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogManage = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'blog-tag',
  data() {
    return {
      search: '',
      loading: false,
      dialogVisible: false,
      dialogManage: false,
      inputVisible: false,
      tags: [],
      new_tag: {
        name: '',
        weight: 1
      },
      current: {},
      children: []
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleAdd() {
      if (this.new_tag.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/admin/blog/tag/${this.new_tag.id}/`, this.new_tag)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_tags()
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
        if (this.dialogManage) this.new_tag.parent = this.current.id
        this.loading = true
        this.axios
          .post(`${this.url}/admin/blog/tag/`, this.new_tag)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              if (this.dialogManage) this.children.push(res.data.data)
              else this.tags.push(res.data.data)
              this.new_tag = {
                name: '',
                weight: 1
              }
              this.inputVisible = false
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
      this.new_tag = val
      this.dialogVisible = true
    },
    handleManage(val) {
      this.current = val
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/tag/${val.id}/`)
        .then(res => {
          if (res.data.code === 200) {
            this.children = res.data.data
            this.dialogManage = true
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
    handleDelete(val) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/blog/tag/${val.id}/`)
            .then(res => {
              this.loading = false
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                if (this.dialogManage) {
                  this.children = this.children.filter(tag => tag.id != val.id)
                } else this.tags = this.tags.filter(tag => tag.id != val.id)
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
      this.new_tag = {
        name: '',
        weight: 1
      }
      this.dialogVisible = false
      this.dialogManage = false
    },
    get_tags() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/tag/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.tags = res.data.data
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
    this.get_tags()
  }
}
</script>

<style lang="scss" scoped>
#blog-tag {
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
  .el-tag {
    margin: 10px;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
</style>
