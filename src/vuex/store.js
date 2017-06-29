import Vuex from 'vuex'
import Vue from 'vue'

import * as actions from './actions.js'
import * as getters from './getters.js'

Vue.use(Vuex)

let state = {
    userInfo: {
        name: 'shenxuxiang',
        age: 26,
        sex: 'man'
    },
    counter: {
        count: 0
    }
}

let mutations = {
    UPDATE_USERINFO (state, data) {
        state.userInfo = Object.assign({}, state.userInfo, data)
    },
    UPDATE_COUNTER (state, data) {
        state.counter = Object.assign({}, state.counter, data)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
