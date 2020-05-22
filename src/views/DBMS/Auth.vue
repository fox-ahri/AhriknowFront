<template>
  <div
    id="dbms-auth"
    class="dbms-auth"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="login">
      <el-tabs type="border-card">
        <el-tab-pane label="Mysql">
          <el-form ref="form" :model="mysql" label-width="80px">
            <el-form-item label="连接地址">
              <div class="address">
                <el-input v-model="mysql.host" placeholder="HOST"></el-input>
                <el-input class="port" v-model="mysql.port" placeholder="PORT"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="mysql.user" placeholder="USER"></el-input>
            </el-form-item>
            <el-form-item label="密  码">
              <el-input v-model="mysql.pass" placeholder="PASS"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="link('mysql')">连接</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Mongo">Mongo</el-tab-pane>
        <el-tab-pane label="Redis">Redis</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dbms-auth',
  data () {
    return {
      loading: false,
      mysql: {
        host: 'db.ahriknow.com',
        port: '3306',
        user: 'root',
        pass: 'Aa12345.'
      }
    }
  }, methods: {
    link (type) {
      this.loading = true
      this.axios.post('http://127.0.0.1:5000/dbms/auth', this.mysql).then(res => {
        this.loading = false
        if (res.data.code === 200) {
          localStorage.setItem(type, res.data.data)
          this.$router.push({ name: 'dbms-' + type })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#dbms-auth {
  width: 100%;
  height: 100%;
  padding-top: 200px;
  .login {
    width: 500px;
    height: 350px;
    margin: 0 auto;
    .address {
      display: flex;
      .port {
        width: 150px;
      }
    }
  }
}
</style>