<template>
  <el-row class="content">
    <el-col :span="24" class="header">
      <el-col :span="4" class="logo">系统-<span>{{$route.name}}</span></el-col>
      <el-col :span="10">
        <div class="tools" @click="toggleMenu">
          <i class="el-icon-menu"></i>
        </div>
      </el-col>
      <el-col :span="6" class="user">
        <el-dropdown :hide-on-click="true">
          <span class="el-dropdown-link">
            用户<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">已删除
              <el-badge class="mark" :value="deleteCount"/>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24">
      <transition name="left-slide">
        <aside class="left-part" v-show="showMenuFlag">
          <el-menu :default-active="$route.path"
                   class="el-menu-vertical-demo"
                   unique-opened
                   router>
            <template v-for="(item, index) in $router.options.routes" v-if="!item.hiden">
              <el-submenu :index="index+''">
                <template slot="title">{{item.name}}</template>
                <el-menu-item
                  v-for="child in item.children"
                  :index="child.path"
                  :key="child.path">{{child.name}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </aside>
      </transition>

      <section class="right-part" :class="{full: !showMenuFlag}">
        <el-col :span="24">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </section>
    </el-col>
  </el-row>
</template>
<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(ElementUI)
  export default {
    data() {
      return {
        showMenuFlag: true
      }
    },
    computed: {
      ...mapGetters(['deleteCount'])
    },
    created() {
      console.log(this.deleteCount)
    },
    methods: {
      logout() {
        console.log(this.$router)
        sessionStorage.removeItem('user')
        this.$router.push({path: '/login'})
      },
      toggleMenu() {
        console.log(this.showMenuFlag)
        this.showMenuFlag = !this.showMenuFlag
      }
    },
    watch: {
      deleteCount(val) {
        console.log(val)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/common/stylus/base'
  @import '~@/common/stylus/mixin'
  .el-dropdown-link
    cursor: pointer
    color: white

  .content
    position: absolute
    top: 0px
    bottom: 0px
    width: 100%
    .header
      height: 60px
      line-height: 60px
      background-color: $blue
      color: white
      .logo
        font-size: $larger
        padding-left: 20px
        width: 230px
        border-right: 1px solid $blue-light
        span
          font-size: $medium
      .tools
        padding: 0px 23px
        width: 14px
        height: 60px
        line-height: 60px
        cursor: pointer
      .user
        float: right
        width: 140px
        padding-left: 10px

  .left-part
    position: fixed;
    top: 60px;
    left: 0px;
    bottom: 0px;
    height: 100%;
    width: 230px;
    overflow: auto;
    background-color: #e4e8f1;

  .right-part
    padding: 20px
    margin-left: 230px
    overflow-y: auto
    position: absolute
    right: 0
    left: 0
    top: 60px
    bottom: 0
    transition:margin-left .5s
    -moz-transition:margin-left .5s
    -webkit-transition:margin-left .5s
    -o-transition:margin-left .5s
    &.full
      margin-left: 0px

  .mark
    margin-bottom: 6px

  .left-slide-enter-active, .left-slide-leave-active
    transition: all .5s

  .left-slide-enter, .left-slide-leave-to
    width: 0px


</style>
