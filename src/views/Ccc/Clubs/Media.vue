<template>
    <!--Start ClubMedia Area-->
    <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title style2">
                        <h2 class="text-uppercase">{{this.$route.params.type == 'notice' ? 'notices' : this.$route.params.type }}</h2>
                    </div>
                    <div class="single-podcasts-card" v-for="(item,index) in mediaClubs" data-aos-duration="1200" data-aos-delay="200" data-aos-once="true">
                        <div class="single-alumni-events-card">
                            <div class="row align-items-center">
                                <div class="col-lg-3 col-md-3">
                                    <div class="alumni-img">
                                        <img :src="item.club_media_photo.source" :alt="$store.state.alt">
                                        <div class="date">
                                            <p v-if="item.type == 'events'">{{ moment(item.date_from).format("MMM Do YYYY") }}</p>
                                            <p v-if="item.type == 'news'">{{ moment(item.news_date).format("MMM Do YYYY") }}</p>
                                            <p v-if="item.type == 'notice'">{{ moment(item.notice_date).format("MMM Do YYYY") }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <div class="alumni-content">
                                        <!--<div class="time">
                                            <p><i class="flaticon-time"></i>10:00 am - 1:00 pm</p>
                                        </div>-->
<!--                                        <router-link :to="{name: 'singleMedia', query: { clubId:item.club_id, mediaId: item.id }}" class="nav-link">-->
                                        <router-link :to="getEventPath(item)" class="nav-link">
                                            <h3>{{item.title}}</h3>
                                        </router-link>
                                        <div class="location" v-if="item.type == 'events'">
                                            <p><i class="ri-map-pin-line"></i>{{item.c_address}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    <!--End ClubMedia Area-->
</template>

<script>
    import ClubQuickRightSidebar from '../../../components/Ccc/ClubQuickRightSidebar.vue';
    import axios from "axios";
    import moment from 'moment';
    import slugify from "slugify";
    import { useHead } from '@vueuse/head';

    export default {
        name: 'ClubLayout',
        components:{
            ClubQuickRightSidebar,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                mediaClubs: [],
                moment: moment
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            },
        },

        mounted() {
            this.getData();
            // console.log(this.$route.params.shortName)
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}club-media/`+this.$route.params.shortName+`/`+this.$route.params.type)
                    .then((response) => {
                        this.mediaClubs = response.data
                        // console.log(response.data)
                        useHead({title: `${this.$route.params.shortName} | ${this.$route.params.type} | EWU`})
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            generateSlug(title) {
                return slugify(title, {
                    replacement: '-',  // Replace spaces with '-'
                    lower: true        // Convert to lowercase
                });
            },
            getEventPath(item) {
                const slug = this.generateSlug(item.title);
                return `/clubs/${this.$route.params.shortName}/single-media/${slug}`;
            },

        }
    }
</script>