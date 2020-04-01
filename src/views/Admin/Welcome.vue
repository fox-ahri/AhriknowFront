<template>
  <div
    id="welcome"
    class="welcome"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card>
      <ve-line :data="chartData1" :data-zoom="dataZoom"></ve-line>
    </el-card>
    <div class="line">
      <el-card>
        <ve-histogram :data="chartData2"></ve-histogram>
      </el-card>
      <el-card>
        <ve-gauge :data="chartData3" :settings="chartSettings"></ve-gauge>
      </el-card>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data() {
    return {
      loading: false,
      chartData1: {
        columns: ['日期', '成本', '利润'],
        rows: [
          { 日期: '1月1日', 成本: 15, 利润: 12 },
          { 日期: '1月2日', 成本: 12, 利润: 25 },
          { 日期: '1月3日', 成本: 21, 利润: 10 },
          { 日期: '1月4日', 成本: 41, 利润: 32 },
          { 日期: '1月5日', 成本: 31, 利润: 30 },
          { 日期: '1月6日', 成本: 71, 利润: 55 },
          { 日期: '1月7日', 成本: 12, 利润: 25 },
          { 日期: '1月8日', 成本: 21, 利润: 10 },
          { 日期: '1月9日', 成本: 41, 利润: 32 },
          { 日期: '1月10日', 成本: 31, 利润: 30 },
          { 日期: '1月11日', 成本: 71, 利润: 55 },
          { 日期: '1月12日', 成本: 12, 利润: 25 },
          { 日期: '1月13日', 成本: 21, 利润: 10 },
          { 日期: '1月14日', 成本: 41, 利润: 32 },
          { 日期: '1月15日', 成本: 31, 利润: 30 },
          { 日期: '1月16日', 成本: 71, 利润: 55 }
        ]
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 20
        }
      ],
      chartData2: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      chartSettings: {
        dataType: {
          占比: 'percent'
        },
        seriesMap: {
          占比: {
            min: 0,
            max: 1
          }
        }
      },
      chartData3: {
        columns: ['type', 'value'],
        rows: [{ type: '占比', value: 0.8 }]
      }
    }
  },
  created() {
    this.loading = true
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 800)
  }
}
</script>

<style lang="scss" scoped>
#welcome {
  width: 100%;
  height: 100%;
  padding: 30px;
  .line {
    margin: 30px 0;
    display: flex;
    .el-card {
      flex: 0.5;
    }
  }
  .bottom {
    height: 120px;
  }
}
</style>
