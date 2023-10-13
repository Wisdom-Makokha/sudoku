<template>
    <div id="navigationbar" class="row-flex">
        <div class="route-container">
            <router-link to="/" id="logo" class="route logo-text" title="Home">Sudoku</router-link>
        </div>
        <div class="row-flex other-routes">
            <div class="dropdown-menu route-container">
                <input type="checkbox" id="dropdown" name="dropdown">
                <label for="dropdown" class="dropdown-button">
                    <span class="route route-text">{{ username }}</span>
                    <span class="arrow"></span>
                </label>
                <div class="dropdown-container">
                    <div class="dropdown-route-container">
                        <router-link to="/register" id="register" class="route route-text"  title="register">Register</router-link>
                    </div>
                    <div class="dropdown-route-container">
                        <router-link to="/login" id="login" class="route route-text" title="login">Login</router-link>
                    </div>
                    <div v-if="checklogin" class="dropdown-route-container">
                        <router-link to="/boards" title="boards" id="boards" class="route route-text">Boards</router-link>
                    </div>
                    <div class="dropdown-route-container">
                        <a class="route route-text" title="logout" @click="userlogout">Logout</a>
                    </div>
                </div>
            </div> 
            <div class="route-container">
                <router-link to="/rules" id="rules" class="route route-text" title="rules">Rules & tips</router-link>
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
import axios from 'axios'

export default {
    data (){
        return {
            baseURL: 'http://127.0.0.1:8000/api',
            errors: [],
            checklogin: localStorage.getItem("logintoken") ? true : false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("logintoken")}`,
                Accept: "application/json"
            },
            username: (localStorage.getItem("logintoken") ? true : false) ? localStorage.getItem("sudoku-username") : "Profile"
        }
    },
    methods: {
        async userlogout(){
            try {
                const response = await axios.get(this.baseURL + '/userLogout', { headers: this.headers });
                console.log(response.data.message, response.data.requestdata);
                localStorage.removeItem("logintoken");
                localStorage.removeItem("sudoku-username");
                this.$router.push("/");
                this.$router.go(this.$router.currentRoute);
                
            } catch(error) {
                this.errors.push(error);
            }
        }
    }
}
</script>