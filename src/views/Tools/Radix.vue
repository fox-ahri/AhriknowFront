<template>
  <div id="tools-radix" class="tools-radix">
    <el-card class="radix">
      <div class="opera">
        <el-select v-model="value" placeholder="请选择进制">
          <el-option
            v-for="i in 36"
            :key="i"
            :label="'添加 ' + i + ' 进制'"
            :value="i"
            v-if="[1,2,8,10,16].indexOf(i)<0"
          ></el-option>
        </el-select>
        <el-button @click="add">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column align="center" label="进制" width="180">
          <template slot-scope="scope">{{scope.row.radix}}</template>
        </el-table-column>
        <el-table-column label="值">
          <template slot-scope="scope">
            <el-input
              autocomplete="off"
              v-model="scope.row.num"
              placeholder="请输入数值"
              @change="radix(scope.row.radix, scope.row.num)"
              @input="valid($event, scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="删除" width="100">
          <template slot-scope="scope">
            <el-button
              @click="list = list.filter(item => item.radix != scope.row.radix)"
              v-if="scope.row.del"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tools-radix',
  data () {
    return {
      value: 36,
      list: [
        {
          radix: 2,
          num: 1,
          del: false
        },
        {
          radix: 8,
          num: 1,
          del: false
        },
        {
          radix: 10,
          num: 1,
          del: false
        },
        {
          radix: 16,
          num: 1,
          del: false
        }
      ]
    }
  },
  methods: {
    add () {
      let flag = true
      this.list.forEach(item => {
        if (item.radix == this.value)
          flag = false
      })
      if (flag) {
        let n10 = parseInt(this.list[0].num, this.list[0].radix)
        this.list.push({
          radix: this.value,
          num: n10.toString(this.value),
          del: true
        })
      } else {
        this.$message({
          message: '不要重复添加',
          type: 'warning'
        });
      }
    },
    valid (e, item) {
      let r = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      let s = ''
      e = e.toString()
      for (let i = 0; i < e.length; i++) {
        if (r.indexOf(e[i].toLowerCase()) < item.radix) {
          s += e[i].toLowerCase()
        }
      }
      item.num = s
    },
    radix (radix, num) {
      let n10 = parseInt(num, radix)
      this.list.forEach(item => {
        item.num = n10.toString(item.radix)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#tools-radix {
  width: 100%;
  height: 100%;
  padding: 40px;
}
</style>
