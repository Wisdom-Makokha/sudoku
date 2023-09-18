<template>
    <div>
        <div class="form-position flex-column-center">
            <div class="form-container flex-column-center">
                <div class="form-heading">
                    <h2 id="form-heading" class="header-text">User Login</h2>
                </div>
                <form name="user-login" autocomplete="off" id="form-body">
                    <div class="form-item flex-column center">
                        <label for="email" class="header-text">Email: </label>
                        <input type="text" v-model="user.email" id="email" name="email" class="input-text-field" required
                            placeholder="Enter your email">
                    </div>
                    <div class="form-item flex-column-center">
                        <label for="password" class="header-text">Password: </label>
                        <input type="password" v-model="user.password" name="password" class="input-text-field" required
                            placeholder="Enter your password">
                    </div>
                    <div class="form-item form-route-container flex-column-center">
                        <router-link to="/register" class="form-route">Not yet registered? Register here</router-link>
                        <span class="animated-line"></span>
                    </div>
                    <div class="button-group">
                        <button class="form-button submit-button" type="submit" @click.prevent="userlogin">Login</button>
                        <button class="form-button cancel-button" @click.prevent="cancellogin">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import './Assets/formstyles.css'
import axios from 'axios'

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            baseURL: "http://127.0.0.1:8000/api",
            errors: []
        };
    },
    methods:{
        async userlogin(){
            try{
                const response = await axios.post(this.baseURL + '/userLogin', this.user);
                localStorage.setItem("logintoken", response.data.token);
                localStorage.setItem("sudoku-username", response.data.requestdata);
                this.$router.push('/');
            } catch (error){
                this.errors.push(error);
                console.log(this.errors[this.errors.length]);
            }            
        }
    }
}
</script>

<style></style>