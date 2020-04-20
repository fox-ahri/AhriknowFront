<template>
  <div id="comment" class="comment">
    <div class="item" v-for="i in comments" :key="i.id" :class="{'children' : i.parent != null}">
      <div class="info">
        <div class="avatar">
          <el-avatar size="medium" :src="i.user.avatar"></el-avatar>
        </div>
        <div class="nickname">{{i.user.nickname}}</div>
        <div class="date">{{i.date}}</div>
        <el-button type="text" v-show="!i.reply" @click="i.reply = true">回复</el-button>
      </div>
      <div class="content">
        <div class="markdown-body" v-html="html(i.content)"></div>
      </div>
      <el-divider></el-divider>
      <div class="reply">
        <div class="opera">
          <el-button type="text" v-show="i.reply" @click="i.reply = false;i.reply_content = ''">取消</el-button>
          <el-button type="text" v-show="i.reply" @click="toreply(i)">确定</el-button>
        </div>
        <div class="input" v-show="i.reply">
          <el-input type="textarea" v-model="i.reply_content" :row="4"></el-input>
        </div>
      </div>
      <comment v-if="i.children.length > 0" :comments="i.children" />
    </div>
  </div>
</template>

<script>
import '../assets/github-markdown.min.css'
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
  name: 'comment',
  props: ['comments'],
  methods: {
    html(val) {
      return md.render(val)
    },
    toreply(val) {
      this.axios
        .post(`${this.url}/admin/blog/comment/`, {
          parent: val.id,
          content: val.reply_content,
          article: val.article
        })
        .then(res => {
          if (res.data.code === 200) {
            let comment = res.data.data
            comment.reply = false
            comment.reply_content = ''
            comment.children = []
            val.children.unshift(comment)
            val.reply = false
          } else {
            console.log(res.data)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#comment {
  width: 100%;
  height: 100%;
  .children {
    padding-left: 60px;
  }
  .item {
    .el-divider {
      margin: 12px 0;
    }
    .info {
      display: flex;
      align-items: center;
      .nickname {
        margin: 0 12px;
      }
      .date {
        margin-right: 12px;
      }
    }
    .content {
      padding-left: 20px;
    }
    .reply {
      padding-left: 60px;
    }
  }
}
</style>
