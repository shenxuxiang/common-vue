import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import store from './vuex/store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
