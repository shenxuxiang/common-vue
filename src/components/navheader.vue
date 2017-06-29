<template>
    <div
        class="nav-header"
        @click="changeName"
    >
        {{getName}}
    </div>
</template>

<script>
export default {
    name: 'navHeader',
    data () {
        return {

        }
    },
    created () {
        console.log(this.$store.getters.getUserInfo.age)
    },
    methods: {
        changeName () {
            this.$store.dispatch('setUserInfo', {name: 'shenjun'})
        }
    },
    computed: {
        getName () {
            return this.$store.getters.getUserInfo.name
        }
    }
}
</script>

<style scoped lang="scss">
.nav-header {
    position: absolute;
    top:0;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: #999;
}
</style>
