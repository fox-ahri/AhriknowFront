<template>
  <div id="blog-read" class="blog-read">
    <div class="container" v-loading="loading">
      <div class="markdown-body" v-html="html"></div>
      <div class="info">
        <i
          class="iconfont icon-l-fabulous"
          :class="{'active': active}"
          @click="fabulous"
        >{{article.fabulous}}</i>
        <i class="iconfont icon-view1">{{article.views}}</i>
      </div>
      <el-divider></el-divider>
      <el-input v-show="reply" type="textarea" :row="4" v-model="content"></el-input>
      <h3 v-if="!article.commented">此文章已关闭评论功能</h3>
      <div class="opera" v-if="article.commented">
        <el-button v-show="!reply" @click="reply = true" type="text">留言</el-button>
        <el-button v-show="reply" @click="reply = false" type="text">取消</el-button>
        <el-button v-show="reply" @click="add" type="text">确定</el-button>
      </div>
      <div class="comment" v-if="article.commented" v-loading="loading2">
        <Comment :comments="comments" />
      </div>
      <div style="height: 300px"></div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
import '../../../assets/github-markdown.min.css'
import 'highlight.js/styles/atom-one-dark.css'
const hljs = require('highlight.js')
const md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs" style="font-size: 16px"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) { }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  }
})
export default {
  name: 'blog-read',
  components: {
    Comment
  },
  data () {
    return {
      article: {},
      html: '',
      comments: [],
      content: '',
      reply: false,
      active: false,
      loading: false,
      loading2: false
    }
  },
  methods: {
    fabulous () {
      this.axios
        .post(`${this.url}/admin/blog/fabulous/`, {
          fabulous: !this.active,
          who: this.$store.state.userinfo.id,
          what: this.$route.query.id
        })
        .then(res => {
          if (res.data.code === 200) {
            if (this.active) {
              this.article.fabulous--
            } else {
              this.article.fabulous++
            }
            this.active = !this.active
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })    },
    add () {
      if (this.content.trim().length < 1) {
        this.$message('请输入有效的内容')
        return
      }
      this.loading2 = true
      this.axios
        .post(`${this.url}/admin/blog/comment/`, {
          parent: null,
          content: this.content,
          article: this.d(this.$route.query.id)
        })
        .then(res => {
          this.loading2 = false
          if (res.data.code === 200) {
            let comment = res.data.data
            comment.reply = false
            comment.reply_content = ''
            comment.children = []
            this.comments.unshift(comment)
            this.reply = false
          } else {
            console.log(res.data)
          }
        })
        .catch(err => {
          this.loading2 = false
          this.$message.error(err.message)
        })
    },
    get_article (id) {
      this.loading = true
      this.axios
        .get(`${this.url}/index/blog/article/${id}`, {
          params: {
            u: this.$store.state.userinfo.id
          }
        })
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.article = res.data.data
            this.active = res.data.data.active
            this.html = md.render(res.data.data.content)
          } else {
            this.$message({
              message: '获取文章失败',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message({
            message: '获取文章失败',
            type: 'warning'
          })
        })
    },
    get_tree (data, id = null, depth = 0) {
      let tmp = []
      data.forEach(comment => {
        if (comment.parent == id) {
          comment.depth = depth
          comment.reply = false
          comment.reply_content = ''
          comment.children = this.get_tree(data, comment.id, depth + 1)
          tmp.push(comment)
        }
      })
      return tmp
    },
    get_comments (id) {
      this.axios
        .get(`${this.url}/index/blog/comment/${id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.comments = this.get_tree(res.data.data)
          }
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: 'warning'
          })
        })
    }
  },
  mounted () {
    if (this.$route.query.hasOwnProperty('id')) {
      let id = this.d(this.$route.query.id)
      this.get_article(id)
      this.get_comments(id)
    }
  }
}
</script>

<style lang="scss" scoped>
#blog-read {
  width: 100%;
  min-height: 100%;
  background: #f5f6f7;
  .container {
    min-height: 100%;
    width: 1000px;
    margin: 0 auto;
    background: #fff;
    padding: 50px;
    .info {
      padding-top: 20px;
      text-align: right;
      i {
        margin-left: 15px;
        cursor: pointer;
      }
      .active {
        color: #e6a23c;
      }
    }
    .opera {
      text-align: right;
    }
    .comment {
      background: #fff;
      padding-top: 20px;
    }
  }
}

@media screen and (max-width: 1100px) {
  #blog-read {
    .container {
      width: 98%;
      margin: 0 1%;
    }
  }
}
</style>
