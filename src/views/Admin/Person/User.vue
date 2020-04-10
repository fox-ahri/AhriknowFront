<template>
  <div
    id="user"
    class="user"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>用户列表</h2>
      <el-button @click="dialogVisible = true">添 加</el-button>
    </div>
    <el-divider></el-divider>
    <el-table :data="users" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.userinfo.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.userinfo.sex }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.userinfo.age }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.userinfo.birthday }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="Username" prop="username"></el-table-column>
      <el-table-column label="Nickname" prop="nickname"></el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column label="Phone" prop="phone"></el-table-column>
      <el-table-column label="Last Login" prop="last_login"></el-table-column>
      <el-table-column label="Join Date" prop="create_time"></el-table-column>
      <el-table-column label="Activated" width="86" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.activated"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="change(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="Opera" width="240">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">更新</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="manage(scope.row)">权限管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户管理" :visible.sync="dialogVisible" @close="close">
      <div class="form">
        <el-form :model="form" label-width="80px" style="margin-right: 40px">
          <el-divider content-position="left">基本信息</el-divider>
          <el-form-item label="用户名">
            <el-input v-model="form.username" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="form.department" placeholder="请选择所属部门">
              <el-option label="空" :value="null"></el-option>
              <el-option v-for="i in departments" :key="i.id" :label="i.name" :value="i.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option label="空" :value="null"></el-option>
              <el-option v-for="i in roles" :key="i.id" :label="i.name" :value="i.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-divider content-position="left">详细信息</el-divider>
          <el-form-item label="姓名">
            <el-input v-model="form.userinfo.name" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.userinfo.age" autocomplete="off" @keyup.enter.native="add"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.userinfo.sex">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="form.userinfo.birthday" type="date" placeholder="选择生日"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限管理" :visible.sync="dialogManage" width="800px">
      <el-tree
        :data="jurisdictions"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="{
            children: 'children',
            label: 'name'
          }"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogManage = false">取 消</el-button>
        <el-button type="primary" @click="handlerManage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      loading: false,
      users: [],
      dialogVisible: false,
      dialogManage: false,
      form: {
        userinfo: {},
        department: ''
      },
      departments: [],
      roles: [],
      jurisdictions: [],
      current: {}
    }
  },
  methods: {
    toJsonTree(data, parentId) {
      var itemArr = []
      for (var i = 0; i < data.length; i++) {
        var node = data[i]
        if (node.parent == parentId) {
          var newNode = {}
          newNode.id = node.id
          newNode.name = node.name
          newNode.describe = node.describe
          newNode.identity = node.identity
          newNode.p_name = node.p_name
          newNode.children = this.toJsonTree(data, node.id)
          itemArr.push(newNode)
        }
      }
      return itemArr
    },
    manage(data) {
      this.current = data
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(data.jurisdictions)
      }, 10)
      this.dialogManage = true
    },
    handlerManage() {
      this.loading = true
      this.axios
        .put(`${this.url}/admin/person/user/${this.current.id}/`, {
          jurisdictions: this.$refs.tree.getCheckedKeys()
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.dialogManage = false
            this.$store.commit('refresh', new Date().getTime())
            this.get_users()
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
    handleEdit(data) {
      this.form = data
      this.dialogVisible = true
    },
    handleDelete(data) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.axios
            .delete(`${this.url}/admin/person/user/${data.id}/`)
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.get_users()
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
    add() {
      if (this.form.hasOwnProperty('id')) {
        this.loading = true
        this.axios
          .put(`${this.url}/admin/person/user/${this.form.id}/`, this.form)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.get_users()
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
          .post(`${this.url}/admin/person/user/`, this.form)
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.get_users()
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
    change(data) {
      this.loading = true
      this.axios
        .put(`${this.url}/admin/person/user/${data.id}/`, {
          activated: data.activated
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.get_users()
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
    },
    close() {
      this.form = {
        userinfo: {},
        department: ''
      }
      this.dialogVisible = false
    },
    get_users() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/person/user/`)
        .then(res => {
          if (res.data.code === 200) {
            this.users = res.data.data
            this.value = res.data.data.jurisdiction
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
    get_departments() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/person/department/`)
        .then(res => {
          if (res.data.code === 200) {
            this.departments = res.data.data
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
    get_role() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/person/role/`)
        .then(res => {
          if (res.data.code === 200) {
            this.roles = res.data.data
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
    get_jurisdictions() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/person/jurisdiction/`)
        .then(res => {
          if (res.data.code === 200) {
            res.data.data.forEach(item => {
              this.jurisdictions = this.toJsonTree(res.data.data, null)
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
    this.get_users()
    this.get_departments()
    this.get_role()
    this.get_jurisdictions()
  }
}
</script>

<style lang="scss" scoped>
#user {
  width: 100%;
  height: 100%;
  padding: 40px;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .form {
    height: 500px;
    overflow: auto;
  }
}
</style>
