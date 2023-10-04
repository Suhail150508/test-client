<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Who should you meet?</h1>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li>Introduction</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Introduction Area-->
    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="news-details">
                        <div class="news-simple-card">
                            <h2 class="center">Who should you meet?</h2>
                            <p v-html="introduction_step_three"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Introduction Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'Introduction',

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                introduction_step_three: '',
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

        beforeCreate() {
            useHead({title: "Introduction | EWU"});
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}introduction/list`)
                .then((response) => {
                    this.introduction_step_three = response.data.step_three.value;
                })
                .catch((e) => {
                    this.$Progress.fail();
                });
            },
        }
    }
</script>