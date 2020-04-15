<template>
  <div id="secrecy" class="secrecy">
    <el-tabs v-model="active" type="border-card">
      <el-tab-pane label="单向加密" name="first">
        <el-button
          v-for="i in type_1"
          :key="i"
          size="small"
          class="type"
          @click="rsa(i)"
        >{{i.toUpperCase()}}</el-button>
      </el-tab-pane>
      <el-tab-pane label="双向加密" name="second">
        <div class="line">
          <el-button size="small" class="type" @click="rsa('AES')">AES</el-button>
          <el-button size="small" class="type" @click="rsa('DES')">DES</el-button>
          <el-button size="small" class="type" @click="rsa('DES3')">DES3</el-button>
          <el-input v-model="key" size="small" class="type-k">
            <template slot="prepend">Key</template>
          </el-input>
        </div>
        <div class="line">
          <el-button size="small" class="type" @click="rsa('D-AES')">D-AES</el-button>
          <el-button size="small" class="type" @click="rsa('D-DES')">D-DES</el-button>
          <el-button size="small" class="type" @click="rsa('D-DES-3')">D-DES3</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="非对称加密" name="third">
        <div class="line">
          <el-button size="small" class="type" @click="rsa('rsa-k')">RES-KEY</el-button>
          <el-button size="small" class="type" @click="rsa('rsa-e')">RES-解密</el-button>
          <el-button size="small" class="type" @click="rsa('rsa-d')">RES-解密</el-button>
        </div>
        <div class="line">
          <el-input v-model="password" size="small" class="type-k" placeholder="可为空">
            <template slot="prepend">Key</template>
          </el-input>
          <el-input v-model="length" size="small" class="type-k">
            <template slot="prepend">Length</template>
          </el-input>
        </div>
        <div class="code">
          <el-input type="textarea" placeholder="Public Key" v-model="pub" rows="10" class="text"></el-input>
          <el-input type="textarea" placeholder="Private Key" v-model="pri" rows="10" class="text"></el-input>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-card>
      <div class="code">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="source"
          :rows="active == 'third'?'15':'27'"
          class="text"
        ></el-input>
        <div class="opera">
          <el-button icon="el-icon-d-arrow-left" @click="source = result"></el-button>
          <el-button icon="el-icon-d-arrow-right" @click="result = source"></el-button>
        </div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="result"
          :rows="active == 'third'?'15':'27'"
          class="text"
        ></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'secrecy',
  data() {
    return {
      active: 'first',
      pri: '',
      pub: '',
      key: '',
      password: '',
      length: '1024',
      source: '',
      result: '',
      type_1: [
        'md5',
        'sha1',
        'sha224',
        'sha256',
        'sha384',
        'sha512',
        'sha3_224',
        'sha3_256',
        'sha3_384',
        'sha3_512',
        'blake2b',
        'blake2s'
        // 'shake_128',
        // 'shake_256'
      ]
    }
  },
  methods: {
    rsa(type) {
      this.axios
        .post(`https://api.ahriknow.com/secrecy`, {
          type: type,
          key: this.key,
          password: this.password,
          text: this.source,
          pub_k: this.pub,
          pri_k: this.pri,
          length: this.length
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            if (res.data.data.constructor == Array) {
              this.pri = res.data.data[0]
              this.pub = res.data.data[1]
            } else {
              this.result = res.data.data
            }
          } else {
            this.$message.error('操作失败')
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#secrecy {
  width: 100%;
  height: 100%;
  padding: 40px;
  .el-tab-pane {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .line {
      width: 100%;
    }
    .type {
      width: 100px;
      margin: 10px;
    }
    .type-k {
      width: 340px;
      margin: 10px;
    }
  }
  .el-card {
    margin: 10px 0;
  }
  .code {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .text {
      margin: 10px;
    }
    .opera {
      width: 100px;
      display: flex;
      flex-direction: column;
      .el-button {
        margin: 10px 0;
      }
    }
  }
}
</style>
