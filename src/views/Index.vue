<template>
  <div id="index" class="index">
    <nav>
      <span class="logo">AHRIKNOW</span>
      <router-link to="/admin">控制台</router-link>
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
      float: right;
      transition: 0.3s;
      &:hover {
        color: #fffc;
      }
    }
  }
  section {
    height: 100%;
    padding-top: 70px;
    overflow: auto;
  }
}
</style>
