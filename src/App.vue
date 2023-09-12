<script>
    import navbar from './components/Navigation/Navigation.vue'

    export default{
        components:{
            navbar,
        }
    }
</script>

<template>
    <div >
        <navbar/>
        <router-view id="sudokuapp"></router-view>
    </div>
</template>

<style scoped>
#sudokuapp{
    background-color: #6783ab8d;
    margin: 28px 10%;
    border-radius: 12px
}
</style>
