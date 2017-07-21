import ShopInfo from '../pages/shopinfo.vue'
import AddCCInfo from '../pages/addccinfo.vue'
import Login from '../pages/login.vue'

export default [
    {
        path: '/', redirect: '/shopinfo'
    }, {
        path: '/shopinfo', name: 'shopinfo', component: ShopInfo
    }, {
        path: '/addccinfo', name: 'addccinfo', component: AddCCInfo
    }, {
        path: '/login', name: 'login', component: Login
    }
]
