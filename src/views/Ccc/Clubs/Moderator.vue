<template>
    <!--Start ClubMedia Area-->
    <div class="lates-news-area pt-100 pb-70">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-8 col-md-8">
                    <h3 class="card-title my-3">Moderators</h3>
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#present_moderator" role="tab">
                                <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                                <span class="d-none d-sm-block fw-bolder">Present Moderators</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#previous_moderator" role="tab">
                                <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                                <span class="d-none d-sm-block fw-bolder">Previous Moderators</span>
                            </a>
                        </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content p-3 text-muted">
                        <div class="tab-pane active" id="present_moderator" role="tabpanel">
                            <div class="col-lg-12 col-md-12">
                                <div class="single-news-card" v-for="(moderator,index) in prsModerators" >
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3">
                                            <div class="news-img h-100">
                                                <a href="#"><img width="200" height="150" :src="moderator.moderator_image" :alt="moderator.id"></a>
                                            </div>
                                        </div>
                                        <div class="col-lg-9 col-md-9">
                                            <div class="news-content">
                                                <a href="#">
                                                    <h3><b>{{moderator.name}}</b></h3>
                                                </a>
                                                <table class="office-student-welfare-content-table">
                                                    <tbody>
                                                    <tr>
                                                        <td class="card-text"><b>Designation</b></td>
                                                        <td> : </td>
                                                        <td class="card-text">{{moderator.designation.name}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Duration</b></td>
                                                        <td> : </td>
                                                        <td>{{moment(moderator.year_from).format("YYYY")}} to {{moment(moderator.year_to).format("YYYY")}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Department</b></td>
                                                        <td> : </td>
                                                        <td>{{moderator.department.title}}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="previous_moderator" role="tabpanel">
                            <div class="col-lg-12 col-md-12">
                                <div class="single-news-card" v-for="(moderator,index) in prvModerators" >
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3">
                                            <div class="news-img h-100">
                                                <a href="#"><img width="200" height="150" :src="moderator.moderator_image" :alt="moderator.id"></a>
                                            </div>
                                        </div>
                                        <div class="col-lg-9 col-md-9">
                                            <div class="news-content">
                                                <a href="#">
                                                    <h3><b>{{moderator.name}}</b></h3>
                                                </a>
                                                <table class="office-student-welfare-content-table">
                                                    <tbody>
                                                    <tr>
                                                        <td class="card-text"><b>Designation</b></td>
                                                        <td> : </td>
                                                        <td class="card-text">{{moderator.designation.name}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Duration</b></td>
                                                        <td> : </td>
                                                        <td>{{moment(moderator.year_from).format("YYYY")}} to {{moment(moderator.year_to).format("YYYY")}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Department</b></td>
                                                        <td> : </td>
                                                        <td>{{moderator.department.title}}</td>
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
                </div>

                <ClubQuickRightSidebar></ClubQuickRightSidebar>

            </div>
        </div>
    </div>
    <!--End ClubMedia Area-->
</template>

<script>
    import ClubQuickRightSidebar from '../../../components/Ccc/ClubQuickRightSidebar.vue';
    import axios from "axios";
    import moment from 'moment';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'ClubLayout',
        components:{
            ClubQuickRightSidebar,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                prvModerators: [],
                prsModerators: [],
                moment: moment
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            },
        },

        beforeCreate() {
            useHead({title: `${this.$route.params.shortName} | moderator | EWU`});
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}club-moderator/list/`+this.$route.params.shortName)
                    .then((response) => {
                        let prvModerator = [];
                        let prsModerator = [];
                        let i = 0;
                        let j = 0;
                        $(response.data.data).each(function(index, element) {
                            if (element.type == 'previous'){
                                prvModerator[i++] = element;
                            } else if(element.type == 'present'){
                                prsModerator[j++] = element;
                            }
                        });
                        this.prvModerators = prvModerator;
                        this.prsModerators = prsModerator;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

        }
    }
</script>