<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Contact Us</h1>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Contact Us Area-->
    <div class="contact-us-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="contacts-form">
                        <h3>EWU Location</h3>
                        <a href="https://goo.gl/maps/QnYrTZHGPYMzSQfK7">
                            <img style="width: 100%; height: 400px;" :src="$store.state.ewuMapImage" :alt="$store.state.ewuMapImage">
                        </a>


                        <!--<vue-google-maps
                                :center="{ lat: 37.7749, lng: -122.4194 }"
                                :zoom="12"
                                style="width: 100%; height: 400px;"
                        >
                        </vue-google-maps>-->
                        <!--<form id="contactForm">
                            <div class="row">
                                <div class="col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label>Your name</label>
                                        <input type="text" name="name" id="name" class="form-control" required data-error="Please enter your name">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label>Your email</label>
                                        <input type="email" name="email" id="email" class="form-control" required data-error="Please enter your email">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label>Your phone</label>
                                        <input type="text" name="phone_number" id="phone_number" required data-error="Please enter your number" class="form-control">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-sm-6">
                                    <div class="form-group">
                                        <label>Subject</label>
                                        <input type="text" name="msg_subject" id="msg_subject" class="form-control" required data-error="Please enter your subject">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Your message</label>
                                        <textarea name="message" class="form-control" id="message" cols="30" rows="8" required data-error="Write your message"></textarea>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="form-check">
                                        <input
                                                name="gridCheck"
                                                value="I agree to the terms and privacy policy."
                                                class="form-check-input"
                                                type="checkbox"
                                                id="gridCheck"
                                                required
                                        >
                                        <label class="form-check-label" for="gridCheck">
                                            I agree to the <a href="#">terms</a> and <a href="#">privacy policy</a>
                                        </label>
                                        <div class="help-block with-errors gridCheck-error"></div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12">
                                    <button type="submit" class="default-btn">
                                        <span>Send message</span>
                                    </button>
                                    <div id="msgSubmit" class="h3 text-center hidden"></div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </form>-->
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="contact-and-address">
                        <h2>Let's Contact Us</h2>
                        <p v-html="contactUs.description"></p>
                        <div class="contact-and-address-content">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-card">
                                        <div class="icon">
                                            <i class="ri-phone-line"></i>
                                        </div>
                                        <h4>Contact</h4>
                                        <p>Mobile: <a href="tel:+8819906886">{{ contactUs.phone }}</a></p>
                                        <p>Mail: <a href="mailto:contact@edumall.com">{{ contactUs.email }}</a></p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-card">
                                        <div class="icon">
                                            <i class="ri-map-pin-line"></i>
                                        </div>
                                        <h4>Address</h4>
                                        <p>Room No: {{ contactUs.room_no }}</p>
                                        <p>{{ contactUs.address }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 id="map"></h3>
                        </div>
                        <div class="social-media">
                            <h3>Talk To Our Team</h3>
                            <p>You will find key/persons & Admins, there appointment time and office days with hours
                                <router-link class="talk-to-our-team" style="font-weight: bold;" :to="{ path: '/ccc-student-welfare' }">
                                   <button type="button" class="btn bg-success btn-sm">Here</button> <!--here..-->
                                </router-link>
                            </p>

                        </div>
                        <!--<div class="social-media">
                            <h3>Social Media</h3>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com" target="_blank"><i class="flaticon-facebook"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com" target="_blank"><i class="flaticon-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/?lang=en" target="_blank"><i class="flaticon-instagram"></i></a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com/?lang=en" target="_blank"><i class="flaticon-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Contact Us Area-->
</template>

<script>
    import axios from 'axios';
    // import VueGoogleMaps from '@fawmi/vue-google-maps'
    import { useHead } from '@vueuse/head';
    export default {
        name: 'ContactsClub',
        components: {
            // VueGoogleMaps
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                contactUs: [],
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            this.getData();
        },

        beforeCreate() {
            useHead({title: 'Contactus | EWU'});
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}contactUs`)
                    .then((response) => {
                        this.contactUs = response.data.data[0];
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>

<style>

    .talk-to-our-team, span.link {
        color: blue;
    }

    .talk-to-our-team:visited, span.visited {
        color: purple;
    }

    .talk-to-our-team:active, span.active {
        color: red;
    }
</style>