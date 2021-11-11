import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import RutasViaje from 'src/pages/rutasViaje.vue'
import Notifications from 'src/pages/Notifications.vue'

import Wabtec from 'src/pages/WabtecData.vue';

import Login from 'src/pages/Login.vue';
import Singup from 'src/pages/singup.vue';

const routes = [{
        path: '/',
        component: DashboardLayout,
        redirect: '/admin/overview'
    },

    {
        path: '/login',
        component: Login,
        redirect: 'admin/login'
    },
    {
        path: '/singup',
        component: Singup,
        redirect: '/singup'
    },
    {
        path: '/admin',
        component: DashboardLayout,
        redirect: '/admin/overview',
        children: [{
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'singup',
                name: 'singup',
                component: Singup
            },
            {
                path: 'overview',
                name: 'Overview',
                component: Overview
            },
            {
                path: 'user',
                name: 'User',
                component: UserProfile
            },
            {
                path: 'table-list',
                name: 'Table List',
                component: TableList
            },
            {
                path: 'typography',
                name: 'Typography',
                component: Typography
            },
            {
                path: 'icons',
                name: 'Icons',
                component: Icons
            },
            {
                path: 'trayectos',
                name: 'Trayectos',
                component: Maps
            },
            {
                path: 'rutasViaje',
                name: 'Rutas Viaje',
                component: RutasViaje
            },
            {
                path: 'notifications',
                name: 'Notifications',
                component: Notifications
            },
            {
                path: 'wabtecdata',
                name: 'Wabtec Data',
                component: Wabtec
            }
        ]
    },
    { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes