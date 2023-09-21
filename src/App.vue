<script>
import navbar from './components/Navigation/Navigation.vue';
import footerbar from './components/Footer/Footer.vue';

export default {
    components: {
        navbar,
        footerbar,
    }
}
</script>

<template>
    <div>
        <navbar />
        <router-view id="sudokuapp"></router-view>
        <footerbar />
    </div>
</template>

<style scoped>
#sudokuapp {
    background-color: #6783ab8d;
    min-width: 400px;
    min-height: 350px;
    margin: 28px 10%;
    border-radius: 12px;
    padding: 5em 3em 9em 3em;
}
</style>
