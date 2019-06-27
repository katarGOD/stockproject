// import
import { requiresLogin } from './requiresLogin'
import store from '../store'
import { isLoggedIn } from './isLoggedIn'
import { check } from 'is-offline'
import { hasPermission } from './hasPermission'

// export
export default [
  { path: '/',
    component: () => import('layouts/default'),
    beforeEnter: async (to, from, next) => {
      store.commit('setRequestUrl', to.path)
      check().then(function (offline) {
        if (offline) { next('/offline') } else { next() }
      })
    },
    children: [
      // home
      { path: '',
        component: () => import('pages/index'),
        beforeEnter: (to, from, next) => requiresLogin(next)
      },
      // dashboard
      { path: 'dashboard',
        component: () => import('pages/dashboard'),
        beforeEnter: (to, from, next) => requiresLogin(next)
      },
      // login
      { path: 'login',
        component: () => import('pages/auth/login'),
        beforeEnter: async (to, from, next) => {
          let isLog = await isLoggedIn()
          if (isLog) { next('/') } else { next() }
        }
      },
      // auth
      { path: 'auth',
        component: () => import('pages/auth/index'),
        children: [
          // signup
          { path: 'signup',
            component: () => import('pages/auth/signup/index'),
            redirect: '/auth/signup/email',
            children: [
              { path: 'email',
                component: () => import('pages/auth/signup/email'),
                beforeEnter: async (to, from, next) => {
                  let isLog = await isLoggedIn()
                  if (isLog) { next('/') } else { next() }
                }
              },
              { path: 'phone',
                component: () => import('pages/auth/signup/phone'),
                beforeEnter: async (to, from, next) => {
                  let isLog = await isLoggedIn()
                  if (isLog) { next('/') } else { next() }
                }
              }
            ]
          },
          // welcome
          { path: 'welcome',
            component: () => import('pages/auth/welcome'),
            beforeEnter: async (to, from, next) => {
              let isLog = await isLoggedIn()
              if (isLog) { next() } else { next('/') }
            }
          },
          // logout
          { path: 'logout',
            component: () => import('pages/auth/logout'),
            beforeEnter: async (to, from, next) => {
              let isLog = await isLoggedIn()
              if (isLog) { next() } else { next('/') }
            }
          }
        ]
      },
      { path: 'forgot-password',
        component: () => import('pages/auth/forgotPassword/index'),
        children: [
          { path: 'otp',
            component: () => import('pages/auth/forgotPassword/otp'),
            beforeEnter: async (to, from, next) => {
              let isLog = await isLoggedIn()
              if (isLog) { next('/') } else { next() }
            }
          },
          { path: 'email',
            component: () => import('pages/auth/forgotPassword/emailForgot'),
            beforeEnter: async (to, from, next) => {
              let isLog = await isLoggedIn()
              if (isLog) { next('/') } else { next() }
            }
          }
        ]
      },
      // my-account
      { path: 'my-account',
        component: () => import('pages/my_account/index'),
        children: [
          // profile
          { path: 'profile/:id',
            component: () => import('pages/my_account/profile/index'),
            redirect: '/my-account/profile/:id/personal',
            beforeEnter: (to, from, next) => requiresLogin(next),
            children: [
              // personal
              { path: 'personal',
                component: () => import('pages/my_account/profile/personal'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // contact
              { path: 'contact',
                component: () => import('pages/my_account/profile/contact'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // official
              { path: 'official',
                component: () => import('pages/my_account/profile/official'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // allowance
              { path: 'allowance',
                component: () => import('pages/my_account/profile/allowance'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // deduction
              { path: 'deduction',
                component: () => import('pages/my_account/profile/deduction'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // incomeTax
              { path: 'income-tax',
                component: () => import('pages/my_account/profile/incomeTax'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // education
              { path: 'education',
                component: () => import('pages/my_account/profile/education'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // skill
              { path: 'skill',
                component: () => import('pages/my_account/profile/skill'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // training
              { path: 'training',
                component: () => import('pages/my_account/profile/training'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // experience
              { path: 'experience',
                component: () => import('pages/my_account/profile/experience'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              // leave
              { path: 'leave',
                component: () => import('pages/my_account/profile/leave'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              }
            ]
          },
          // change-password
          { path: 'change-password',
            component: () => import('pages/my_account/changePassword'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          // my-team
          { path: 'my-team',
            component: () => import('pages/my_account/myTeam'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          }
        ]
      },
      // auth
      { path: 'config',
        component: () => import('pages/config/index'),
        children: [
          { path: 'product-type',
            component: () => import('pages/config/productType'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          { path: 'stock-type',
            component: () => import('pages/config/stockType'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          { path: 'supplier',
            component: () => import('pages/config/supplier'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          }
        ]
      },
      { path: 'product-management',
        component: () => import('pages/productManagement/index'),
        children: [
          { path: 'product',
            component: () => import('pages/productManagement/product'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          { path: 'product-report',
            component: () => import('pages/productManagement/reports/product/index'),
            children: [
              { path: 'product-list',
                component: () => import('pages/productManagement/reports/product/productList'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              }
            ]
          }
        ]
      },
      { path: 'stock-management',
        component: () => import('pages/stockManagement/index'),
        children: [
          { path: 'po',
            component: () => import('pages/stockManagement/po'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          { path: 'withdraw',
            component: () => import('pages/stockManagement/withdraw'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          { path: 'stock-report',
            component: () => import('pages/stockManagement/reports/index'),
            children: [
              { path: 'po-list',
                component: () => import('pages/stockManagement/reports/po/poList'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              },
              { path: 'witdraw-list',
                component: () => import('pages/stockManagement/reports/witdraw/witdrawList'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              }
            ]
          }
        ]
      },
      { path: 'return-merchandise',
        component: () => import('pages/returnMer/index'),
        children: [
          { path: 'merchandise',
            component: () => import('pages/returnMer/merchandise'),
            beforeEnter: (to, from, next) => requiresLogin(next)
          },
          { path: 'merchandise-report',
            component: () => import('pages/returnMer/reports/returnmer/index'),
            children: [
              { path: 'merchandise-list',
                component: () => import('pages/returnMer/reports/returnmer/returnmerList'),
                beforeEnter: (to, from, next) => requiresLogin(next)
              }
            ]
          }
        ]
      },
      // users & permissions
      { path: 'access-control/user-accounts',
        component: () => import('pages/access_control/userAccounts'),
        beforeEnter: (to, from, next) => hasPermission(['access-control--user-accounts'], next, to)
      },
      { path: 'access-control/roles',
        component: () => import('pages/access_control/roles'),
        beforeEnter: (to, from, next) => hasPermission(['access-control--user-roles'], next, to)
      },
      { path: 'access-control/permissions',
        component: () => import('pages/access_control/permissions'),
        beforeEnter: (to, from, next) => hasPermission(['access-control--user-permissions'], next, to)
      }
    ]
  },
  // offline
  {
    path: '/offline',
    component: () => import('pages/offline')
  },
  // 403
  {
    path: '/403',
    component: () => import('pages/403')
  },
  // 404
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
