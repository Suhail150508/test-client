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
                <div class="col-lg-9">
                    <div class="contact-and-address">
                        <h2>Let's Contact Us</h2>
                        <p>{{ contactsClub.c_description }}</p>
                        <div class="contact-and-address-content">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-card" style="height: 100%;">
                                        <div class="icon">
                                            <i class="fa fa-phone"></i>
                                        </div>
                                        <h4>Contact</h4>
                                        <p>Mobile: <a href="tel:+8819906886">{{ contactsClub.c_phone }}</a></p>
                                        <p>Mail: <a href="mailto:contact@edumall.com">{{ contactsClub.c_email }}</a></p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="contact-card" style="height: 100%;">
                                        <div class="icon">
                                            <i class="fa fa-location"></i>
                                        </div>
                                        <h4>Address</h4>
                                        <p>{{ contactsClub.c_room_no }}</p>
                                        <p>{{ contactsClub.c_address }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="contactsClub.link_details" class="col-lg-3">
                    <div class="contact-and-address">
                        <div class="social-media">
                            <h3>Social Media</h3>
                            <ul>
                                <li v-for="item in contactsClub.link_details">
                                    <a :href="item.social_link" target="_blank"><i :class="item.icon_class"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Contact Us Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'ContactsClub',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                contactsClub: [],
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        beforeCreate() {
            useHead({title: `${this.$route.params.shortName} | Contact Us | EWU`});
        },

        mounted() {
            this.getData();
            // console.log(this.$route.params.shortName)
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}club/`+this.$route.params.shortName)
                    .then((response) => {
                        this.contactsClub = response.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>