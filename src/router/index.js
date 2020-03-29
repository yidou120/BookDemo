import Vue from 'vue'
import VueRouter from 'vue-router'
import BookManage from '../views/BookManage'
import AddBook from '../views/AddBook'
import Index from '../views/Index'
import Update from '../views/Update'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    show: true,
    name: '图书管理',
    component: Index,
    redirect: '/manage',
    children: [
      {
        path: '/manage',
        name: '查询图书',
        component: BookManage
      },
      {
        path: '/add',
        name: '新增图书',
        component: AddBook
      }
    ]
  },
  {
    show: false,
    path: '/update',
    component: Update
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
