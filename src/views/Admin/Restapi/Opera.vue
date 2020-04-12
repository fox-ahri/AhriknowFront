<template>
  <div
    id="opera"
    class="opera"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="title">
      <h2>路由操作</h2>
    </div>
    <el-divider></el-divider>
    <div class="container">
      <el-card v-for="i in operaList" :key="i.id">
        <div class="var" v-if="i.type == 'var'">
          <div class="item" v-for="j in i.vars" :key="j.id">
            <el-button @click="i.vars = i.vars.filter(v => v.id != j.id)">删除</el-button>
            <el-select v-model="j.type" placeholder="变量类型">
              <el-option label="Function" value="function"></el-option>
              <el-option label="Header" value="header"></el-option>
              <el-option label="Request" value="request"></el-option>
              <el-option label="String" value="string"></el-option>
              <el-option label="Int" value="int"></el-option>
              <el-option label="Float" value="float"></el-option>
              <el-option label="Array" value="array"></el-option>
              <el-option label="Json" value="json"></el-option>
            </el-select>
            <el-select v-model="j.value" placeholder="选择函数" v-show="j.type == 'function'">
              <el-option label="Time" value="time"></el-option>
              <el-option label="UUID" value="uuid"></el-option>
              <el-option label="Short UUID" value="suuid"></el-option>
            </el-select>
            <el-input v-model="j.key" placeholder="请输入变量名"></el-input>
            <el-input v-model="j.value" placeholder="请输入变量值" v-show="j.type != 'function'"></el-input>
            <el-select
              v-model="j.default_type"
              placeholder="变量默认类型"
              v-show="j.type == 'request' || j.type == 'header'"
            >
              <el-option label="报错" value="error"></el-option>
              <el-option label="空" value="null"></el-option>
              <el-option label="String" value="string"></el-option>
              <el-option label="Int" value="int"></el-option>
              <el-option label="Float" value="float"></el-option>
              <el-option label="Array" value="array"></el-option>
              <el-option label="Json" value="json"></el-option>
            </el-select>
            <el-input
              v-model="j.default"
              placeholder="变量默认值"
              v-show="(j.type == 'request' || j.type == 'header') && j.default_type != 'error' && j.default_type != 'null'"
            ></el-input>
          </div>
          <el-button @click="i.vars.push(get_new_var())">添加</el-button>
        </div>
        <div class="mysql" v-else-if="i.type == 'mysql'">
          <div class="opera">
            <el-select v-model="i.db" placeholder="选择数据库">
              <el-option
                v-for="db in dbs.filter(d => d.type == 'mysql')"
                :key="db.id"
                :label="db.dbname"
                :value="db.id"
              ></el-option>
            </el-select>
            <el-select v-model="i.data_type" placeholder="变量类型">
              <el-option label="空" value="null"></el-option>
              <el-option label="Array" value="array"></el-option>
              <el-option label="Json" value="json"></el-option>
            </el-select>
            <el-input v-model="i.var" placeholder="请输入变量名" v-show="i.data_type != 'null'"></el-input>
            <br />
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入 sql"
            v-model="i.sql"
          ></el-input>
        </div>
        <div class="mongo" v-else-if="i.type == 'mongo'">
          <div class="opera">
            <el-select v-model="i.db" placeholder="选择数据库">
              <el-option
                v-for="db in dbs.filter(d => d.type == 'mongo')"
                :key="db.id"
                :label="db.dbname"
                :value="db.id"
              ></el-option>
            </el-select>
            <el-input v-model="i.collection" placeholder="请输入集合名"></el-input>
            <el-select v-model="i.function" placeholder="选择操作方法">
              <el-option label="find" value="find"></el-option>
              <el-option label="findOne" value="find_one"></el-option>
              <el-option label="insert" value="insert"></el-option>
              <el-option label="insertOne" value="insert_one"></el-option>
              <el-option label="insertMant" value="insert_many"></el-option>
              <el-option label="remove" value="remove"></el-option>
              <el-option label="update" value="update"></el-option>
            </el-select>
            <el-select v-model="i.data_type" placeholder="变量类型">
              <el-option label="空" value="null"></el-option>
              <el-option label="Array" value="array"></el-option>
              <el-option label="Json" value="json"></el-option>
            </el-select>
            <el-input v-model="i.var" placeholder="请输入变量名" v-show="i.data_type != 'null'"></el-input>
            <br />
          </div>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入 sql"
            v-model="i.sql"
          ></el-input>
        </div>
        <el-button
          class="delete"
          type="danger"
          @click="operaList = operaList.filter(opera => opera.id != i.id)"
          plain
          icon="el-icon-close"
        ></el-button>
      </el-card>
      <el-card>
        <div class="return">
          <el-select v-model="ret.type" placeholder="变量类型">
            <el-option label="String" value="string"></el-option>
            <el-option label="Json" value="json"></el-option>
          </el-select>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入 sql"
            v-model="ret.data"
          ></el-input>
        </div>
      </el-card>
    </div>
    <div class="add-opera">
      <el-select v-model="newOperaType" placeholder="请选择操作类型">
        <el-option label="Var" value="var"></el-option>
        <el-option label="Mysql" value="mysql"></el-option>
        <el-option label="Mongo" value="mongo"></el-option>
      </el-select>
      <el-button @click="handlerAddOpera">添加</el-button>
      <el-button type="primary" @click="handlerSave">保存</el-button>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'opera',
  data() {
    return {
      newOperaType: 'var',
      operaList: [],
      ret: {
        type: 'string',
        data: ''
      },
      loading: false,
      opera: {},
      dbs: []
    }
  },
  methods: {
    get_new_var() {
      return {
        id: new Date().getTime(),
        type: '',
        key: '',
        value: '',
        default_type: '',
        default: ''
      }
    },
    handlerAddOpera() {
      switch (this.newOperaType) {
        case 'var':
          this.operaList.push({
            id: new Date().getTime(),
            type: 'var',
            vars: [
              {
                id: new Date().getTime(),
                type: 'json',
                key: 'data',
                value: '{"k": "v"}',
                default_type: 'error',
                default: ''
              }
            ]
          })
          break
        case 'mysql':
          this.operaList.push({
            id: new Date().getTime(),
            db: '',
            type: 'mysql',
            sql: 'SELECT * FROM table_name',
            data_type: 'null',
            var: ''
          })
          break
        case 'mongo':
          this.operaList.push({
            id: new Date().getTime(),
            db: '',
            type: 'mongo',
            collection: '',
            function: '',
            sql: '',
            data_type: 'null',
            var: ''
          })
          break
      }
    },
    handlerSave() {
      this.operaList.forEach(opera => {
        if(opera.type == 'mysql' || opera.type == 'mongo'){
          opera.db = this.dbs.filter(db => db.id == opera.db)[0]
        }
      })
      this.opera.opera_list = this.operaList
      this.opera.return = this.ret
      this.loading = true
      this.axios
        .put(
          `${this.url}/admin/restapi/opera/${this.$route.query.id}/`,
          this.opera
        )
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.$router.go(-1)
            this.dialogVisible = false
          } else {
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_opera(id) {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/restapi/opera/${id}/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.opera = res.data.data
            this.operaList = res.data.data.opera_list
            this.ret = res.data.data.return
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    get_dbs() {
      this.loading = true
      this.axios
        .get(`${this.url}/admin/database/db/`)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.dbs = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  },
  mounted() {
    this.get_dbs()
    this.get_opera(this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
#opera {
  width: 100%;
  height: 100%;
  padding: 40px;
  .container {
    .el-card {
      margin: 10px 0;
      position: relative;
      &:hover .delete {
        display: block;
      }
      .delete {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
      }
    }
    .var {
      .item {
        display: flex;
        margin: 5px 0;
        .el-select,
        .el-input {
          width: 140px;
        }
      }
    }
    .mysql,
    .mongo {
      .opera {
        display: flex;
        .el-select,
        .el-input {
          width: 180px;
        }
      }
    }
  }
  .bottom {
    height: 300px;
  }
}
</style>
