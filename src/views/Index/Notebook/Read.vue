<template>
  <div
    id="index-read"
    class="index-read"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-container>
      <el-aside width="320px">
        <div class="back">
          <el-button type="text" size="mini" @click="$router.go(-1)">
            <i class="el-icon-back"></i>
          </el-button>
        </div>
        <div class="title">
          <p class="name" :title="$route.query.name">{{$route.query.name}}</p>
        </div>
        <div class="catalog">
          <el-tree
            :data="catalogs"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="open_read"
          >
            <span class="custom-tree-node" slot-scope="{ data }">
              <span>{{ data.name }}</span>
            </span>
          </el-tree>
        </div>
      </el-aside>
      <el-main>
        <div class="opera">
          <div v-show="current.name" class="name">{{current.name}}</div>
          <div></div>
          <div>
            <!-- <el-button @click="download" size="small">下载</el-button> -->
            <!-- <el-button type="primary" @click="save_content" size="small">保存</el-button> -->
          </div>
        </div>
        <div class="edit">
          <el-card>
            <div class="markdown-body" v-html="html"></div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import '../../../assets/github-markdown.min.css'
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
  name: 'index-read',
  data() {
    return {
      catalogs: [],
      loading: false,
      current: {},
      html: ''
    }
  },
  methods: {
    getJsonTree(data, parentId) {
      var itemArr = []
      for (var i = 0; i < data.length; i++) {
        var node = data[i]
        if (node.parent == parentId) {
          var newNode = {}
          newNode.id = node.id
          newNode.name = node.name
          newNode.p_name = node.p_name
          newNode.children = this.getJsonTree(data, node.id)
          itemArr.push(newNode)
        }
      }
      return itemArr
    },
    get_catalogs() {
      this.loading = true
      this.axios
        .get(`${this.url}/index/notebook/catalog/${this.$route.query.id}/`)
        .then(res => {
          if (res.data.code === 200) {
            this.catalogs = this.getJsonTree(res.data.data, null)
            if (this.catalogs.length > 0) this.open_read(this.catalogs[0])
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
    open_read(val) {
      this.current = val
      this.loading = true
      this.axios
        .get(`${this.url}/index/notebook/content/${val.id}/`)
        .then(res => {
          if (res.data.code === 200) {
            this.html = md.render(res.data.data.content)
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
    this.get_catalogs()
  }
}
</script>

<style lang="scss" scoped>
#index-read {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    box-shadow: 8px 0 10px #eee;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .back {
      padding: 5px 20px;
      box-shadow: 0 6px 10px #eee;
      .el-button {
        font-size: 40px;
      }
    }
    .title {
      height: 90px;
      line-height: 90px;
      text-align: center;
      box-shadow: 0 6px 10px #eee;
      margin-bottom: 20px;
      .name {
        font-size: 26px;
        font-weight: 600;
        cursor: pointer;
      }
    }
    .catalog {
      flex: 1;
      overflow: auto;
    }
  }

  .el-main {
    height: 100%;
    position: relative;
    .opera {
      position: absolute;
      height: 70px;
      top: 0;
      left: 15px;
      right: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 6px 10px #eee;
      }
    }
    .edit {
      position: absolute;
      top: 70px;
      left: 15px;
      right: 15px;
      bottom: 20px;
    }
  }
}
</style>
