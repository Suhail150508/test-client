<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1> Socio-Psyche-Counseling</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li> Socio-Psyche-Counseling</li>
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
                            </div>
                            <p v-html="workshops.description"></p>
                        </div>
                        <div class="tags-and-share">
                            <div class="row align-items-center">
                                <div class="col-lg-8 col-md-8">
                                    <div class="tags">
                                        <ul>
                                            <h5>To continue our founding mission to bring knowledge to Bangladesh</h5>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3">
                                    <!-- <div class="share">
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

                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                <h2>OverView</h2>
                <div class="category-list">
                <h5>Workshop Title</h5>
                <p>This is Workshop Title</p>
                <h5>Start Date</h5>
                <p>10-12-30</p>
                <h5>End Date</h5>
                <p>10-12-30</p>
                <h5>Field</h5>
                <p>Networking</p><br>
            <a type="button" class="btn btn-success" @click="workshopApplication()">Apply For This Socio-Phyche-Cunseling</a>
        </div>
    </div>

    </div>
        </div>
        <vue-progress-bar></vue-progress-bar> <notifications />
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    import HomeQuickRightSidebar from '../../../components/Ccc/HomeQuickRightSidebar.vue';
    export default {
        name: 'CCCAbout',
        components:{
            HomeQuickRightSidebar,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                workshops: [],
                user_id: Cookies.get('authIdCookie'),
                workshop_id: this.$route.query.workshopId,
                  // workshop id and user id 
                    workshopApplicationData: {
                        user_id: Cookies.get('authIdCookie'),
                        workshop_id: this.$route.query.workshopId,
                        application_type: "Workshop",
                    },
		        // end
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
        const socioPsycheCounselingSlug = this.$route.params.slug;
		axios.get(`${this.backendUrl}workshop/${socioPsycheCounselingSlug}`)
			.then((response) => {
                this.$Progress.finish();
			    this.workshops = response.data;
                useHead({title: response.data.title +' '+ '| EWU'})
			})
			.catch((e) => {
				this.$Progress.fail();
			});
		},
	// end 
    // start Workshop Application 
    workshopApplication(){
        if(this.user_id) {
            this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You want to apply for this Socio-Phyche-Counseling!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Apply!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                            axios.
                            post(`${this.backendUrl}workshop/application`,this.workshopApplicationData)
                                .then((response) => {
                                this.$notify({ type: response.data.status, title: response.data.status, text: response.data.message });
                            })
                            .catch(($e) => {
                        });
                }
            })
        }else{
            alert('Logged in your account')
            let workshop_id = this.workshop_id;
            const param1 = 'workshop';
            const param2 = workshop_id;
            const url = `http://jobportal-live.fscd.xyz/loginprofile?from=${param1}&id=${param2}`;
            window.location.href = url;
        }
	},
	// end 
        }
    }
</script>