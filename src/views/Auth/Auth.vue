<template>
  <div
    id="auth"
    class="auth"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="box">
      <input type="radio" v-model="current" hidden name="tab" id="tab1" value="login" />
      <input type="radio" v-model="current" hidden name="tab" id="tab2" value="signup" />
      <input type="radio" v-model="current" hidden name="tab" id="tab3" value="forget" />
      <div class="item">
        <div class="account">
          <div class="login">
            <div class="container">
              <h1>SIGN IN</h1>
              <div class="to">
                <label class="label" for="tab2">sign up</label>
              </div>
              <input type="text" name="username" v-model="form.username" placeholder="Username" />
              <input
                type="password"
                name="password"
                v-model="form.password"
                placeholder="Password"
                @keyup.13="login"
              />
              <label class="label lbf" for="tab3">Forget Your Password!</label>
              <button @click="login">登录</button>
            </div>
          </div>
          <div class="signup">
            <div class="container">
              <h1>SIGN UP</h1>
              <div class="to">
                <label class="label" for="tab1">login</label>
              </div>
              <input type="text" name="username" v-model="reg.username" placeholder="Username" />
              <input type="password" name="password" v-model="reg.password" placeholder="Password" />
              <input
                type="password"
                name="re-pass"
                v-model="reg.re_pass"
                placeholder="Re password"
                @keyup.13="signup"
              />
              <button @click="signup">注册</button>
            </div>
          </div>
        </div>
        <div class="account">
          <div class="forget">
            <div class="container">
              <h1>RESET PASSWORD</h1>
              <div class="to">
                <label class="label" for="tab1">login</label>
              </div>
              <input type="text" name="username" v-model="reg.username" placeholder="Username" />
              <input type="password" name="password" v-model="reg.password" placeholder="Password" />
              <input
                type="password"
                name="re-pass"
                v-model="reg.re_pass"
                placeholder="Re password"
                @keyup.13="signup"
              />
              <button>确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'auth',
  data () {
    return {
      current: 'login',
      opera: false,
      form: {
        username: '',
        password: ''
      },
      reg: {
        username: '',
        password: '',
        re_pass: ''
      },
      loading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let tmp = []
      for (let k in from.query) {
        tmp.push(k + '=' + from.query[k])
      }
      if (tmp.length > 0) {
        localStorage.setItem('from', from.path + '?' + tmp.join('&'))
      }
      else {
        localStorage.setItem('from', from.path)
      }
    })
  },
  methods: {
    change (val) {
      this.opera = val
    },
    login () {
      this.form.username = this.form.username.trim()
      this.form.password = this.form.password.trim()
      if (this.form.username.length <= 0) {
        this.$message.error('请输入用户名')
        return
      }
      if (this.form.password.length <= 0) {
        this.$message.error('请输入密码')
        return
      }
      this.loading = true
      this.axios
        .post(`${this.url}/login/`, this.form)
        .then(res => {
          if (res.data.code === 200) {
            this.$store.commit('token', res.data.data.token)
            this.$store.commit('userinfo', res.data.data)
            this.$router.push(localStorage.getItem('from') || '/')
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
    signup () {
      this.loading = true
      this.reg.username = this.reg.username.trim()
      this.reg.password = this.reg.password.trim()
      this.reg.re_pass = this.reg.re_pass.trim()
      if (this.reg.username.length <= 0) {
        this.$message.error('请输入用户名')
        return
      }
      if (this.reg.password.length <= 0) {
        this.$message.error('请输入用密码')
        return
      }
      if (this.reg.re_pass.length <= 0) {
        this.$message.error('请输入确认密码')
        return
      }
      if (this.reg.re_pass != this.reg.password) {
        this.$message.error('两次密码不一致')
        return
      }
      this.loading = true
      this.axios
        .post(`${this.url}/signup/`, this.reg)
        .then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.current = 'login'
            this.form.username = this.reg.username
            this.reg = {
              username: '',
              password: '',
              re_pass: ''
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$w: 450px;
$h: 600px;

#auth {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f5f7;
  .label {
    cursor: pointer;
  }
  .lbf {
    color: #aaa;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      color: #777;
    }
  }
  .box {
    height: $h;
    width: $w;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22), 0 10px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    #tab1:checked {
      & + #tab2 + #tab3 + .item {
        margin-top: 0;
        margin-left: 0;
      }
    }
    #tab2:checked {
      & + #tab3 + .item {
        margin-top: 0;
        margin-left: -$w;
      }
    }
    #tab3:checked {
      & + .item {
        margin-top: -$h;
        margin-left: 0;
      }
    }
    .item {
      width: $w + $w;
      height: $h + $h;
      transition: 0.6s;
      margin-top: 0;
      margin-left: 0;
      .account {
        width: $w + $w;
        height: $h;
        display: flex;
        .login,
        .signup,
        .forget {
          height: $h;
          width: $w;
        }
        .container {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          background: white;
          h1 {
            font-size: 32px;
            margin: 10px 0;
          }
          input {
            width: 100%;
            margin: 14px 0;
            padding: 12px;
            background: #eee;
            border: none;
          }
          button {
            background: #ff4b2b;
            padding: 10px 50px;
            border: solid 1px transparent;
            border-radius: 20px;
            text-transform: uppercase;
            color: white;
            margin-top: 15px;
            transform: transform 80ms;
            outline: none;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background: #e93515;
            }
            &:active {
              transform: scale(0.95);
            }
          }
        }
        .login {
          .to {
            width: 100%;
            text-align: right;
          }
        }
        .signup {
          .to {
            width: 100%;
            text-align: left;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  #login-signup {
    .box {
      height: 100%;
      width: 100%;
      #tab1:checked {
        & + #tab2 + #tab3 + .item {
          margin-top: 0;
          margin-left: 0;
        }
      }
      #tab2:checked {
        & + #tab3 + .item {
          margin-top: 0;
          margin-left: -100%;
        }
      }
      #tab3:checked {
        & + .item {
          margin-top: -131.5%;
          margin-left: 0;
        }
      }
      .item {
        width: 200%;
        height: 200%;
        .account {
          width: 100%;
          height: 50%;
          .login,
          .signup,
          .forget {
            width: 50%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
