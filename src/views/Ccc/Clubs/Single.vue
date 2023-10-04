<template>
    <!--Start Page Banner-->
    <!-- <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Clubs </h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Clubs</li>
                </ul>
            </div>
        </div>
    </div> -->
    <!--End Page Banner-->


    <!--Start slider Area-->
    <!-- <div class="banner-area">
      <Carousel :autoplay="3000" :itemsToShow="1" :wrapAround="true" :transition="1000">
        <Slide v-for="(slider, index) in clubSliders" :key="index">
          <div class="carousel__item custom_carousel_item">
            <img class="d-block w-100" :src="slider.image" :alt="slider.id" style="height:100%;" />
            <div class="overlay">
              <h4 class="text-white slider-title mb-0">{{ slider.title }}</h4>
              <p class="text-white slider-desc mb-1">
                {{ slider.description && slider.description.substring(0, 150) }}
                {{ slider.description && slider.description.length >= 150 ? '...' : '' }}
              </p>
              <a v-if="slider.url" :href="slider.url" class="btn btn-sm btn-danger rounded-5">View Details</a>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div> -->
    <!--End slider Area-->

    <div class="health-details">
        <div class="madical-care-content">
            <div v-html="singleClub.description"></div>
        </div>

       <!-- <div class="top-content">
            <img :src="singleClub.main_logo" :alt="singleClub.id">
            <h2>{{singleClub.title}}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco lab</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore </p>
        </div> -->

        <!-- <div class="madical-care-content">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="medical-card">
                        <img :src="singleClub.main_logo" :alt="singleClub.id">
                        <div class="content">
                            <h4>{{singleClub.title}}</h4>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="medical-care">
                        <h3>{{singleClub.title}}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliq</p>
                        <div class="list">
                            <ul>
                                <li>Planned Care and Population Health</li>
                                <li>Patient and Caregiver Engagement</li>
                                <li>Comprehensiveness and Coordination</li>
                                <li>Evaluation and management services</li>
                                <li>Evidence-based preventive services</li>
                                <li>Population-based management</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div> -->

        <!-- <div class="health-care">
            <h3>{{singleClub.title}} Objectives</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi</p>
        </div> -->

        <!-- <div class="health-care-access">
            <h3>{{singleClub.title}} Access and Quality</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut enim ad minim ven iam quis nostrud xerci tation ulla mco laboris nisi</p>
        </div> -->
    </div>
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    // import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
    // import 'vue3-carousel/dist/carousel.css';

    export default {
        name: 'SingleClub',
        // components: {
        //     Carousel,
        //     Slide,
        //     Pagination,
        //     Navigation,
        // },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                // clubSliders: [],
                singleClub: [],
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

        methods: {
            getData() {
                // Single club response
                // axios.get(`${this.backendUrl}club/`+this.$route.params.shortName)
                // .then((response) => {
                //     this.singleClub = response.data;
                //     // console.log(this.singleClub);
                //     useHead({title: response.data.title +' '+ '| EWU'})

                //     axios.get(`${this.backendUrl}club-slider/list/`+this.singleClub.id)
                //     .then((response) => {
                //         this.clubSliders = response.data.data;
                //         console.log(this.clubSliders);
                //     })
                //     .catch((e) => {
                //         console.log(e);
                //     });
                // })
                // .catch((e) => {
                //     console.log(e);
                //     this.$Progress.fail();
                // });

                axios.get(`${this.backendUrl}club/`+this.$route.params.shortName)
                .then((response) => {
                    this.singleClub = response.data;
                    // console.log(this.singleClub);
                    useHead({title: response.data.title +' '+ '| EWU'})
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
    /* .custom_carousel_item {
        min-height: 200px;
        width: 100%;
        height: 100%;
        background-color: var(--vc-clr-primary);
        color: var(--vc-clr-white);
        font-size: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    } */

    /* .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        text-align: center;
    } */
</style>
