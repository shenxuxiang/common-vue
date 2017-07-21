<template>
    <div id="app">
        <template v-if="userName === ''">
            <router-view></router-view>
        </template>
        <template v-else>
            <ul class="nav-head">
                <router-link
                    to="/shopinfo"
                    tag="li"
                    class="nav-head-item"
                    active-class="active"
                >驻店信息</router-link>
                <router-link
                    to="/addccinfo"
                    tag="li"
                    class="nav-head-item"
                    active-class="active"
                >cc信息新增</router-link>
            </ul>
            <router-view></router-view>
        </template>
    </div>
</template>

<script>

export default {
    name: 'app',
    data () {
        return {
            userName: 'sxx',
            ori: ''
        }
    },
    beforeMount () {
        console.log(this.$route.path)
        if (this.userName === '') {
            this.$router.push('/login')
        }
        this.ori = 'onorientationchange' in window ? 'orientationchange' : 'resize'
        this.getWindowWidth()
    },
    mounted () {
        window.addEventListener(this.ori, this.orientationChange, false)
    },
    beforeDestory () {
        window.removeEventListener(this.ori, this.orientationChange, false)
    },
    methods: {
        getWindowWidth () { // 获取屏幕的宽度
            if (navigator.userAgent.indexOf("UCBrowser") !== -1) { // 只针对uc浏览器 横屏时使用document.documentElement.clientHeight有问题（ios）
                document.documentElement.style.fontSize = '' + (window.screen.width / 10) + 'px'
                return
            }
            let winWidth
            if (window.orientation === -90 || window.orientation === 90) {
                winWidth = document.documentElement.clientHeight
            } else if (window.orientation === 0) {
                winWidth = document.documentElement.clientWidth
            }
            document.documentElement.style.fontSize = '' + (winWidth / 10) + 'px'
        },
        orientationChange (event) { // 横竖屏切换时的回调函数
            clearTimeout(this.interval)
            this.interval = setTimeout(() => {
                this.getWindowWidth()
            }, 300)
        }
    }
}
</script>

<style>
html {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 10vw;
}
body {
    font-size: .32rem;
}
#app {
    position: relative;
}
* {
    padding: 0;
    margin: 0;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
}
*focus: {
    outline: none;
}
ul {
    list-style: none;
}
.nav-head {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1.2rem;
    background: #26a2ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
}
.nav-head-item {
    display: block;
    flex: 1;
    color: #fff;
    line-height: 1.2rem;
    text-align: center;
    font-size: .4267rem;
    position: relative;
}
.nav-head-item.active:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: yellow;
}
</style>
