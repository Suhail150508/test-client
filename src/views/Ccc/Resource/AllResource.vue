<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Resources</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>List</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Academics Area-->
    <div class="academics-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="academics-left-content">
                        <div class="row justify-content-center">

                            <div class="col-lg-4 col-sm-6" v-for="item in resources">
                                <div class="single-academics-card3">
                                    <div class="icon">
                                        <i :class="item.icon_class"></i>
                                    </div>
                                    <h3>{{item.title.substring(0,32)}}</h3>
                                    <p>{{item.description.substring(0,42)}}</p>

                                    <!-- <router-link :to="{ path: 'resource-single', query: { resourceId: item.id }}" class="read-more-btn">
                                        Read More<i class="flaticon-next"></i>
                                    </router-link> -->

                                    <router-link class="read-more-btn" :to="`/resource-all/${item.slug}`">
                                        Read More<i class="flaticon-next"></i>
                                    </router-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!--<div class="col-lg-3">
                    <div class="acdemics-right-content">
                        <div class="serch-content">
                            <h3>Search</h3>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Find Your Course">
                                <button type="submit" class="src-btn">
                                    <i class="flaticon-search"></i>
                                </button>
                            </div>
                        </div>
                        <div class="category-content">
                            <h3>Select a Category</h3>
                            <select class="form-select form-control" aria-label="Default select example">
                                <option selected>Select a Category</option>
                                <option value="1">Business</option>
                                <option value="2">Fashion</option>
                                <option value="3">writing</option>
                                <option value="3">Development</option>
                                <option value="3">Marketing</option>
                            </select>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>

    <PaginationCCC v-show="resources.length" :links='links' @get-data="getData"/>
    <!--End Academic Area-->

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
        name: "AllResource",
        components: { PaginationCCC },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,

                resources: [],
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
            useHead({title: 'All Resource | EWU'});
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData(url) {
                let linkUrl = url ? url : `${this.backendUrl}resource`;
                axios
                    .get(linkUrl)
                    .then((response) => {
                        this.links = response.data.meta.links
                        this.resources = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        },
    };
</script>
