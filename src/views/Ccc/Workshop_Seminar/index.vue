<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Socio-Psyche-Counseling</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Socio-Psyche-Counseling</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->


    <!--Start workshop/seminar Area-->
    <div class="events-area pt-100 pb-70">
        <div class="container">
            <h2>{{ guideline.title }}</h2>
        <p v-html="guideline.description"></p>
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 mt-5" v-for="workshop in workshops">
                    <div class="single-events-card style-4">
                        <div class="events-image">
                            <div class="date">
                                <p>Days</p>
                            </div>
                        </div>
                        <div class="events-content">
                            <div class="admin">
                                <p><a href="#"><i class="flaticon-student-with-graduation-cap"></i>Raymond Salazar</a></p>
                            </div>
                            <!-- <router-link :to="{ path: 'workshop-seminar-details', query: { workshopId: workshop.id } }">
                                <h3>{{ workshop.title }}</h3>
                            </router-link> -->

                            <router-link :to="`/socio-psyche-counseling/${workshop.slug}`">
                                <h3>{{ workshop.title }}</h3>
                            </router-link>
                        </div>
                    </div>
                </div>

          <div v-show="!workshops.length" class=" text-danger text-center">
           <div class="card-body">
              <h5 class="text-danger">No Content Available</h5>
              <!-- <p class="card-text">There is no data available to display.</p> -->
          </div>
          </div>
            </div>
            <PaginationCCC v-show="workshops.length" :links='links' @get-data="getData"/>
        </div>
    </div>
</template>

<style>
    .default-btn {
        background-color: #008000;
        color: #ffffff;
        font-size: 12px;
        padding: 2px 10px;
        border-radius: 0;
        position: relative;
        -webkit-transition: all ease 0.5s;
        transition: all ease 0.5s;
        border: 1px solid #008000;
        border-radius: 4px;
        z-index: 1;
    }
    .time p i{
        margin-bottom: 6px;
        color: #008000;
        position: relative;
        top: 2px;
        margin-right: 5px;
    }

    .paginations ul li a {
        text-align: center;
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 100%;
        border: 1px solid #eeeeee;
        display: inline-block;
        -webkit-transition: all ease 0.5s;
        transition: all ease 0.5s;
        color: #111D5D;
        font-size: 13px;
        -webkit-box-shadow: 0 0 20px 3px rgb(0 0 0 / 5%);
        box-shadow: 0 0 20px 3px rgb(0 0 0 / 5%);
    }
    .paginations ul li a.active {
        background-color: #008000;
        color: #ffffff;
        border: 1px solid #008000;
    }
</style>

<script>
    import axios from "axios";
    import { useHead } from '@vueuse/head';
    import moment from 'moment';
    import PaginationCCC from "../../../components/Ccc/PaginationCCC.vue";
    export default {
        name: "AllResource",
        components: { PaginationCCC },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                workshops: [],
                guideline: [],
                moment: moment,
                links: []
            };
        },

        watch: {
            keyword: function () {
                this.getData();
                this.getGuideline();
            },
        },

        mounted() {
            this.getData();
            this.getGuideline();
        },
        beforeCreate() {
            useHead({title: 'Socio Psyche-Counseling Center | EWU'});
        },

        methods: {
            getData(url) {
                let linkUrl = url ? url : `${this.backendUrl}workshop`;
                axios
                    .get(linkUrl)
                    .then((response) => {
                        this.links = response.data.meta.links
                        this.workshops = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getGuideline(url) {

            let guidelineUrl = url ? url : `${this.backendUrl}guideline/socio_psyche_counseling`;
                axios
                .get(guidelineUrl)
                .then((response) => {
                    this.guideline = response.data;
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
                },
            },
    };
</script>
