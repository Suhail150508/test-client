<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Resource</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Page</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Academic Details Area-->
    <div class="academics-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="academics-details">
                        <div class="details">
                            <h2>{{resource.title}}</h2>
                             <p v-html="resource.description"></p>
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
                                    :url="'https://ccc.ewubd.edu/resource-single?resourceId=' + resource.id"
                                    title="Resource"
                                    description="Resource"
                                    quote="Thank you"
                                    hashtags="Resource"
                                >
                                <i class="ri-facebook-fill circular-icon"></i>
                                </ShareNetwork>

                                <ShareNetwork
                                    network="linkedin"
                                    :url="'https://ccc.ewubd.edu/resource-single?resourceId=' + resource.id"
                                    title="Resource"
                                    description="Resource"
                                    quote="Thank you"
                                    hashtags="Resource"
                                >
                                <i class="ri-linkedin-fill circular-icon"></i>
                                </ShareNetwork>

                                <ShareNetwork
                                    network="twitter"
                                    :url="'https://ccc.ewubd.edu/resource-single?resourceId=' + resource.id"
                                    title="Resource"
                                    description="Resource"
                                    quote="Thank you"
                                    hashtags="Resource"
                                >
                                <i class="ri-twitter-fill circular-icon"></i>
                                </ShareNetwork>

                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="detgails-right-content">
                        <div class="related-download">
                            <h3>Related Document</h3>
                            <ul>
                                <li v-if="this.attachFile"><a href="#" @click="downloadFile"><i class="flaticon-pdf-file"></i>Download Attachment</a></li>
                                <li v-else><a href="#"><i class="flaticon-pdf-file"></i>No Attachment Available</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Academic Details Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'SingleResource',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,

                resource: [],
                attachFile: '',
                pageUrl:"",
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            this.getData();
            // console.log(this.$route.query.resourceId)
        },

        created(){
            this.pageUrl = window.location.href;
        },

        methods: {
            getData() {
                const resourceSlug = this.$route.params.slug;
                axios.get(`${this.backendUrl}resource/${resourceSlug}`)
                .then((response) => {
                    this.resource = response.data;
                    // console.log(this.resource);
                    useHead({title: response.data.title +' '+ '| EWU'})
                    this.attachFile = response.data.resource_attachment ? response.data.resource_attachment.source : null;
                    // console.log(this.attachFile);
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
            },

            downloadFile() {
                const fileUrl = this.attachFile
                const link = document.createElement('a')
                link.href = fileUrl
                link.setAttribute('download', 'myfile.pdf')
                document.body.appendChild(link)
                link.click()
            }
        }
    }
</script>

