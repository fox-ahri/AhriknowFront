<template>
  <div id="index-blog-article" class="index-blog-article">
    <div class="container">
      <nav class="nav" :style="`height: ${height}px`">
        <ul>
          <li :class="{'activated': activated == 0}" @click="change_tab(0)">推荐</li>
          <li
            v-for="i in tabs"
            :key="i.id"
            :class="{'activated': activated == i.id}"
            @click="change_tab(i.id)"
          >{{i.name}}</li>
          <li @click="$router.go(-1)">
            <i class="el-icon-back"></i>
          </li>
        </ul>
      </nav>
      <section class="section">
        <div class="plant"></div>
        <article class="article" v-loading="loading">
          <div class="item" v-for="i in articles" :key="i.id">
            <div class="title" :title="i.title" @click="read(i.id)">
              <el-tag type="success" v-if="i.type == 1">原创</el-tag>
              <el-tag type="primary" v-else-if="i.type == 2">转载</el-tag>
              <el-tag type="danger" v-else>翻译</el-tag>
              {{i.title}}
            </div>
            <div class="footer">
              <div
                class="user"
                @click="$router.push({name: 'index-blog-author', query: {id: i.user.id}})"
              >
                <div class="avatar">
                  <el-avatar size="medium" :src="i.user.avatar"></el-avatar>
                </div>
                <div class="nickname">{{i.user.nickname == '' ? i.user.username : i.user.nickname}}</div>
              </div>
              <div class="info">
                <i class="iconfont icon-l-fabulous">{{i.fabulous}}</i>
                <i class="iconfont icon-view1">{{i.views}}</i>
                <i class="iconfont icon-comment">{{i.comments}}</i>
              </div>
            </div>
          </div>
          <button class="more" @click="get_articles">获 取 更 多</button>
        </article>
      </section>
      <div class="right">
        <div class="mine">
          <el-menu class="el-menu-vertical-demo" mode="horizontal" menu-trigger="hover">
            <el-menu-item v-if="mine.id == ''" index="2" @click="dialogVisible = true">登 录</el-menu-item>
            <el-submenu v-else index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>{{mine.nickname == '' ? mine.username : mine.nickname}}</span>
              </template>
              <el-menu-item index="1-1" @click="$router.push({name: 'welcome'})">后台管理</el-menu-item>
              <el-menu-item index="1-2" @click="$router.push({name: 'blog-follow'})">我的关注</el-menu-item>
              <el-menu-item index="1-3" @click="$router.push({name: 'blog-article'})">写博客</el-menu-item>
              <el-menu-item index="1-4" @click="exit">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
    <el-dialog title="登录" :visible.sync="dialogVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'index-blog-article',
  data () {
    return {
      activated: 0,
      tabs: [],
      articles: [],
      height: '800',
      page: 1,
      size: 10,
      loading: false,
      dialogVisible: false,
      mine: {
        id: ''
      },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    exit () {
      localStorage.clear()
      this.$store.commit('userinfo', { id: '' })
      this.fans = false
      this.mine = { id: '' }
    },
    login () {
      if (this.form.username == '') {
        this.$message.error('请输入用户名')
        return
      }
      if (this.form.password == '') {
        this.$message.error('请输入密码')
        return
      }
      this.dialogVisible = false
      this.loading = true
      this.axios
        .post(`${this.url}/login/`, this.form)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$store.commit('token', res.data.data.token)
            this.$store.commit('userinfo', res.data.data)
            this.mine = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    read (id) {
      localStorage.setItem('article', id)
      const h = this.$router.resolve({
        name: 'index-blog-read',
        query: { id: id }
      })
      window.open(h.href, '_blank')
    },
    change_tab (id) {
      this.activated = id
      this.articles = []
      this.page = 1
      this.get_articles()
      this.$router.push(`/blog/index?id=${id}`)
    },
    get_tabs () {
      this.loading = true
      this.axios
        .get(`${this.url}/index/blog/tab/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.tabs = res.data.data
            this.height = 40 * (res.data.data.length + 1) + 60
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_articles () {
      this.loading = true
      this.axios
        .get(`${this.url}/index/blog/article/`, {
          params: {
            id: this.activated,
            page: this.page,
            size: this.size
          }
        })
        .then(res => {
          this.loading = false
          this.page++
          res.data.results.forEach(article => {
            this.articles.push(article)
          })
        })
        .catch(err => {
          this.loading = false
          this.$message({
            message: '没有更多了',
            type: 'warning'
          })
        })
    }
  },
  mounted () {
    this.mine = this.$store.state.userinfo || { id: '' }
    this.activated = this.$route.query.id
    this.page = 1
    this.get_tabs()
    this.get_articles()
  }
}
</script>

<style lang="scss" scoped>
#index-blog-article {
  width: 100%;
  height: 100%;
  background: #f5f6f7;
  color: #555;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    .nav {
      width: 120px;
      background: #fff;
      ul {
        li {
          list-style: none;
          display: block;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #707070;
          cursor: pointer;
          transition: 0.2s;
          &:hover {
            background: #f44444;
            color: #fff;
          }
          &:active {
            background: #f66666;
            color: #fff;
          }
        }
        li.activated {
          background: #f44444;
          color: #fff;
        }
      }
    }
    .section {
      flex: 1;
      height: 100%;
      margin: 0 10px;
      background: #fff;
      overflow: hidden;
      position: relative;
      .plant {
        z-index: 100;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 20px;
        background: #fff;
      }
      .article {
        padding: 0 20px;
        height: 100%;
        overflow: auto;
        .item {
          padding: 5px 0;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: solid 1px #ddd;
          .title {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            line-height: 34px;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            &:hover {
              color: #ff3333;
            }
          }
          .footer {
            display: flex;
            justify-content: space-between;
            .user {
              display: flex;
              align-items: center;
              cursor: pointer;
              &:hover .nickname {
                color: #3375aa;
              }
              .avatar {
                margin-right: 15px;
              }
              .nickname {
                font-weight: 600;
              }
            }
            .info {
              display: flex;
              align-items: center;
              i {
                font-size: 16px;
                margin-left: 12px;
                cursor: pointer;
              }
            }
          }
        }
        .more {
          display: block;
          width: 200px;
          height: 36px;
          margin: 30px auto;
          background: #ddd;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.2s;
          &:hover {
            background: #ccc;
          }
          &:active {
            background: #bbb;
          }
        }
      }
    }
    .right {
      width: 240px;
      height: 600px;
      background: #fff;
    }
  }
}
</style>
