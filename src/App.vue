<script>
    import navbar from './components/Navigation/Navigation.vue'

    export default{
        components:{
            navbar,
        }
    }
</script>

<template>
    <div id="sudokuapp">
        <navbar/>
        <router-view></router-view>
    </div>
</template>

<style scoped>
#sudokuapp{
    margin: 0
}
</style>
