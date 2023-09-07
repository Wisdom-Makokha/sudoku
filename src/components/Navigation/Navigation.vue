<template>
    <div id="navigationbar" class="row-flex">
        <div class="route-container">
            <router-link to="/" id="logo" class="route logo-text" title="Home">Sudoku</router-link>
        </div>
        <div class="row-flex other-routes">
            <div class="route-container">
                <router-link to="/rules" id="rules" class="route header-text" title="rules">Rules</router-link>
            </div>
            <div class="route-container">
                <router-link to="/about" id="about" class="route header-text" title="about">About</router-link>
            </div>
        </div>
    </div>
</template>


<style scoped>
    
</style>

<script>
import './Assets/navigationstyles.css'
</script>