<template>
    <div id="navigationbar" class="row-flex">
        <div class="route-container">
            <router-link to="/" id="logo" class="route logo-text" title="Home">Sudoku</router-link>
        </div>
        <div class="row-flex other-routes">
            <div class="dropdown-menu route-container">
                <input type="checkbox" id="dropdown" name="dropdown">
                <label for="dropdown" class="dropdown-button">
                    <span class="route route-text">Profile  </span>
                    <span class="arrow"></span>
                </label>
                <div class="dropdown-container">
                    <div class="dropdown-route-container">
                        <router-link to="/register" id="register" class="route route-text"  title="register">Register</router-link>
                    </div>
                    <div class="dropdown-route-container">
                        <router-link to="/login" id="login" class="route route-text" title="login">Login</router-link>
                    </div>
                </div>
            </div> 
            <div class="route-container">
                <router-link to="/rules" id="rules" class="route route-text" title="rules">Rules</router-link>
            </div>
            <div class="route-container">
                <router-link to="/about" id="about" class="route route-text" title="about">About</router-link>
            </div>
        </div>
    </div>
</template>


<style scoped>
    
</style>

<script>
import './Assets/navigationstyles.css'
</script>