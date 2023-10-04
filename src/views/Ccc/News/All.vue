<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Latest News</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Latest News</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Letest News Area-->
    <div class="latest-news-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="latest-news-left-content pr-20">
                        <div class="latest-news-card-area">
                            <h3>All News</h3>
                            <div class="row">
                                <div class="col-lg-6 col-md-6" v-for="item in news">
                                    <div class="single-news-card">
                                        <div class="news-img">
                                            <img v-if="item.images[0]" :src="item.images[0].source" class="w-100" height="300" :alt="item.id">
                                        </div>

                                        <div class="news-content p-3">
                                            <!--<div class="list">
                                                <ul>
                                                    <li><i class="flaticon-user"></i>By Admin</li>
                                                    <li><i class="flaticon-tag"></i>Social Sciences</li>
                                                </ul>
                                            </div>-->

                                            <!-- <router-link  :to="{ path: 'special-news', query: { newsId: item.id }}">
                                                <h5>{{ item.title.substring(0,52) }} {{item.title.length >= 52 ? `...` : ''}}</h5>
                                            </router-link> -->
                                            
                                            <router-link :to="`/special-news/${item.slug}`">
                                                <h5>{{ item.title.substring(0,52) }} {{item.title.length >= 52 ? `...` : ''}}</h5>
                                            </router-link>

                                            <!-- <a href="#" class="read-more-btn">Read More<i class="flaticon-next"></i></a> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-show="!news.length" class="text-danger text-center">
                                <div class="card-body">
                                    <h5 class="text-danger">No Content  available</h5>
                                </div>
                            </div>
                        </div>
                        <PaginationCCC v-show="news.length" :links='links' @get-data="getData"/>
                    </div>
                </div>
                <NewsQuickRightSidebar @get-type="helloType"></NewsQuickRightSidebar>
            </div>
        </div>
    </div>
    <!--End Letest News Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import NewsQuickRightSidebar from '../../../components/Ccc/NewsQuickRightSidebar.vue';
    import PaginationCCC from "../../../components/Ccc/PaginationCCC.vue";
    export default {
        name: 'News',
        components:{
            PaginationCCC,
            NewsQuickRightSidebar,
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                latestNews: [],
                news: [],
                links: [],
                type: "",
                semester_and_year: "",
            };
        },

        beforeCreate() {
            useHead({title: 'All News | EWU'});
        },

        mounted() {
            this.getData();
        },

        methods: {
            helloType(type, semesterAndYear){
                this.type = type;
                this.semester_and_year = semesterAndYear;
                this.getData();
            },

            getData(url) {
                //get all news
                axios.get(url ? url : `${this.backendUrl}news`,
                {
                    params:{
                        place:'ccc_home',
                        type: this.type,
                        semester_and_year: this.semester_and_year
                    }})
                    .then((response) => {
                        // console.log(response.data.data[0].images[0].source)
                        this.news = response.data.data;
                        // console.log(this.news);
                        this.links = response.data.meta.links;
                        this.latestNews = response.data.data.slice(Math.max(response.data.data.length - 3, 0));
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });

                /*axios.get(`${this.backendUrl}news`)
                    .then((response) => {
                        this.latestNews = response.data.data.slice(Math.max(response.data.data.length - 3, 0));
                        console.log(this.latestNews,'a')
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });*/
            },
        }
    }
</script>