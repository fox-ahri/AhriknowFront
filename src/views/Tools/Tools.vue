<template>
  <div id="tools" class="tools">
    <aside class="aside">
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        active-text-color="rgb(25, 144, 204)"
        router
      >
        <el-menu-item index="/index">
          <i class="iconfont icon-index"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/tools/secrecy">
          <i class="iconfont icon-wendangjiami"></i>
          <span slot="title">字符加密</span>
        </el-menu-item>
        <el-menu-item index="/tools/image">
          <i class="iconfont icon-tupian"></i>
          <span slot="title">占位图片</span>
        </el-menu-item>
        <!-- <el-menu-item index="4">
          <i class="iconfont icon-wulianwang-ocr"></i>
          <span slot="title">文字识别</span>
        </el-menu-item>-->
      </el-menu>
    </aside>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: 'tools',
  data() {
    return {
      active: '/tools/welcome'
    }
  },
  created() {
    this.active = this.$route.path
  }
}
</script>

<style lang="scss" scoped>
#tools {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .aside {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 240px;
    .el-menu {
      height: 100%;
      i {
        font-size: 20px;
        margin-right: 10px;
        color: #333;
      }
    }
  }
  .section {
    position: absolute;
    left: 250px;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
}
</style>
