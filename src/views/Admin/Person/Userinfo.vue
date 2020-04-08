<template>
  <div
    id="user-info"
    class="user-info"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h2>基本信息</h2>
    <el-divider></el-divider>
    <el-form label-width="70px" label-position="left">
      <el-form-item label="用户名">
        <el-input v-model="userinfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="userinfo.create_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="上次登录">
        <el-input v-model="userinfo.last_login" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userinfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userinfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userinfo.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSaveUser">保存更改</el-button>
        <el-button @click="dialogVisible = true">详细信息</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <el-form :model="detail" label-width="80px" style="margin-right: 40px">
        <el-form-item label="姓名">
          <el-input v-model="detail.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="detail.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="detail.sex">
            <el-radio :label="0">保密</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="detail.birthday" type="date" placeholder="选择生日"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlerSaveInfo">保存更改</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user-info',
  data() {
    return {
      userinfo: {},
      detail: {},
      dialogVisible: false,
      loading: false
    }
  },
  methods: {
    handlerSaveUser() {
      this.save(this.userinfo)
    },
    handlerSaveInfo() {
      this.dialogVisible = false
      this.save(this.detail)
    },
    get_data() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/person/userinfo/`)
        .then(res => {
          if (res.data.code === 200) {
            this.userinfo = res.data.data
            this.detail = res.data.data.userinfo
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
    save(data) {
      this.loading = true
      this.axios
        .put(`${this.url}/admin/person/userinfo/`, data)
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
    this.get_data()
  }
}
</script>

<style lang="scss" scoped>
#user-info {
  width: 100%;
  height: 100%;
  padding: 40px;
}
</style>
