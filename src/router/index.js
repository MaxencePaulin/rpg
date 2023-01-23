import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import StreetsView from '../components/StreetsView.vue'
import ShopsView from '../components/ShopsView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/towns',
        name: 'towns',
        components: {
            central: TownsView
        },
        children: [
            {
                path: ':idtown',
                name: 'streets',
                components: {
                    streets: StreetsView
                },
                props: {
                    streets: route => ({ idTown: route.params.idtown })
                },
                children: [
                    {
                        path: 'street/:idstreet',
                        name: 'shops',
                        components: {
                            shops: ShopsView
                        },
                        props: {
                            shops: route => ({ idTown: route.params.idtown, idStreet: route.params.idstreet })
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/persos',
        name: 'persos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            central: () => import(/* webpackChunkName: "about" */ '../views/PersosView.vue')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
