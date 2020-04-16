<template>
  <div id="home" class="home">
    <div
      class="index-show"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-card>
        <div class="markdown-body" v-html="html"></div>
      </el-card>
    </div>
    <RECORD />
  </div>
</template>

<script>
import RECORD from '@/components/Record'
import '../../assets/github-markdown.min.css'
import 'highlight.js/styles/atom-one-dark.css'
const hljs = require('highlight.js')
const md = require('markdown-it')({
  html: true, // 在源码中启用 HTML 标签
  xhtmlOut: false, // 使用 '/' 来闭合单标签 （比如 <br />）。
  // 这个选项只对完全的 CommonMark 模式兼容。
  breaks: false, // 转换段落里的 '\n' 到 <br>。
  langPrefix: 'language-', // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify: false, // 将类似 URL 的文本自动转换为链接。

  // 启用一些语言中立的替换 + 引号美化
  typographer: false,

  // 当 typographer 启用时，成倍的 + 单引号替换对。
  // 或者智能(smartquotes)引号等，可以是 String 或 Array。
  //
  // 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
  // 还有 ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] 给法国人使用（包括 nbsp）。
  quotes: '“”‘’',

  // 高亮函数，会返回转义的 HTML。
  // 如果源字符串未更改，且应该进行外部的转义，或许返回 ''
  // 如果结果以 <pre ... 开头，内部包装器则会跳过。
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
  name: 'home',
  components: {
    RECORD
  },
  data() {
    return {
      content: '# your markdown content',
      html: '',
      loading: false,
      options: {
        markdownIt: {
          linkify: true
        },
        linkAttributes: {
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        }
      }
    }
  },
  methods: {
    get_index_show() {
      this.loading = true
      this.axios
        .get(`${this.url}/index/setting/index-show/`)
        .then(res => {
          if (res.data.code === 200) {
            this.html = md.render(res.data.data.content)
            this.content = res.data.data.content
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
    this.get_index_show()
  }
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  .index-show {
    width: 1000px;
    margin: 30px auto;
    .el-card {
      width: 100%;
      height: 100%;
      background: #fffc;
    }
  }
}
</style>
