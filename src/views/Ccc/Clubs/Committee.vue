<template>
    <!--Start ClubMedia Area-->
    <div class="lates-news-area pt-100 pb-70">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-8 col-md-8">
                    <h3 class="card-title my-3">Executive Committee</h3>
                    <div class="single-news-card" v-for="(committee,index) in committees" >
                        <div class="row">
                            <div class="col-lg-3 col-md-3">
                                <div class="news-img h-100">
                                    <a href="#"><img width="200" height="150" :src="committee.committee_image" :alt="committee.id"></a>
                                </div>
                            </div>
                            <div class="col-lg-9 col-md-9">
                                <div class="news-content">
                                    <a href="#">
                                        <h3><b>{{committee.name}}</b></h3>
                                    </a>
                                    <table class="office-student-welfare-content-table">
                                        <tbody>
                                        <tr>
                                            <td class="card-text"><b>Designation</b></td>
                                            <td> : </td>
                                            <td class="card-text">{{committee.designation.name}}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Duration</b></td>
                                            <td> : </td>
                                            <td>{{moment(committee.date_from).format("YYYY")}} to {{moment(committee.date_to).format("YYYY")}}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Department</b></td>
                                            <td> : </td>
                                            <td>{{committee.department.title}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
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
                
                committees: [],
                moment: moment
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            },
        },

        beforeCreate() {
            useHead({title: `${this.$route.params.shortName} | Executive Committee | EWU`});
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}club-committee/list/`+this.$route.params.shortName)
                    .then((response) => {
                        this.committees = response.data.data;
                        // console.log(response.data.data);
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

        }
    }
</script>