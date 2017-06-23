import Vue from 'vue'
import Router from 'vue-router'

const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}

const Home = (resolve) => {
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}

const People = (resolve) => {
  import('@/components/nav1/people').then((module) => {
    resolve(module)
  })
}

const Form = (resolve) => {
  import('@/components/nav1/form').then((module) => {
    resolve(module)
  })
}

const Transfer = (resolve) => {
  import('@/components/nav2/transfer').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      hiden: true
    },
    {
      path: '/',
      name: '导航一',
      component: Home,
      children: [
        {
          path: '/people',
          component: People,
          name: '人员'
        },
        {
          path: '/form',
          component: Form,
          name: '表单'
        }
      ]
    },
    {
      path: '/',
      name: '导航二',
      component: Home,
      children: [
        {
          path: '/transfer',
          component: Transfer,
          name: '穿梭'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
