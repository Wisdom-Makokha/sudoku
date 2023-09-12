<template>
    <div>
        <div class="form-position flex-column-center">
            <div class="form-container flex-column-center">
                <div class="form-heading">
                    <h2 id="form-heading" class="header-text">User registration form</h2>
                </div>
                <form name="user-registration" autocomplete="off" id="form-body">
                    <div class="form-item flex-column-center">
                        <label for="username" class="header-text">Name: </label>
                        <input type="text" v-model="user.name" id="username" name="username" class="input-text-field"
                            required placeholder="Enter Your full name">
                    </div>
                    <div class="form-item flex-column-center">
                        <label for="email" class="header-text">Email: </label>
                        <input type="email" v-model="user.email" id="email" name="email" class="input-text-field" required
                            placeholder="Enter your email">
                    </div>
                    <div class="form-item flex-column-center">
                        <label for="password" class="header-text">Password: </label>
                        <input type="password" v-model="user.password" id="password" name="password"
                            class="input-text-field" required placeholder="Enter your password">
                    </div>
                    <div class="form-item flex-column-center">
                        <label for="password-confirmation" class="header-text">Confirm Password: </label>
                        <input type="password" v-model="user.password_confirmation" id="password-confirmation"
                            name="password-confirmation" class="input-text-field" required
                            placeholder="Repeat the password">
                    </div>
                    <div class="form-item form-route-container flex-column-center">
                        <router-link to="/login" class="form-route">Already registered? Login here</router-link>
                        <span class="animated-line"></span>
                    </div>
                    <div class="button-group">
                        <button class="form-button submit-button" type="submit"
                            @click.prevent="registeruser">Submit</button>
                        <button class="form-button cancel-button" @click.prevent="cancelregister">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import './Assets/formstyles.css'

export default {
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            baseURL: "http://127.0.0.1:8000/api",
            errors: []
        }
    },
    methods: {
        async registeruser() {
            try {
                const response = await axios.post(this.baseURL + '/createUser', this.user);
                console.log(response);
            }
            catch (error) {
                this.errors.push(error);
            }

            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
</style>