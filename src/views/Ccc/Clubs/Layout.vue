<template>
    <div class="health-care-details pb-70">
        <!-- Club slider code start -->
        <div class="banner-area">
            <Carousel :autoplay="3000" :itemsToShow="1" :wrapAround="true" :transition="1000">
                <Slide v-for="(slider, index) in clubSliders" :key="index">
                <div class="carousel__item custom_carousel_item">
                    <img class="d-block w-100" :src="slider.image" :alt="slider.id" style="height:100%;" />
                    <div class="overlay">
                    <h1 class="text-white slider-title mb-0">{{ slider.title }}</h1>
                    </div>
                </div>
                </Slide>

                <template #addons>
                <Navigation />
                </template>
            </Carousel>
        </div>
        <!-- Club slider code end -->

        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-8">
                    <router-view :key="$route.fullPath"></router-view>
                </div>
                <ClubQuickRightSidebar></ClubQuickRightSidebar>
            </div>
        </div>
    </div>
</template>

<script>
    import ClubQuickRightSidebar from '../../../components/Ccc/ClubQuickRightSidebar.vue';
    import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';
    import axios from 'axios';

    export default {
        name: 'ClubLayout',

        components:{
            ClubQuickRightSidebar,
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                clubSliders: [],
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
                axios.get(`${this.backendUrl}club/`+this.$route.params.shortName)
                .then((response) => {
                    axios.get(`${this.backendUrl}club-slider/list/`+response.data.id)
                    .then((response) => {
                        this.clubSliders = response.data.data;
                        // console.log(this.clubSliders);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
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
    .custom_carousel_item {
        max-height: 500px;
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
        box-sizing: border-box;
    }

    .overlay {
        position: absolute;
        top: 100px;
        left: 0;
        right: 0;
        color: white;
        text-align: center;
    }
</style>