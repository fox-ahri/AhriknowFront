<template>
  <div id="admin" class="admin">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">管理中心</el-menu-item>
          <el-menu-item index="2" style="float: right" @click="exit">退出</el-menu-item>
          <el-menu-item index="3" style="float: right" @click="$router.push('/')">首页</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside
          width="280px"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <el-menu
            :default-active="active"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#66ccff"
            router
            unique-opened
          >
            <el-menu-item index="/admin/welcome">
              <i class="el-icon-s-home"></i>
              <span slot="title">Welcome</span>
            </el-menu-item>
            <el-menu-item index="/admin/userinfo">
              <i class="el-icon-warning"></i>
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-submenu index="/admin/person" v-if="jurisdictions.indexOf('人员管理') > -1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>人员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="/admin/department"
                  v-if="jurisdictions.indexOf('部门管理') > -1"
                >部门管理</el-menu-item>
                <el-menu-item index="/admin/role" v-if="jurisdictions.indexOf('角色管理') > -1">角色管理</el-menu-item>
                <el-menu-item
                  index="/admin/jurisdiction"
                  v-if="jurisdictions.indexOf('权限管理') > -1"
                >权限管理</el-menu-item>
                <el-menu-item index="/admin/user" v-if="jurisdictions.indexOf('用户管理') > -1">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/admin/book" v-if="jurisdictions.indexOf('狸知云笔记') > -1">
              <i class="el-icon-s-management"></i>
              <span slot="title">狸知云笔记</span>
            </el-menu-item>
            <el-submenu index="/admin/setting" v-if="jurisdictions.indexOf('系统设置') > -1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="/admin/index-show"
                  v-if="jurisdictions.indexOf('首页展示') > -1"
                >首页展示</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      activeIndex: '1',
      active: '/admin/userinfo',
      jurisdictions: [],
      loading: false
    }
  },
  methods: {
    exit() {
      localStorage.clear()
      this.$router.push('/auth')
    },
    get_jurisdictions() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/person/jur/`)
        .then(res => {
          if (res.data.code === 200) {
            this.jurisdictions = res.data.data
            this.$store.commit('jurisdictions', res.data.data)
          } else {
            console.log(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  created() {
    if (!this.$store.state.token) {
      localStorage.clear()
      this.$router.push('/auth')
      return
    }
    this.get_jurisdictions()
    this.active = this.$route.path
  },
  watch: {
    '$store.state.refresh': function(v1, v2) {
      this.get_jurisdictions()
    }
  }
}
</script>

<style lang="scss" scoped>
#admin {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-container {
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-aside {
    padding: 0;
    .el-menu {
      height: 100%;
      border-right: none;
    }
  }

  .el-main {
    padding: 0;
  }
}
</style>
