<template>
  <div id="index" class="index">
    <nav>
      <span class="logo" @click="$router.push('/')">AHRIKNOW</span>
      <router-link to="/book">Notebook</router-link>
      <router-link to="/tools">Tools</router-link>
      <router-link class="console" to="/admin">控制台</router-link>
    </nav>
    <section>
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  nav {
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
    height: 100%;
    padding-top: 60px;
    overflow: auto;
  }
}
</style>
