<template>
  <div id="opera" class="opera">
    <div class="title">
      <h2>路由操作</h2>
    </div>
    <el-divider></el-divider>
    <div class="container">
      <el-card v-for="i in operaList" :key="i.id">
        <div class="var" v-if="i.type == 'var'">
          <div class="item" v-for="j in i.vars" :key="j.id">
            <el-button @click="i.vars.pop(j)">删除</el-button>
            <el-select v-model="j.type" placeholder="变量类型">
              <el-option label="Request" value="request"></el-option>
              <el-option label="String" value="string"></el-option>
              <el-option label="Int" value="int"></el-option>
              <el-option label="Float" value="float"></el-option>
              <el-option label="Array" value="array"></el-option>
              <el-option label="Json" value="json"></el-option>
            </el-select>
            <el-input v-model="j.key" placeholder="请输入变量名"></el-input>
            <el-input v-model="j.value" placeholder="请输入变量值"></el-input>
            <el-select v-model="j.default_type" placeholder="变量默认类型" v-show="j.type == 'request'">
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
              v-show="j.type == 'request' && j.default_type != 'error' && j.default_type != 'null'"
            ></el-input>
          </div>
          <el-button @click="i.vars.push(get_new_var)">添加</el-button>
        </div>
        <div class="mysql" v-else-if="i.type == 'mysql'">
          <div class="opera">
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
          @click="operaList.pop(i)"
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
        type: 'json',
        data: '{"code": 200, "msg": ${key3}, "data": ${data}}'
      }
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
            type: 'mysql',
            sql: 'SELECT * FROM table_name',
            data_type: 'null',
            var: ''
          })
          break
        case 'mongo':
          this.operaList.push({
            id: new Date().getTime(),
            type: 'mongo',
            sql: 'db.collection_name.findAll()',
            data_type: 'null',
            var: ''
          })
          break
      }
    },
    handlerSave() {}
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
          width: 140px;
        }
      }
    }
  }
  .bottom {
    height: 300px;
  }
}
</style>
