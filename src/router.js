import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import SignUp from "./pages/SignUp";
import Landing from './pages/Landing.vue';
import Transaction from './pages/Transaction.vue';
import Login from './pages/Login.vue';
import Profile from './pages/Profile.vue';
import GoalsManager from "./pages/GoalsManager";
import ManageFinancialData from "./pages/ManageFinancialData";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import Comparison from './pages/Comparison.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';
Vue.use(Router);

const router = new Router({
	linkExactActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'index',
			components: {default: Index, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			}
		},
		{
			path: '/transaction',
			name: 'transaction',
			components: {default: Transaction, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/goals',
			name: 'goals-manager',
			components: {default: GoalsManager, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/landing',
			name: 'landing',
			components: {default: Landing, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			components: {default: Login, header: MainNavbar},
			props: {
				header: {colorOnScroll: 400}
			}
		},
		{
			path: '/profile',
			name: 'profile',
			components: {default: Profile, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/signup',
			name: 'signup',
			components: {default: SignUp, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			}
		},
		{
			path: '/managedata',
			name: 'manage-financial-data',
			components: {default: ManageFinancialData, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/admindashboard',
			name: 'admin-dashboard',
			components: {default: AdminDashboard, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true,
			},
          beforeEnter: (to, from, next) => {
              if (!localStorage.isAdmin || localStorage.isAdmin !== 'true') next({name: 'index'});
              else next();
			},
		},
		{
			path: '/comparison',
			name: 'comparison',
			components: {default: Comparison, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/userhome',
			name: 'userhome',
			components: {default: UserHome, header: MainNavbar, footer: MainFooter},
			props: {
				header: {colorOnScroll: 400},
				footer: {backgroundColor: 'black'}
			},
			meta: {
				requiresAuth: true
			}
		},
	],
	scrollBehavior: to => {
		if (to.hash) {
			return {selector: to.hash};
		} else {
			return {x: 0, y: 0};
		}
	}
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!localStorage.userId) next({name: 'index'});
		else next();
	} else next();
});

export default router;
