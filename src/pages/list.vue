<template>
    <div class="list">
        <h1>{{mgs}}</h1>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            mgs: 'this is the list page'
        }
    }
}
</script>

<style scoped lang="scss">
.home {
    color: #666;
}
</style>
