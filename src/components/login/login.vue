<template>
  <div>
    <div class="container"></div>
    <form class="content">
      <div class="input-out">
        <input type="text" v-model.trim="name" class="input" @blur="varifyName" placeholder="请输入用户名">
      </div>
      <div class="errDanger" v-show="nameErr">请输入用户名</div>
      <div class="input-out">
        <input type="password" v-model="password" class="input" @blur="varifyPassword" placeholder="请输入密码">
      </div>
      <div class="errDanger" v-show="passwordErr">请输入密码</div>
      <div class="errMsg">{{errMsg}}</div>
      <div style="text-align: center">
        <button class="button" @click="onSubmit()" :disabled="loading">安全登录</button>
      </div>
    </form>
  </div>


</template>
<script>
  import {login} from '@/api/login'

  export default {
    data() {
      return {
        name: 'admin',
        password: 'admin',
        errMsg: '',
        nameErr: false,
        passwordErr: false,
        loading: false
      }
    },
    methods: {
      varifyName() {
        if (this.name == null || this.name === '') {
          this.nameErr = true
        } else {
          this.nameErr = false
        }
      },
      varifyPassword() {
        if (this.password == null || this.password === '') {
          this.passwordErr = true
        } else {
          this.passwordErr = false
        }
      },
      onSubmit() {
        this.varifyName()
        this.varifyPassword()
        if (this.nameErr || this.passwordErr) {
          return
        }
        this.errMsg = ''
        if (this.loading) {
          return
        }
        this.loading = true
        let param = {name: this.name, password: this.password}
        console.log(111)
        login(param).then((res) => {
          this.loading = false
          if (res.success) {
            sessionStorage.setItem('user', JSON.stringify(res.content))
            this.$router.push({path: '/people'})
          } else {
            this.errMsg = res.message
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/common/stylus/base.styl'
  .container
    height: 100%
    width: 100%
    position: absolute
    background-repeat: no-repeat
    background-image: url("./img.jpg")
    background-size: cover
    background-position: center;
    -webkit-filter: blur(10px)
    -moz-filter: blur(10px)
    -o-filter: blur(10px)
    -ms-filter: blur(10px)
    filter: blur(10px)
    z-index -1

  .content
    /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
    width: 300px
    padding: 35px 35px 15px 35px
    background: rgba(255, 255, 255, .8)
    border: 1px solid #eaeaea
    box-shadow: 0 0 25px #cac6c6
    position: absolute
    top: 50%
    left: 50%
    margin-top: -124px

  .input-out
    border: #c1cad4 1px solid
    border-radius: 6px
    padding-left: 20px
    margin-bottom: 20px
    .input
      line-height: 36px;
      width: 100%;
      display: inline-block;
      font-size: 14px;
      background: inherit
      outline: 0

  .button
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    border-width: 0px
    font-size: 14px;
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: 0;
    text-align: center;
    &[disabled]
      background-color $silver
      cursor: not-allowed

  .errDanger
    font-size: $small
    color $danger
    margin-top: -18px;
    margin-bottom: 12px;

  .errMsg
    margin-left 80px
    padding 10px 0
    color $danger
    font-size $regular
</style>
