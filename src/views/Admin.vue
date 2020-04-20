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
          <el-menu-item index="1" @click="$router.push('/admin')">管理中心</el-menu-item>
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
              <i class="iconfont icon-welcome"></i>
              <span slot="title">Welcome</span>
            </el-menu-item>
            <el-menu-item index="/admin/userinfo">
              <i class="iconfont icon-user"></i>
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-submenu index="/admin/notebook" v-if="auth('狸知云笔记')">
              <template slot="title">
                <i class="iconfont icon-book"></i>
                <span>狸知云笔记</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/book" v-if="auth('笔记')">笔记</el-menu-item>
                <el-menu-item index="/admin/tag" v-if="auth('标签')">标签</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/admin/blog" v-if="auth('狸知博客')">
              <template slot="title">
                <i class="iconfont icon-blogger"></i>
                <span>狸知博客</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/blog/tag" v-if="auth('标签管理')">标签管理</el-menu-item>
                <el-menu-item index="/admin/blog/tab" v-if="auth('专栏管理')">专栏管理</el-menu-item>
                <el-menu-item index="/admin/blog/category" v-if="auth('分类专栏')">分类专栏</el-menu-item>
                <el-menu-item index="/admin/blog/article" v-if="auth('文章管理')">文章管理</el-menu-item>
                <el-menu-item index="/admin/blog/edit" v-if="auth('新建文章')">新建文章</el-menu-item>
                <el-menu-item index="/admin/blog/comment" v-if="auth('评论管理')">评论管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/admin/database" v-if="auth('数据库管理')">
              <template slot="title">
                <i class="iconfont icon-database"></i>
                <span>数据库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/database-db" v-if="auth('数据库')">Database</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/admin/restapi" v-if="auth('接口管理')">
              <template slot="title">
                <i class="iconfont icon-api"></i>
                <span>Restful 接口</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/restapi-project" v-if="auth('接口管理')">项目管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/admin/person" v-if="auth('人员管理')">
              <template slot="title">
                <i class="iconfont icon-user1"></i>
                <span>人员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/department" v-if="auth('部门管理')">部门管理</el-menu-item>
                <el-menu-item index="/admin/role" v-if="auth('角色管理')">角色管理</el-menu-item>
                <el-menu-item index="/admin/jurisdiction" v-if="auth('权限管理')">权限管理</el-menu-item>
                <el-menu-item index="/admin/user" v-if="auth('用户管理')">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/admin/setting" v-if="auth('系统设置')">
              <template slot="title">
                <i class="iconfont icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/index-show" v-if="auth('首页展示')">首页展示</el-menu-item>
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
      loading: false,
      user: {
        username: ''
      }
    }
  },
  methods: {
    auth(jur) {
      return (
        this.jurisdictions.indexOf('狸知云笔记') > -1 ||
        this.user.username == 'ahriknow'
      )
    },
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
    this.user = this.$store.state.userinfo
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
  i {
    font-size: 20px;
    margin-right: 10px;
  }
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
    position: relative;
  }
}
</style>
