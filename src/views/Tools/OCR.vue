<template>
  <div id="tools-ocr" class="tools-ocr">
    <el-card>
      <el-input v-model="lang">
        <template slot="prepend">Lang</template>
      </el-input>
      <div class="ocr">
        <el-upload
          class="upload-demo"
          drag
          action="https://api.ahriknow.com/ocr"
          :on-success="change"
          :data="{lang: lang}"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
        <el-input type="textarea" placeholder="Result" v-model="result" rows="8"></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tools-ocr',
  data() {
    return {
      result: '',
      lang: 'eng'
    }
  },
  methods: {
    change(res) {
      if (res.code === 200) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.result = res.data
      } else {
        this.$message.error('操作失败')
        this.result = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#tools-ocr {
  width: 100%;
  height: 100%;
  padding: 40px;
  .ocr {
    display: flex;
  }
}
</style>
