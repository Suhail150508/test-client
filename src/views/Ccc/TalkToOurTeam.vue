<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Talk To Our Team</h1>

                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Talk To Our Team</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Health Care Area-->
    <div class="health-care-area" style="padding-top: 30px;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-3 col-md-6" v-for="studentWelfare in studentWelfares">
                    <div class="single-health-care-card m-3">
                        <div class="img bg-EBF4FF text-center" style="padding: 10px;">
                            <a href="#">
                                <img style="width: 50mm; height: 50mm" :src="studentWelfare.student_welfare ? studentWelfare.student_welfare.source : '' " :alt="$store.state.alt">
                            </a>
                        </div>
                        <div class="health-care-content" style="height: 165px;">
                            <a href="#">
                                <h6><b>{{studentWelfare.name}}</b></h6>
                            </a>
                            <table class="office-student-welfare-content-table" style="font-size: 12px">
                                <tbody>
                                    <tr>
                                        <td class="card-text"><b>Designation:</b></td>
                                        <td class="card-text">{{studentWelfare.designation.name}}</td>
                                    </tr>
                                    <!-- <tr>
                                        <td><b>Contact Hours:</b></td>
                                        <td class="text-uppercase"> {{studentWelfare.contact_hours_from}}<strong>-</strong>{{studentWelfare.contact_hours_to}}</td>
                                    </tr> -->
                                    <tr>
                                        <td><b>Contact No:</b></td>
                                        <td>{{studentWelfare.contact_no}}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <!--<a href="health-care-details.html"><h3>Happiness Begins With A Good Health</h3></a>
                            <p>Lorem ipsum dolor sit amet con sec teturo adip iscing elit sed do eiusmod tempor insi didunt ut labore et dolore</p>
                            <a href="health-care.html" class="read-more-btn">Read More on healthcare<i class="flaticon-next"></i></a>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <PaginationCCC v-show="studentWelfares.length" :links='links' @get-data="getData"/>
    <!--End Health Care Area-->

    <!--Start student welfare Area-->
    <!--<div class="lates-news-area pt-100 pb-70">
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-8">
                <div class="single-news-card" v-for="studentWelfare in studentWelfares" >
                    <div class="row">
                        <div class="col-lg-3 col-md-3">
                            <div class="news-img h-100">
                                <a href="#"><img width="200" height="150" :src="studentWelfare.image" :alt="$store.state.alt"></a>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-9">
                            <div class="news-content">
                                <a href="news-details.html">
                                    <h3><b>{{studentWelfare.name}}</b></h3>
                                </a>
                                <table class="office-student-welfare-content-table">
                                    <tbody>
                                    <tr>
                                        <td class="card-text"><b>Designation</b></td>
                                        <td>:</td>
                                        <td class="card-text">{{studentWelfare.name}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Contact Hours</b></td>
                                        <td>:</td>
                                        <td class="text-uppercase">{{studentWelfare.contact_hours_from}} to {{studentWelfare.contact_hours_to}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Contact No</b></td>
                                        <td>:</td>
                                        <td>{{studentWelfare.contact_no}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Socile Links</b></td>
                                        <td>:</td>
                                        <td>---</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>-->
    <!--<div class="alumni-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="alumni-left-content">
                        <h3>Student Welfare</h3>
                        <div class="single-alumni-events-card" v-for="studentWelfare in studentWelfares">
                            <div class="row align-items-center" >
                                <div class="col-lg-5 col-md-5">
                                    <div class="alumni-img">
                                        <img :src="$store.state.image" :alt="Image">
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <div class="alumni-content">
                                        <div class="time">
                                            <p><i class="flaticon-time"></i>{{studentWelfare.contact_hours_from}} - {{studentWelfare.contact_hours_to}}</p>
                                        </div>
                                        <h3>{{studentWelfare.name}}</h3>
                                        <div class="location">
                                            <p><i class="ri-map-pin-line"></i>{{studentWelfare.name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="alumni-left-content">
                        <h3></h3>
                        <div class="single-alumni-events-card">
                            <div class="row align-items-center">
                                <div class="col-lg-5 col-md-5">
                                    <div class="alumni-img">
                                        <img :src="$store.state.image" :alt="Image">
                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-7">
                                    <div class="alumni-content">
                                        <div class="time">
                                            <p><i class="flaticon-time"></i>1:00 pm - 1:00 pm</p>
                                        </div>
                                        <h3>Fintech & Key Investment Conference</h3>
                                        <div class="location">
                                            <p><i class="ri-map-pin-line"></i>Sanu Grand Hall</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
    <!--End student welfare Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import PaginationCCC from "../../components/Ccc/PaginationCCC.vue";
    export default {
        name: 'TalkToOurTeam',
        components: { PaginationCCC },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                studentWelfares: [],
                links: []
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        beforeCreate() {
            useHead({title: 'Talk To Our Team | EWU'});
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData(url) {
                console.log(url)
                let linkUrl = url ? url : `${this.backendUrl}student-welfare`;
                axios.get(linkUrl)
                    .then((response) => {
                        this.links = response.data.links
                        this.studentWelfares = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>
