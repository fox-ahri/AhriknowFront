<template>
  <div id="edit" class="edit">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
      <h1>edit</h1>

    <li v-for="i in cigs" :key="i.col1">{{ i.col2 }}</li>

  </div>
</template>

<script>
export default {
  name: 'edit',
  methods: {
    goBack() {}
  }
}
</script>

<style lang="scss" scoped>
#edit {
  width: 100%;
  height: 100%;
}
</style>
