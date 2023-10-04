<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Guidelines</h1>

                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>List</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Guideline Area-->
    <div class="academic-area pt-100 pb-70">
        <div class="container">
            <div class="section-title">
                <h2>Guidelines</h2>
                <p>Related topics for Guideline</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6" data-aos-duration="1200" data-aos-delay="200" data-aos-once="true" v-for="guideline in guidelines">
                    <div class="single-academics-card" >
                        <div class="academic-top-content">
                            <i class="flaticon-writing-tool"></i>
                            <a href="#"><h3>{{guideline.title.substr(0,30)}}</h3></a>
                        </div>
                        <p v-html="guideline.description.substr(0,100)"></p>
                        <router-link :to="{ name: 'GuidelineSingle', query: { guideId: guideline.id }}" class="read-more-btn">{{guideline.title.substr(0,25)}}<i class="flaticon-next"></i></router-link>
<!--                        <a href="#" class="read-more-btn">{{guideline.title.substr(0,25)}}<i class="flaticon-next"></i></a>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Guideline Area-->
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
    import PaginationCCC from "../../../../components/Ccc/PaginationCCC.vue";
    export default {
        name: "AllGuidelines",
        components: { PaginationCCC },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                guidelines: [],
                moment: moment,
                links: []
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            },
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData(url) {
                let linkUrl = url ? url : `${this.backendUrl}guideline`;
                axios
                    .get(linkUrl)
                    .then((response) => {
                        this.links = response.data.meta.links
                        this.guidelines = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        },
    };
</script>
