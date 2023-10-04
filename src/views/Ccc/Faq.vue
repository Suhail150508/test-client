<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>FAQs</h1>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li>FAQs</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Faq Area-->
    <div class="faq-area ptb-100">
        <div class="container">
            <div class="row align-items-center">

                <!--<div class="col-lg-6">
                    <div class="faq-image pr-20">
                        <img :src="$store.state.image" :alt="Image">
                    </div>
                </div>-->
                <div class="col-lg-12">
                    <div class="faq-left-content pl-20">
                        <div class="faq-title">
                            <h2>Need To Ask Some Questions Or Check Questions</h2>
                            <!--<p>There are many variations of passages of Lorem Ipsum available, but the majority in injected humour, randomised words don't look believable</p>-->
                        </div>
                        <div class="accordion" id="accordionExample" v-for="(faq,index) in faqs">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+index" aria-expanded="true" :aria-controls="'collapse'+index">
                                        {{index+1}}. {{faq.question}}
                                    </button>
                                </h2>
                                <div :id="'collapse'+index" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        {{faq.answer}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Faq Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    export default {
        name: 'Faq',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                faqs: [],
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
            useHead({title: "FAQ | EWU"});
        },

        created() {
            axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'cccFaq' } })
            .then(response => {
                useHead({
                    // title: response.data.data ? response.data.data.title : '',
                    meta: [
                        {name: 'keywords', content: response.data.data ? response.data.data.keywords : ''},
                        {name: 'description', content: response.data.data ? response.data.data.description : ''}
                    ],
                })
            })
            .catch(error => {
                console.error(error)
            })
        },

        methods: {
            getData() {
                let linkUrl =`${this.backendUrl}ccc-faq`;
                axios.get(linkUrl)
                    .then((response) => {
                        console.log(response);
                        this.faqs = response.data;
                    })
                    .catch((e) => {
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>