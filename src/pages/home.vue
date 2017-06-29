<template>
    <div class="home">
        <h1>{{mgs}}</h1>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            mgs: 'this is the home page'
        }
    }
}
</script>

<style scoped lang="scss">
.home {
    color: #333;
}
</style>
