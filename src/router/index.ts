import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import statistics from "@/views/Statistics.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/statistics'
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: statistics
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/Chart.vue')
  },
  {
    path: '/saveMoney',
    name: 'saveMoney',
    component: () => import('../views/SaveMoney.vue')
  },
  {
    path: '/TagListPage',
    name: 'TagListPage',
    component: () => import('../components/SaveMoney/TagListPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
