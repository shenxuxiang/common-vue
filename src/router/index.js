import Home from '../pages/home.vue'
import List from '../pages/list.vue'
import Detail from '../pages/detail.vue'

export default [
    {
        path: '/', redirect: '/home'
    }, {
        path: '/home', name: 'home', component: Home
    }, {
        path: '/list', name: 'list', component: List
    }, {
        path: '/detail', name: 'detail', component: Detail
    }
]
