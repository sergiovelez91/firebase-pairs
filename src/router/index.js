import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LogOut from '../components/LogOut.vue'
import Login from '../components/Login.vue'
import SignIn from '../components/SignIn.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter ({
  routes: [
    {
      path: '*',
      redirect: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  // Hay usuario?
  let currentUser = firebase.auth().currentUser
  console.log(currentUser)
  // Hay autenticacion?
  let auth = to.matched.some(match => match.meta.requiresAuth)

  if(auth && !currentUser) {
    next('login')
  }
  else if (!auth && currentUser) {
    next('home')
  }
  else {
    next()
  }
  
})

export default router
