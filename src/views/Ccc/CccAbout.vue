<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>{{aboutCccs.title}}</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>About CCC</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start News Details Area-->
    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="news-details">
                        <div class="news-simple-card">
<!--                            <img src="assets/images/news/news-5.jpg" alt="Image">-->
                            <h2 class="center">All About EWUCCC</h2>
                            <p v-html="aboutCccs.prelude"></p>
                        </div>

                        <div class="theory">
                            <div class="theory-box">
                                <h4>Objectives</h4>
                                <p v-html="aboutCccs.objectives"></p>
                            </div>
                            <div class="theory-box">
                                <h4>Mission</h4>
                                <p v-html="aboutCccs.mission"></p>
                            </div>
                            <div class="theory-box">
                                <h4>Vision</h4>
                                <p v-html="aboutCccs.conclusion"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <HomeQuickRightSidebar></HomeQuickRightSidebar>

            </div>
        </div>
    </div>
    <!--End News Details Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import HomeQuickRightSidebar from '../../components/Ccc/HomeQuickRightSidebar.vue';
    export default {
        name: 'CCCAbout',
        components:{
            HomeQuickRightSidebar,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                aboutCccs: [],
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            console.log("Component mounted.");
            this.getData();
        },

        beforeCreate() {
            useHead({title: 'CCCAbout | EWU'});
        },

        created() {
            axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'aboutCcc' } })
            .then(response => {
                useHead({
                    // title: response.data.data ? response.data.data.title : '',
                    meta: [
                        {name: 'keywords', content: response.data.data ? response.data.data.keywords : ''},
                        {name: 'description', content: response.data.data ? response.data.data.description : ''}
                    ],
                })
            })
            .catch(error => {
                console.error(error)
            })
        },

        methods: {
            getData() {
                let linkUrl =`${this.backendUrl}about-ccc`;
                console.log(linkUrl)
                axios.get(linkUrl)
                    .then((response) => {
                        this.aboutCccs = response.data;
                        console.log(this.aboutCccs);
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>