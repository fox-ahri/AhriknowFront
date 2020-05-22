<template>
  <div
    id="dbms-mysql"
    class="dbms-mysql"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="left">
      <div class="head">
        <h1>MYSQL</h1>
      </div>
      <div class="panel"></div>
      <div class="table">
        <el-table :data="dbs" style="width: 100%" size="small" :show-header="false" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.tables"
                style="width: 100%"
                size="small"
                :show-header="false"
                border
                @row-click="view($event, props.row)"
              >
                <el-table-column>
                  <template slot-scope="scope">{{scope.row[0]}}</template>
                </el-table-column>
                <el-table-column width="80" align="center">
                  <template slot-scope="scope">
                    <div class="opera">
                      <i class="el-icon-delete"></i>
                      <i class="el-icon-view" @click.stop="view(scope.row, props.row)"></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="Database"></el-table-column>
          <el-table-column width="50" align="center">
            <template slot-scope="scope">
              <i class="el-icon-delete"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="title"></div>
      <div class="content">
        <iframe :src="src" width="100%" height="100%" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dbms-mysql',
  data () {
    return {
      mysql: '',
      loading: false,
      default_sqls: [
        'show databases;'
      ],
      dbs: [],
      currentPage: 1,
      data: [],
      src: ''
    }
  },
  methods: {
    handleSizeChange () { },
    handleCurrentChange () { },
    view (v1, v2) {
      this.src = `/#/mysql/table?db=${v2.Database}&tb=${v1[0]}&t=${this.mysql}`
    },
    delete_db (db) {
      console.log(db)
    },
    exec (sqls, func = res => { }, d = false) {
      this.loading = true
      this.axios.post('http://127.0.0.1:5000/dbms/exec', {
        token: this.mysql,
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
    this.mysql = localStorage.getItem('mysql')
    this.exec(this.default_sqls, res => {
      this.dbs = res[0]
    }, true)
  }
}
</script>

<style lang="scss" scoped>
#dbms-mysql {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 340px;
    // position: fixed;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 4px #ccc;
    position: relative;
    .head {
      z-index: 99;
      height: 120px;
      line-height: 120px;
      text-align: center;
      box-shadow: 0 2px 4px #ccc;
    }
    .panel {
      position: absolute;
      width: 12px;
      top: 0;
      right: 0;
      bottom: 0;
      background: #fff;
    }
    .table {
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 10px;
      i {
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: #f56c6c;
        }
      }
      .opera {
        display: flex;
        justify-content: space-around;
        i {
          font-size: 16px;
          cursor: pointer;
          &:hover {
            color: #66ccff;
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 4px #ccc;
    .title {
      height: 120px;
      box-shadow: 0 2px 4px #ccc;
    }
    .content {
      flex: 1;
      // overflow-x: hidden;
      // overflow-y: scroll;
      padding: 12px;
      .page {
        text-align: right;
      }
    }
  }
}
</style>