<template>
  <div id="blog-read" class="blog-read">
    <div class="container">
      <div class="markdown-body" v-html="html"></div>
      <el-input v-show="reply" type="textarea" :row="4" v-model="content"></el-input>
      <div class="opera">
        <el-button v-show="!reply" @click="reply = true" type="text">留言</el-button>
        <el-button v-show="reply" @click="reply = false" type="text">取消</el-button>
        <el-button v-show="reply" @click="add" type="text">确定</el-button>
      </div>
      <div class="comment">
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
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs" style="font-size: 16px"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        )
      } catch (__) {}
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
  data() {
    return {
      article: {},
      html: '',
      comments: [],
      content: '',
      reply: false
    }
  },
  methods: {
    add() {
      if (this.content.trim().length < 1) {
        this.$message('请输入有效的内容')
        return
      }
      this.axios
        .post(`${this.url}/admin/blog/comment/`, {
          parent: null,
          content: this.content,
          article: this.$route.query.id
        })
        .then(res => {
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
          this.$message.error(err.message)
        })
    },
    get_article(id) {
      this.axios
        .get(`${this.url}/index/blog/article/${id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.article = res.data.data
            this.html = md.render(res.data.data.content)
          } else {
            this.$message({
              message: '获取文章失败',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: '获取文章失败',
            type: 'warning'
          })
        })
    },
    get_tree(data, id = null, depth = 0) {
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
    get_comments(id) {
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
  mounted() {
    let id
    if (this.$route.query.hasOwnProperty('id')) {
      id = this.$route.query.id
    } else {
      if (localStorage.getItem('article')) {
        id = localStorage.getItem('article')
        this.$router.push({
          name: 'index-blog-read',
          query: { id: id }
        })
      } else {
        this.$router.push({ name: 'index-blog-index' })
      }
    }
    this.get_article(id)
    this.get_comments(id)
  }
}
</script>

<style lang="scss" scoped>
#blog-read {
  width: 100%;
  //   height: 100%;
  background: #f5f6f7;
  //   overflow: hidden;
  .container {
    // height: 100%;
    // overflow: auto;
    width: 1100px;
    margin: 0 auto;
    background: #fff;
    padding: 50px;
    .opera {
      text-align: right;
    }
    .comment {
      background: #fff;
      padding-top: 20px;
    }
  }
}
</style>
