<!--
 * @Description: Project Index Page
 * @Author: Ahri
 * @Date: 2020-04-21 13:15:49
 * @LastEditTime: 2020-05-23 15:11:51
--> 
<template>
  <div id="index" class="index">
    <nav>
      <span class="logo" @click="$router.push('/')">AHRIKNOW</span>
      <router-link to="/view">View</router-link>
      <router-link :to="`/blog/index/article?_=${e(0)}`">Blog</router-link>
      <router-link to="/notebook/book">Notebook</router-link>
      <router-link to="/tools">Tools</router-link>
      <router-link to="/dbms/auth">DBMS</router-link>
      <router-link class="console" to="/admin">控制台</router-link>
    </nav>
    <el-menu
      class="el-menu-vertical-demo"
      mode="horizontal"
      menu-trigger="hover"
      background-color="#000c"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>AHRIKNOW</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('/view')">View</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push(`/blog/index/article?_=${e(0)}`)">Blog</el-menu-item>
        <el-menu-item index="1-3" @click="$router.push('/notebook/book')">Notebook</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('/tools')">Tools</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('/dbms/auth')">DBMS</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('/admin')">控制台</el-menu-item>
      </el-submenu>
    </el-menu>
    <section>
      <img src="../assets/bg.jpg" id="bg" ref="bg" />
      <img src="../assets/moon.png" id="moon" ref="moon" />
      <img src="../assets/mountain.png" id="mountain" ref="mountain" />
      <img src="../assets/road.png" id="road" ref="road" />
      <h2 id="text" ref="text">Ahri Know</h2>
    </section>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  mounted () {
    let bg = this.$refs.bg
    let moon = this.$refs.moon
    let mountain = this.$refs.mountain
    let road = this.$refs.road
    let text = this.$refs.text

    window.addEventListener('scroll', () => {
      let value = window.scrollY
      bg.style.top = value * 0.5 + 'px'
      moon.style.left = -value * 0.4 + 'px'
      mountain.style.top = -value * 0.15 + 'px'
      road.style.top = value * 0.15 + 'px'
      text.style.top = value * 1 + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  overflow: hidden;
  background-color: #0a2a43;
  min-height: 1500px;
  .el-menu {
    z-index: 11;
    display: none;
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
  }
  nav {
    z-index: 11;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #000c;
    line-height: 60px;
    padding: 0 100px;
    .logo {
      font-size: 22px;
      color: #fffc;
      cursor: pointer;
    }
    a {
      color: #fff9;
      text-decoration: none;
      transition: 0.3s;
      margin: 0 16px;
      &:hover {
        color: #fffc;
      }
    }
    .console {
      float: right;
    }
  }
  section {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  section:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top #0a2a43 transparent);
    z-index: 10;
  }
  section:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a2a43;
    z-index: 10;
    mix-blend-mode: color;
  }
  section img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  #text {
    position: relative;
    color: #ffffff;
    font-size: 8em;
    z-index: 1;
    text-align: center;
  }
  #road {
    z-index: 2;
  }
}

@media screen and (max-width: 1150px) {
  #index {
    .el-menu {
      display: block;
    }
    nav {
      display: none;
    }
    #moon {
      display: none;
    }
  }
}
</style>
