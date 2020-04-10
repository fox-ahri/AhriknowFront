<template>
  <div
    id="book"
    class="book"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="container">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-select
            v-model="select"
            slot="prepend"
            multiple
            placeholder="请选择"
            style="width: 200px"
          >
            <el-option v-for="i in tags" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="get_search">搜 索</el-button>
        </el-input>
        <el-divider></el-divider>
      </div>
      <div class="book" v-for="i in books" :key="i.id">
        <div class="mask">
          <div class="name">{{i.name}}</div>
          <div class="author">{{i.nickname}}</div>
          <div class="opera">
            <el-button type="primary" size="small" plain @click="info(i)">详情</el-button>
            <el-button
              type="success"
              size="small"
              plain
              @click="$router.push(`/read?id=${i.id}&name=${i.name}`)"
            >阅读</el-button>
          </div>
        </div>
        <el-image :src="i.image" fit="cover" lazy>
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="more">
      <el-button plain @click="more">获 取 更 多</el-button>
    </div>
    <el-dialog :title="current.name" :visible.sync="dialogVisible" width="30%">
      <p class="describe">{{current.describe}}</p>
      <p class="nickname">{{current.nickname}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">关 闭</el-button>
        <el-button
          type="success"
          @click="$router.push(`/read?id=${current.id}&name=${current.name}`)"
          size="small"
        >阅 读</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'book',
  data() {
    return {
      loading: false,
      books: [],
      tags: [],
      dialogVisible: false,
      current: { name: '' },
      next: '',
      search: '',
      select: []
    }
  },
  methods: {
    info(val) {
      this.current = val
      this.dialogVisible = true
    },
    more() {
      this.get_books(this.next)
    },
    get_search() {
      this.books = []
      this.get_books(`${this.url}/index/notebook/book/`)
    },
    get_books(next = null) {
      if (!next) {
        this.$message({
          message: '没有更多了',
          type: 'warning'
        })
        return
      }
      this.loading = true
      this.axios
        .get(next, {
          params: {
            search: this.search,
            select: this.select.join(',')
          }
        })
        .then(res => {
          this.next = res.data.next
          res.data.results.forEach(book => {
            this.books.push(book)
          })
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_tags() {
      this.loading = true
      this.axios
        .get(`${this.url}/index/notebook/tag/`)
        .then(res => {
          if (res.data.code === 200) {
            this.tags = res.data.data
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
    this.get_books(`${this.url}/index/notebook/book/`)
    this.get_tags()
  }
}
</script>

<style lang="scss" scoped>
#book {
  width: 100%;
  height: 100%;
  .el-dialog {
    .describe {
      font-size: 20px;
    }
    .nickname {
      padding-top: 20px;
    }
  }
  .container {
    width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    .search {
      width: 1080px;
    }
    .book {
      width: 150px;
      height: 200px;
      margin: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      cursor: pointer;
      position: relative;
      .image-slot {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 32px;
        }
      }
      .mask {
        z-index: 1998;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 100%;
        background: #0008;
        overflow: hidden;
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .name {
          height: 30px;
          font-size: 24px;
          color: #eee;
          font-weight: 600;
          overflow: hidden;
        }
        .author {
          height: 30px;
          font-size: 20px;
          color: #eee;
          overflow: hidden;
        }
        .opera {
          display: flex;
          justify-content: space-around;
        }
      }
      &:hover .mask {
        top: 0;
      }
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .more {
    text-align: center;
    .el-button {
      width: 240px;
    }
  }
}
</style>
