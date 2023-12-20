// Composables
import { createRouter, createWebHistory } from 'vue-router';
import { hasPermission } from '../plugins/permissions';
import { isAuthenticated } from '@/middlewares/auth';

//Layout:
const DefaultLayout = () => import('@/layouts/default/Default.vue');
const PublicLayout = () => import('@/layouts/public/Public.vue');

// Public components:
const Login = () => import('@/views/pages/Login.vue');
// // const Register = () => import("@/views/pages/Register.vue");
const Page404 = () => import('@/views/pages/Page404.vue');

// Default Components:
const Users = () => import('@/views/Users.vue');
const Roles = () => import('@/views/Roles.vue');
// const Devices = () => import('@/views/Devices.vue');
// const Sites = () => import('@/views/Sites.vue');
// const Protocols = () => import('@/views/Protocols.vue');

function checkPermission(action: string, resource: string) {
  return (to: any, from: any, next: any) => {
    if (hasPermission(action, resource)) {
      next();
    } else {
      next('/404');
    }
  };
}

const routes = [
  {
    path: '/',
    name: 'System',
    redirect: '/login',
    component: DefaultLayout,
    children: [
      {
        path: '/roles',
        name: 'Roles',
        component: Roles,
        beforeEnter: checkPermission('access', 'roles'),
        meta: { public: false }
      },
      {
        path: '/users',
        name: 'Users',
        component: Users,
        beforeEnter: checkPermission('access', 'users'),
        meta: { public: false }
      },

      // {
      //   path: "/devices",
      //   name: "Devices",
      //   component: Devices,
      //   beforeEnter: checkPermission("access", "devices"),
      //   meta: { public: false },
      // },

      // {
      //   path: "/sites",
      //   name: "Sites",
      //   component: Sites,
      //   beforeEnter: checkPermission("access", "sites"),
      //   meta: { public: false },
      // },

      // {
      //   path: "/protocols",
      //   name: "Protocols",
      //   component: Protocols,
      //   beforeEnter: checkPermission("access", "protocols"),
      //   meta: { public: false },
      {
        path: '/:notFound',
        name: 'notFound',
        component: Page404,
        meta: { public: true }
      }
    ]
  },
  {
    path: '/',
    redirect: '/404',
    name: 'Pages',
    component: PublicLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { public: true }
      },
      // // {
      // //   path: "/register",
      // //   name: "Register",
      // //   component: Register,
      // //   meta: { public: true },
      // // },
      {
        path: '/:notFound',
        name: 'notFound',
        component: Page404,
        meta: { public: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  const isAuth = await isAuthenticated();

  if (to.meta.public && isAuth) {
    next({ name: 'Users' });
  } else if (!to.meta.public && !isAuth) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
