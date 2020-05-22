<template>
  <div id="mysql-table" class="mysql-table">
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        background
      ></el-pagination>
    </div>
    <el-table :data="data" style="width: 100%" border>
      <el-table-column v-for="i, index in k" :label="i">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[index] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" disabled>编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'mysql-table',
  data () {
    return {
      currentPage: 1,
      data: [],
      k: []
    }
  },
  methods: {
    handleSizeChange () { },
    handleCurrentChange () { },
    exec (sqls, func = res => { }, d = false) {
      this.loading = true
      this.axios.post('http://127.0.0.1:5000/dbms/exec', {
        token: this.$route.query.t,
        sqls: sqls,
        default: d
      }).then(res => {
        this.loading = false
        func(res.data.data)
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    }
  },
  mounted () {
    let r = this.$route.query
    this.exec([`select * from ${r.db}.${r.tb}`], res => {
      console.log(res)
      let k = []
      let data = []
      res[0].forEach(row => {
        let tmp = []
        for (let i in row) {
          if (k.indexOf(i) < 0) {
            k.push(i)
          }
          tmp.push(row[i])
        }
        data.push(tmp)
      })
      this.k = k
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
#mysql-table {
  width: 100%;
  height: 100%;
}
</style>