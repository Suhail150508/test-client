<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Career Tips & Tricks</h1>

                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Career Tips List</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <div class="courses-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="courses-left-content">
                        <div class="row">
                            <div class="col-lg-4 col-md-4" v-for="(item,index) in career_tips">
                                <div class="single-courses-card style4">
                                    <div class="courses-img">
                                        <a href="#"><img :src="item.image" alt="Image"></a>
                                    </div>
                                    <div class="courses-content">
                                        <!-- <router-link :to="{ path: 'single-career-tips', query: { tipsId: item.id }}">
                                            <h6>{{ item.title.substring(0,42) }} {{item.title.length >= 42 ? `...` : ''}}</h6>
                                        </router-link> -->

                                        <router-link :to="`/single-career-tips/${item.slug}`">
                                            <h6>{{ item.title.substring(0,42) }} {{item.title.length >= 42 ? `...` : ''}}</h6>
                                        </router-link>

                                        <!--<div class="bottom-content">
                                            <ul class="d-flex justify-content-between">
                                                <li>
                                                    <ul>
                                                        <li><i class="flaticon-graduation"></i>{{index+10}}</li>
                                                        <li><i class="flaticon-bubble-chat"></i>{{index+1}}k</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="!career_tips.length" class="card alert alert-danger text-danger text-center">
                            <div class="card-body">
                                <h5 class="card-title">No data available</h5>
                                <p class="card-text">There is no data available to display.</p>
                            </div>
                        </div>
                    </div>
                    <PaginationCCC v-show="career_tips.length" :links='links' @get-data="getData"/>
                </div>
            </div>
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
    import moment from 'moment';
    import { useHead } from '@vueuse/head';
    import PaginationCCC from "../../../components/Ccc/PaginationCCC.vue";
    export default {
        name: "CCCAbout",
        components: { PaginationCCC },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                career_tips: [],
                moment: moment,
                links: []
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            },
        },

        beforeCreate() {
            useHead({title: 'All Career Tips & Tricks | EWU'});
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData(url) {
                let linkUrl = url ? url : `${this.backendUrl}career-tips`;
                axios
                    .get(linkUrl)
                    .then((response) => {
                        this.links = response.data.meta.links
                        this.career_tips = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        },
    };
</script>
