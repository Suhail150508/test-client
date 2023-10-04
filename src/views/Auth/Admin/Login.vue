<template>
    <div id="login">
        <div class="login-area pt-100 pb-70">
            <div class="container">
                <div class="login shadow-none p-3 bg-light rounded">
                    <h3>Login</h3>
                    <form @submit.prevent="submit">
                        <div v-if="form.progress" class="text-center">
                            Progress: {{ form.progress.percentage }}%
                        </div>
                        <AlertError :form="form" message="There were some problems with your input." />

                        <div class="row mb-3">
                           
                            <label class="col-sm-3 col-form-label">Email</label>
                           
                            <div class="col-sm-7 m-auto">
                                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                                <input v-model="form.email" type="text" name="email" class="form-control shadow-lg bg-white rounded"
                                       placeholder="Enter Your valid email address" />
                                <HasError :form="form" field="email" />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-7 m-auto">
                                <input v-model="form.password" name="password" type="password" class="form-control shadow-lg bg-white rounded"
                                       placeholder="Enter password" />
                                <HasError :form="form" field="password" />
                            </div>
                        </div>

                        <div class="row mb-3">
                           
                            <label class="col-sm-3 col-form-label">Google reCaptcha</label>
                            <div class="col-sm-7 m-auto">
                                <vue-recaptcha sitekey="6LcBkkgmAAAAAEOYXaFUGxopM-ajaT0KeKCU8JRI"
                                               size="normal"
                                               theme="light"
                                               hl="en"
                                               @verify="recaptchaVerified"
                                               @expire="recaptchaExpired"
                                               @fail="recaptchaFailed"
                                               ref="vueRecaptcha"
                                               required>
                                </vue-recaptcha>
                                <p v-if="capchaErrorMsg" class="error-message">{{ capchaErrorMsg }}</p>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-7 m-auto">
                                <button type="submit" class="default-btn rounded-pill" :disabled="form.busy">
                                    Submit
                                </button>
                            </div>
                        </div>

                        <!--<div class="row mb-1">
                            <label class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-7 m-auto">
                                <router-link :to="{name: 'forgotPassword'}" class="text-muted underline-on-hover">
                                    Forgot Password?
                                </router-link>
                            </div>
                        </div>-->

                        <div class="row">
                            <label class="col-sm-3 col-form-label"></label>
                            <div class="col-sm-7 m-auto">
                <span>
                  Not a member yet?
                  <router-link :to="{name: 'register'}" class="text-muted underline-on-hover">
                    Sign Up
                  </router-link>
                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <vue-progress-bar></vue-progress-bar>
            <notifications />
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import Form from 'vform'
    import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5'
    import Cookies from 'js-cookie'
    import vueRecaptcha from 'vue3-recaptcha2';

    export default {
        name:"login",
        components: {
            vueRecaptcha
        },
        data(){
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                showRecaptcha: false,
                errorMessage: "",
                capchaErrorMsg: "",
                form: new Form({
                    email: "",
                    password: "",
                }),
            }
        },
        methods:{
            recaptchaVerified(response) {
                this.showRecaptcha = true;
                this.capchaErrorMsg="";
            },
            recaptchaExpired() {
                this.$refs.vueRecaptcha.reset();
            },
            recaptchaFailed() {
            },

            submit(){

            if(this.showRecaptcha){
                    this.form.busy = true
                    this.form.post(`${this.backendUrl}adminauth/login`)
                    .then(response => {
                        // set into localStorage
                        localStorage.setItem('adminLoggedInToken',response.data.token)
                        localStorage.setItem('auth_id',response.data.auth_id)
                        localStorage.setItem('type','admin')

                        //set into cookies
                        Cookies.set('adminLoggedInTokenCookie', response.data.token, { expires: 1/24 }) // expires in 1 hour
                        Cookies.set('authIdCookie', response.data.auth_id, { expires: 1/24 }) // expires in 1 hour

                        if(this.form.successful){
                            this.$router.push({name: 'app.dashboard'})
                        }else{
                            this.$router.push({name: 'AdminLogin'})
                        }
                    })
                    .catch(e => {
                    // if(e.response) {
                        this.errorMessage = e.response.data.message
                    // }
                    console.log(e)
                    })
                }else{
                this.capchaErrorMsg = "Please verify that you are not a robot."
                }

                
            }
        }

    }
</script>
<style>
.error-message {
  color: red;
}
</style>
