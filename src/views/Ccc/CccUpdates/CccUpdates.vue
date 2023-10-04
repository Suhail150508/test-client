<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>CCC Updates</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>CCC Updates</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <div class="courses-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="courses-left-content">
                        <div class="row">
                            <div class="col-lg-6 col-md-6" v-for="(cccUpdate,index) in cccUpdates">
                                <div class="single-courses-card style4">
                                    <div class="courses-img">
                                        <a href="#"><img style="width:100%" :src="cccUpdate.image" alt="Image"></a>
                                    </div>
                                    <div class="courses-content">
                                        <!-- <router-link  :to="{ path: 'single-updates', query: { updatesId: cccUpdate.id }}">
                                            <h5>{{ cccUpdate.title }}</h5>
                                        </router-link> -->

                                        <router-link :to="`/ccc-updates/${cccUpdate.slug}`">
                                            <h5>{{ cccUpdate.title }}</h5>
                                        </router-link>
                                        <div class="bottom-content">
                                            <ul class="d-flex justify-content-between">
                                                <li>
                                                    <!-- <router-link  :to="{ path: 'single-updates', query: { updatesId: cccUpdate.id }}">
                                                        <h6 class="text-danger">{{ cccUpdate.types }}</h6>
                                                    </router-link> -->

                                                    <router-link :to="`/ccc-updates/${cccUpdate.slug}`">
                                                        <h6 class="text-danger">{{ cccUpdate.types }}</h6>
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="!cccUpdates.length" class="text-danger text-center">
                            <div class="card-body">
                                <h5 class="text-danger">No Content  available</h5>
                              
                            </div>
                        </div>
                    </div>
                    <PaginationCCC v-show="cccUpdates.length" :links='links' @get-data="getData"/>
                </div>
                <HomeQuickRightSidebar @get-type="helloType"></HomeQuickRightSidebar>
            </div>
        </div>
    </div>



    <!--Start Letest News Area-->
    <!--<div class="latest-news-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="latest-news-left-content pr-20
                        ">
                        <div class="latest-news-card-area">
                            <h3>Latest CCC-Updates</h3>
                            <div class="row" v-for="cccUpdate in cccUpdates">
                                <div class="col-lg-6 col-md-6">
                                    <div class="single-news-card">
                                        <div class="news-img">
                                            <a href="news-details.html"><img :src="cccUpdate.image" alt="Image"></a>
                                        </div>
                                        <div class="news-content">
                                            <div class="list">
                                                <ul>
                                                    <li><i class="flaticon-user"></i>By Admin</li>
&lt;!&ndash;                                                    <li><i class="flaticon-tag"></i>Social Sciences</li>&ndash;&gt;
                                                </ul>
                                            </div>
                                            <a href="#"><h3>{{cccUpdate.title}}</h3></a>
                                            <a href="#" class="read-more-btn">Read More<i class="flaticon-next"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="paginations">
                            <ul>
                                <li><a href="news-details.html"><i class="flaticon-back"></i></a></li>
                                <li><a href="news-details.html">01</a></li>
                                <li><a href="news-details.html">02</a></li>
                                <li><a href="news-details.html">03</a></li>
                                <li><a href="latest-news.html" class="active"><i class="flaticon-next"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <HomeQuickRightSidebar></HomeQuickRightSidebar>
            </div>
        </div>
    </div>-->
    <!--End Letest News Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import HomeQuickRightSidebar from '../../../components/Ccc/HomeQuickRightSidebar.vue';
    import PaginationCCC from "../../../components/Ccc/PaginationCCC.vue";

    export default {
        name: 'CccUpdates',
        components: {
            HomeQuickRightSidebar,
            PaginationCCC
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                cccUpdates: [],
                links: [],
                type: "",
                semester_and_year: "",
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
            useHead({title: 'CCCUpdate | EWU'});
        },

        // created() {
        //     axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'cccUpdate' } })
        //     .then(response => {
        //         useHead({
        //             // title: response.data.data ? response.data.data.title : '',
        //             meta: [
        //                 {name: 'keywords', content: response.data.data ? response.data.data.keywords : ''},
        //                 {name: 'description', content: response.data.data ? response.data.data.description : ''}
        //             ],
        //         })
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
        // },

        methods: {
            helloType(type, semesterAndYear){
                this.type = type;
                this.semester_and_year = semesterAndYear;
                this.getData();
            },
            getData(url) {
                let linkUrl =url ? url : `${this.backendUrl}ccc-updates`;
                axios.get(linkUrl, {
                    params:{
                        type: this.type,
                        semester_and_year: this.semester_and_year
                    }
                })
                .then((response) => {
                    this.links = response.data.meta.links;
                    this.cccUpdates = response.data.data;
                    // console.log(this.cccUpdates);
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
            },
        }
    }
</script>