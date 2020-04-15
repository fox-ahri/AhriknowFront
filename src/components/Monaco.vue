<template>
  <div id="monaco" class="monaco">
    <div class="the-code-editor-container" ref="container"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// import 'monaco-editor/esm/vs/basic-languages/shell/shell.contribution'
// import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
export default {
  name: 'monaco',
  data() {
    return {
      monacoInstance: null
    }
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          language: 'python',
          readOnly: false
        }
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    init() {
      this.monacoInstance = monaco.editor.create(this.$refs['container'], {
        value: this.value,
        theme: 'vs', // vs, hc-black, or vs-dark
        autoIndex: true,
        ...this.options
      })
      this.monacoInstance.onDidChangeModelContent(() => {
        this.$emit('contentChange', this.monacoInstance.getValue())
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
#monaco {
  width: 100%;
  height: 100%;
  .the-code-editor-container {
    width: 100%;
    height: 100%;
    .monaco-editor .scroll-decoration {
      box-shadow: none;
    }
  }
}
</style>
