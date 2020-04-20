<template>
  <div id="index-blog-index" class="index-blog-index">
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
              <div class="user">
                <div class="avatar">
                  <el-avatar size="medium" :src="i.user.avatar"></el-avatar>
                </div>
                <div class="nickname">{{i.user.nickname}}</div>
              </div>
              <div class="info">
                <i class="el-icon-star-off">{{i.fabulous}}</i>
                <i class="el-icon-view">{{i.views}}</i>
              </div>
            </div>
          </div>
          <button class="more" @click="get_articles">获 取 更 多</button>
        </article>
      </section>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index-blog-index',
  data() {
    return {
      activated: 0,
      tabs: [],
      articles: [],
      height: '800',
      page: 1,
      size: 10,
      loading: false
    }
  },
  methods: {
    read(id) {
      localStorage.setItem('article', id)
      const h = this.$router.resolve({
        name: 'index-blog-read',
        query: { id: id }
      })
      window.open(h.href, '_blank')
    },
    change_tab(id) {
      this.activated = id
      this.articles = []
      this.page = 1
      this.get_articles()
      this.$router.push(`/blog/index?id=${id}`)
    },
    get_tabs() {
      this.loading = true
      this.axios
        .get(`${this.url}/index/blog/tab/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.tabs = res.data.data
            this.height = 40 * (res.data.data.length + 1) + 20
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_articles(id = 0) {
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
  mounted() {
    this.activated = this.$route.query.id
    this.page = 1
    this.get_tabs()
    this.get_articles()
  }
}
</script>

<style lang="scss" scoped>
#index-blog-index {
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
