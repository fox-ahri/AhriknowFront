<template>
  <div
    id="blog-edit"
    class="blog-edit"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <mavon-editor
      ref="md"
      v-model="content"
      :tabSize="4"
      codeStyle="atom-one-dark"
      style="height: 100%"
      @imgAdd="imgAdd"
    />
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleImageSuccess"
          :headers="{token: token}"
        >
          <img v-if="image" :src="image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="专栏">
        <el-select v-model="form.tab" placeholder="请选择专栏">
          <el-option v-for="i in tabs" :key="i.id" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.category" placeholder="请选择分类">
          <el-option v-for="i in categories" :key="i.id" :label="i.name" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-popover placement="top-start" title="标签" width="600" trigger="hover">
          <el-tag
            v-for="(i, n) in tags"
            :type="n%4==1?'primary':(n%4==2?'success':(n%4==3?'warning':n%4==0?'danger':'info'))"
            :key="i.id"
            @click="get_children(i.id)"
            :disable-transitions="false"
            style="cursor: pointer;;margin-right: 5px"
          >{{i.name}}</el-tag>
          <el-divider></el-divider>
          <div
            class="childre"
            v-loading="loading2"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            style="min-height: 60px"
          >
            <el-tag
              v-for="(i, n) in children"
              :type="n%4==1?'primary':(n%4==2?'success':(n%4==3?'warning':n%4==0?'danger':'info'))"
              :key="i.id"
              :disable-transitions="false"
              style="cursor: pointer;margin-right: 5px"
              @click="add_tag(i)"
            >{{i.name}}</el-tag>
          </div>
          <el-button slot="reference" size="small">选择标签</el-button>
        </el-popover>
        <el-tag
          v-for="(i, n) in select"
          :type="n%4==1?'primary':(n%4==2?'success':(n%4==3?'warning':n%4==0?'danger':'info'))"
          :key="i.id"
          closable
          :disable-transitions="false"
          style="margin-left: 5px"
          @close="select = select.filter(tag => tag.id != i.id)"
        >{{i.name}}</el-tag>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="原创" :value="1"></el-option>
          <el-option label="转载" :value="2"></el-option>
          <el-option label="翻译" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="链接" v-show="form.type != '1'">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="评论">
        <el-switch
          style="display: block;margin-top: 10px"
          v-model="form.commented"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="开启并论"
          inactive-text="关闭评论"
        ></el-switch>
      </el-form-item>
      <el-form-item label="可见">
        <el-radio-group v-model="form.level">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">私密</el-radio>
          <el-radio :label="3">仅关注</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div v-if="this.$route.query.hasOwnProperty('id')">
          <el-button @click="handleAdd">保存更改</el-button>
        </div>
        <div v-else>
          <el-button @click="save_as_draft">保存为草稿</el-button>
          <el-button type="primary" @click="publish">立即发布</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'blog-edit',
  data() {
    return {
      action: `${this.url}/admin/blog/upload/`,
      token: localStorage.getItem('token'),
      loading: false,
      loading2: false,
      content: '',
      categories: [],
      tabs: [],
      tags: [],
      select: [],
      children: [],
      image: '',
      form: {
        title: '',
        describe: '',
        type: 1,
        link: '',
        commented: true,
        draft: false,
        level: 1
      }
    }
  },
  methods: {
    imgAdd(pos, $file) {
      let formdata = new FormData()
      formdata.append('image', $file)
      formdata.append('token', this.token)
      this.axios({
        url: this.action,
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        if (res.data.code === 200) this.$refs.md.$img2Url(pos, res.data.data)
        else this.$message.error('上传失败')
      })
    },
    handleImageSuccess(res) {
      if (res.code === 200) {
        this.image = res.data
      } else {
        this.$message.error('上传失败')
      }
    },
    add_tag(val) {
      if (this.select.length < 5) this.select.push(val)
      else
        this.$message({
          message: '最多添加 5 个标签',
          type: 'warning'
        })
    },
    save_as_draft() {
      this.form.draft = true
      this.handleAdd()
    },
    publish() {
      this.form.draft = false
      this.handleAdd()
    },
    handleAdd() {
      this.loading = true
      this.form.image = this.image
      this.form.content = this.content
      this.form.tags = this.select.map(tag => tag.id)
      if (this.$route.query.hasOwnProperty('id')) {
        this.axios
          .put(
            `${this.url}/admin/blog/article/${this.$route.query.id}/`,
            this.form
          )
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.$router.go(-1)
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        this.axios
          .post(`${this.url}/admin/blog/article/`, this.form)
          .then(res => {
            this.loading = false
            if (res.data.code === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.go(-1)
              this.dialogVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    get_children(id) {
      this.loading2 = true
      this.axios
        .get(`${this.url}/admin/blog/tag/${id}/`)
        .then(res => {
          if (res.data.code === 200) {
            this.children = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading2 = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading2 = false
        })
    },
    get_tabs() {
      this.axios
        .get(`${this.url}/admin/blog/tab/`)
        .then(res => {
          if (res.data.code === 200) {
            this.tabs = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    get_categories() {
      this.axios
        .get(`${this.url}/admin/blog/category/`)
        .then(res => {
          if (res.data.code === 200) {
            this.categories = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    get_tags() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/tag/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.tags = res.data.data
            this.get_children(this.tags[0].id)
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_article(id) {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/blog/article/${id}`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.form = res.data.data
            this.image = this.form.image
            this.select = this.form.select
            this.content = this.form.content
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty('id')) {
      this.get_article(this.$route.query.id)
    }
    this.get_tabs()
    this.get_categories()
    this.get_tags()
  }
}
</script>

<style lang="scss" scoped>
#blog-edit {
  width: 100%;
  height: 100%;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  .el-tag {
    cursor: pointer;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: dashed 2px #ccc;
  }
  .avatar {
    max-width: 478px;
    max-height: 378px;
    display: block;
  }
}
</style>
