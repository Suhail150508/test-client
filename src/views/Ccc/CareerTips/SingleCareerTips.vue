<template>
    <div class="news-details">
        <div class="news-simple-card">
            <img :src="singleCareerTips.image" class="w-100" height="400" :alt="singleCareerTips.id">

            <!--<div class="list">
                <ul>
                    <li><i class="flaticon-user"></i>By Admin</li>
                    <li><i class="flaticon-tag"></i>Social Sciences</li>
                </ul>
            </div>-->
            <h2>{{ singleCareerTips.title }}</h2>
            <p v-html="singleCareerTips.body"></p>
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
                    :url="'https://ccc.ewubd.edu/single-career-tips?tipsId=' + singleCareerTips.id"
                    title="Career Tips $ Tricks"
                    description="Career Tips $ Tricks"
                    quote="Thank you"
                    hashtags="CareerTips"
                >
                <i class="ri-facebook-fill circular-icon"></i>
                </ShareNetwork>

                <ShareNetwork
                    network="linkedin"
                    :url="'https://ccc.ewubd.edu/single-career-tips?tipsId=' + singleCareerTips.id"
                    title="Career Tips $ Tricks"
                    description="Career Tips $ Tricks"
                    quote="Thank you"
                    hashtags="CareerTips"
                >
                <i class="ri-linkedin-fill circular-icon"></i>
                </ShareNetwork>

                <ShareNetwork
                    network="twitter"
                    :url="'https://ccc.ewubd.edu/single-career-tips?tipsId=' + singleCareerTips.id"
                    title="Career Tips $ Tricks"
                    description="Career Tips $ Tricks"
                    quote="Thank you"
                    hashtags="CareerTips"
                >
                <i class="ri-twitter-fill circular-icon"></i>
                </ShareNetwork>

            </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'SingleNewsMain',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                singleCareerTips: [],
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
        },

        created() {
            this.pageUrl = window.location.href;
        },

        methods: {
            getData() {
                const careerTipsSlug = this.$route.params.slug;
                axios.get(`${this.backendUrl}career-tips/${careerTipsSlug}`)
                    .then((response) => {
                        this.singleCareerTips = response.data;
                        useHead({title: response.data.title +' '+ '| EWU'})
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>

