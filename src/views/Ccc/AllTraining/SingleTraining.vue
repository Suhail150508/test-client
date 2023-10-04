<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Training-Workshop-Seminar</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Training-Workshop-Seminar</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start News Details Area-->
    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="news-details">
                        <div class="news-simple-card">
                            <div class="list">
                                <img v-if="training_image" :src="training_image" class="w-100" height="450" :alt="trainings.id">
                            </div>
                            <p v-html="trainings.description"></p>
                        </div>
                        
                        <!-- <div class="tags-and-share">
                            <div class="row align-items-center">
                                <div class="col-lg-3 col-md-3">
                                    <div class="share">
                                        <ul>
                                            <li><span>Share :</span></li>
                                            <li>
                                                <a href="https://www.facebook.com" target="_blank"><i class="flaticon-facebook"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.twitter.com" target="_blank"><i class="flaticon-twitter"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://instagram.com/?lang=en" target="_blank"><i class="flaticon-instagram"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://linkedin.com/?lang=en" target="_blank"><i class="flaticon-linkedin"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>

                <div class="col-lg-3">
                    <h2>OverView</h2>
                    <div class="category-list">
                        <h5>Trianing Title</h5>
                        <p>{{ trainings.title }}</p>
                        <h5>Start Date</h5>
                        <p>{{ trainings.start_date }}</p>
                        <h5>End Date</h5>
                        <p>{{ trainings.end_date }}</p>
                        <a type="button" class="btn btn-success" @click="trainingApplication()">Apply For This Training-workshop-seminar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <vue-progress-bar></vue-progress-bar> 
    <notifications />
</template>

<script>
    import axios from 'axios';
    import Cookies from 'js-cookie'
    import { useHead } from '@vueuse/head';
    export default {
        name: 'CCCAbout',
        components:{ },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                trainings: [],
                training_image: '',
                user_id: Cookies.get('authIdCookie'),
                training_id: this.$route.query.trainingId,
                trainingApplicationData: {
                    user_id: Cookies.get('authIdCookie'),
                    training_id: this.$route.query.trainingId,
                    application_type:"Training",  
                },
            };
        },
     
        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            console.log("Component mounted.");
            this.getData();
        },

        methods: {
            // get job details data 
            getData() {
                this.$Progress.start();
                const trainingSlug = this.$route.params.slug;
                axios.get(`${this.backendUrl}training/${trainingSlug}`)
                .then((response) => {
                    this.$Progress.finish();
                    this.trainings = response.data.training;
                    this.training_image = response.data.training_image;
                    useHead({title: response.data.training.title +' '+ '| EWU'})
                })
                .catch((e) => {
                    this.$Progress.fail();
                });
            },
            // end 

            // start job Workshop Application 
            trainingApplication(){
                if(this.user_id) {
                    this.$swal.fire({
                        title: 'Are you sure?',
                        text: "You want to apply for this Training-Workshop-seminar!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Apply!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.post(`${this.backendUrl}training/application`,this.trainingApplicationData)
                            .then((response) => {
                                this.$notify({ type: response.data.status, title: response.data.status, text: response.data.message });
                            })
                            .catch(($e) => {
                            });
                        }
                    })
                }else{
                    // alert('Logged in your account')
                    let training_id = this.training_id;
                    const param1 = 'training';
                    const param2 = training_id;
                    const url = ` http://jobs1.ewubd.edu/loginprofile?from=${param1}&id=${param2}`;
                    window.location.href = url;
                }
            },
            // end 
        }
    }
</script>