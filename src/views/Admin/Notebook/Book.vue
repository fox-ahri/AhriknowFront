<template>
  <div id="book" class="book">
    <div class="title">
      <h2>我的笔记</h2>
    </div>
    <el-divider></el-divider>
    <div class="container">
      <div class="item" v-for="i in bs" :key="i.id" @click="goto_edit(i.id)">
        <el-card>
          <img :src="i.image" alt="image" />
          <p class="name">{{i.name}}</p>
          <p class="describe">{{i.describe}}</p>
          <hr />
          <p class="create_time">{{i.create_time}}</p>
          <hr />
          <p class="user">{{i.nickname}}</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'book',
  data() {
    return {
      bs: [
        {
          id: '1',
          name: 'Python 入门',
          describe:
            'Python是一种跨平台的计算机程序设计语言。 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言',
          image: 'http://api.ahriknow.com/image?album=girl,1',
          create_time: '2020-04-01 12:24:53',
          nickname: 'AHRI'
        },
        {
          id: '2',
          name: 'JAVA 入门',
          describe:
            'Python是一种跨平台的计算机程序设计语言。 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言',
          image: 'http://api.ahriknow.com/image?album=girl,2',
          create_time: '2020-04-01 12:24:53',
          nickname: 'AHRI'
        }
      ],
      books: []
    }
  },
  methods: {
    get_books() {
      this.axios
        .get(`${this.url}/notebook/book/`)
        .then(res => {
          this.books = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    goto_edit(id) {
      this.$router.push({ name: 'edit', query: { id: id } })
    }
  },
  mounted() {
    this.get_books()
  }
}
</script>

<style lang="scss" scoped>
#book {
  width: 100%;
  height: 100%;
  padding: 40px;
  .container {
    display: flex;
    justify-content: flex-start;
    .el-card {
      margin: 16px;
      display: flex;
      justify-content: center;
      width: 240px;
      padding: 15px;
      cursor: pointer;
      &:hover .name {
        text-decoration: underline;
      }
      img {
        height: 240px;
      }
      .name {
        font-size: 20px;
        font-weight: 600;
      }
      .describe {
        font-size: 14px;
      }
      hr {
        color: #ccc;
        margin: 5px 0;
      }
    }
  }
}
</style>
