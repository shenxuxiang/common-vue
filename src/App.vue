<template>
    <div id="app">
        <nav-header></nav-header>
        <img src="./assets/logo.png">
        <router-view></router-view>
        <ul>
            <li>
                <router-link to="/home">home</router-link>
            </li>
            <li>
                <router-link to="/list">list</router-link>
            </li>
            <li>
                <router-link to="/detail">detail</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import NavHeader from './components/navheader.vue'

export default {
    name: 'app',
    components: { NavHeader },
    data () {
        return {

        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
}
*focus: {
    outline: none;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
ul {
    list-style: none;
}
</style>
