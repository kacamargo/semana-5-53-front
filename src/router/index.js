import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'About',
    component: About,
    meta: {
      public: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login', //nombre de la vista
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/segura',
    name: 'Segura', //nombre de la vista
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Segura.vue'),
    meta: {
      auth: true
      // public: true
    },
    children: [
      {
        path: 'categorias',
        name: 'Categoria', //nombre de la vista
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Categoria.vue'),
        meta: {
          auth: true
          // public: true
        }
      },
      {
        path: 'articulos',
        name: 'Articulo', //nombre de la vista
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Articulo.vue'),
        meta: {
          auth: true
          // public: true
        }
      },
      {
        path: 'usuarios',
        name: 'Usuario', //nombre de la vista
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Usuario.vue'),
        meta: {
          auth: true
          // public: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  if (to.matched.some (destinoRequiereAuth => destinoRequiereAuth.meta.auth)) {
    if (localStorage.getItem( 'token')) {
      next()
    } else {
      next( {
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
