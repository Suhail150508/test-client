<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>CCC-Updates</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>CCC-Updates</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start News Details Area-->
    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="news-simple-card">
                        <img :src="cccUpdates.image" class="w-100" height="400" :alt="cccUpdates.id">
                        <h2 class="mt-4">{{ cccUpdates.title }}</h2>
                        <p v-html="cccUpdates.description"></p>
                        <hr>
                        <p class="text-dark float-end">
                            Share with:
                            <!-- <ShareNetwork
                                    network="facebook"
                                    url="pageUrl"
                                    title="Graduate profile"
                                    description="Graduate registration"
                                    quote="Thank you"
                                    hashtags="graduate,alumni"
                            >
                                <i class="ri-facebook-fill circular-icon"></i>
                            </ShareNetwork>

                            <ShareNetwork
                                    network="linkedin"
                                    url="pageUrl"
                                    title="Graduate profile"
                                    description="Graduate registration"
                                    quote="Thank you"
                                    hashtags="graduate,alumni"
                            >
                                <i class="ri-linkedin-fill circular-icon"></i>
                            </ShareNetwork>

                            <ShareNetwork
                                    network="twitter"
                                    url="pageUrl"
                                    title="Graduate profile"
                                    description="Graduate registration"
                                    quote="Thank you"
                                    hashtags="graduate,alumni"
                            >
                                <i class="ri-twitter-fill circular-icon"></i>
                            </ShareNetwork> -->

                            <ShareNetwork
                                network="facebook"
                                :url="'https://ccc.ewubd.edu/single-updates?updatesId=' + cccUpdates.id"
                                title="CCC Updates"
                                description="CCC Updates"
                                quote="Thank you"
                                hashtags="CCCUpdates"
                            >
                            <i class="ri-facebook-fill circular-icon"></i>
                            </ShareNetwork>

                            <ShareNetwork
                                network="linkedin"
                                :url="'https://ccc.ewubd.edu/single-updates?updatesId=' + cccUpdates.id"
                                title="CCC Updates"
                                description="CCC Updates"
                                quote="Thank you"
                                hashtags="CCCUpdates"
                            >
                            <i class="ri-linkedin-fill circular-icon"></i>
                            </ShareNetwork>

                            <ShareNetwork
                                network="twitter"
                                :url="'https://ccc.ewubd.edu/single-updates?updatesId=' + cccUpdates.id"
                                title="CCC Updates"
                                description="CCC Updates"
                                quote="Thank you"
                                hashtags="CCCUpdates"
                            >
                            <i class="ri-twitter-fill circular-icon"></i>
                            </ShareNetwork>

                        </p>
                    </div>
                </div>
                <NewsQuickRightSidebar></NewsQuickRightSidebar>
            </div>
        </div>
    </div>
    <!--End News Details Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import NewsQuickRightSidebar from '../../../components/Ccc/NewsQuickRightSidebar.vue';
    export default {
        name: 'SingleNewsMain',
        components:{
            NewsQuickRightSidebar,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                cccUpdates: [],
                testImage:"",
                pageUrl:"",
                testStyle:"margin-left: 10px; border: 3px solid rgb(148, 142, 145);",
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

        // created() {
        //     this.pageUrl = window.location.href;
        //     axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'cccUpdateSingleView' } })
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
            async getData() {
                try {
                    const cccSingleUpdates = this.$route.params.slug; // Access the dynamic route parameter
                    const response = await axios.get(`${this.backendUrl}ccc-updates/${cccSingleUpdates}`);
                    this.cccUpdates = response.data;
                    console.log(this.cccUpdates);
                    useHead({ title: response.data.title + ' | EWU' });
                    this.testImage = response.data.image;
                } catch (error) {
                    console.error(error);
                    this.$Progress.fail();
                }
            },
        },

     

    }

   
</script>

