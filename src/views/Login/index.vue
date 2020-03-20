<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">4G T-Box 环保车联网管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button class="buggon" slot="prepend" icon="el-icon-lx-people">用户名</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
            <el-button class="buggon" slot="prepend" icon="el-icon-lx-lock">  密&nbsp;&nbsp;&nbsp;码  </el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click.native.prevent="submitForm()">登录</el-button>
        </div>
        <p class="login-tips"></p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  data: function () {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      param: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能小于5位', trigger: 'blur', validator: validatePass }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          login(this.param.username, this.param.password).then(res => {
            console.log(res.data.token)
            if (res.data.success) {
              this.$message.success('登录成功')
              sessionStorage.setItem('ms_token', res.data.token)// token
              this.$router.push('/')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.error('请输入账号和密码')
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.buggon {
  color: #ffffff;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.png);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  right: 20%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
