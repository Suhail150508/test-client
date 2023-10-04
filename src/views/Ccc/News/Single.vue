<template>
    <div class="news-details">
        <div class="news-simple-card">
            <img v-if="singleNews.images" :src="singleNews_image" class="w-100 h-100"  :alt="singleNews.id">

            <div class="row mb-4">
                <div  style="margin-left: 10px;" v-for="(item,index) in singleNews.images" class="col-md-1 p-0">
                    <!-- <img :src="item.source" style="margin-left: 10px; border: 2px solid rgba(20, 11, 15, 0.808); background-color: antiquewhite;"  class="w-10 mt-2 mb-3" height="60"  @click="say(item)"> -->
                    <img :src="item.source" style="margin-left: 10px; border: 3px solid rgba(20, 11, 15, 0.808); background-color: antiquewhite;"   class="w-10 mt-2 mb-3" height="60"  @click="say(item)">
                </div>
            </div>

            <h2>{{ singleNews.title }}</h2>
            <p v-html="singleNews.description"></p>
        </div>

        <div class="news-simple-card d-none" ref="printContentElement">
            <div class="header">
                <img :src="$store.state.cccLogo" :alt="$store.state.alt" class="main-logo">
            </div>

            <table > 
                <thead>
                    <tr>
                        <td style="height: 2cm">
                            <!-- Leave this empty and don't remove it. This space is where header placed on print -->
                        </td>
                    </tr>
                </thead>

                <tr>
                    <td>
                        <table class="print-content">
                            <tbody>
                                <tr>
                                    <td>
                                        <img v-if="singleNews.images" :src="singleNews_image" class="w-100 h-100 print-img"  :alt="singleNews.id">
                                    </td>
                                </tr>
                                <tr>
                                    <td><h2>{{singleNews.title}}</h2></td>
                                </tr>
                                <tr>
                                    <td v-html="singleNews.description"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tfoot>
                    <tr>
                        <td style="height: 2cm">
                            <!-- Leave this empty and don't remove it. This space is where footer placed on print -->
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div class="footer">
                Contact No: 55046678, 09666775577, 01755587224 || Email: info@ewubd.edu || Website: https://www.ewubd.edu || Address: A/2, Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar, Dhaka-1212, Bangladesh
            </div>
        </div>

        <hr>
        <p class="text-dark float-end">
            Share with:
            <a href="#" type="btn" @click="printContent"><i class="fa fa-print circular-icon"></i></a>

            <!-- <ShareNetwork
                network="facebook"
                :url="pageUrl"
                title="Special News"
                description="Special News"
                quote="Thank you"
                hashtags="Special, News"
            >
            <i class="ri-facebook-fill circular-icon"></i>
            </ShareNetwork> -->

            <ShareNetwork
                network="facebook"
                :url="'https://ccc.ewubd.edu/special-news?newsId=' + singleNews.id"
                title="Special News"
                description="Special News"
                quote="Thank you"
                hashtags="Special, News"
            >
            <i class="ri-facebook-fill circular-icon"></i>
            </ShareNetwork>

            <!-- <ShareNetwork
                network="linkedin"
                :url="pageUrl"
                title="Special News"
                description="Special News"
                quote="Thank you"
                hashtags="Special, News"
            >
            <i class="ri-linkedin-fill circular-icon"></i>
            </ShareNetwork> -->

            <ShareNetwork
                network="linkedin"
                :url="'https://ccc.ewubd.edu/special-news?newsId=' + singleNews.id"
                title="Special News"
                description="Special News"
                quote="Thank you"
                hashtags="Special, News"
            >
            <i class="ri-linkedin-fill circular-icon"></i>
            </ShareNetwork>

            <!-- <ShareNetwork
                network="twitter"
                :url="pageUrl"
                title="Special News"
                description="Special News"
                quote="Thank you"
                hashtags="Special, News"
            >
            <i class="ri-twitter-fill circular-icon"></i>
            </ShareNetwork> -->

            <ShareNetwork
                network="twitter"
                :url="'https://ccc.ewubd.edu/special-news?newsId=' + singleNews.id"
                title="Special News"
                description="Special News"
                quote="Thank you"
                hashtags="Special, News"
            >
            <i class="ri-twitter-fill circular-icon"></i>
            </ShareNetwork>
        </p>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import PrintPageHeader from './../../../components/PrintPageHeaderComponent.vue';

    export default {
        name: 'SingleNewsMain',
        components: {
            PrintPageHeader,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                singleNews: [],
                singleNews_image:"",
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
        created(){
            this.pageUrl = window.location.href;
            // console.log(this.pageUrl);
        },

        methods: {
            async getData() {
                try {
                    const newsSlug = this.$route.params.slug; // Access the dynamic route parameter
                    const response = await axios.get(`${this.backendUrl}news/${newsSlug}`);
                    this.singleNews = response.data;
                    useHead({ title: response.data.title + ' | EWU' });
                    this.singleNews_image = response.data.images[0].source;
                } catch (error) {
                    console.error(error);
                    this.$Progress.fail();
                }
            },

            printContent() {
                const printWindow = window.open('', '_blank');
                printWindow.document.write('<html><head><title>Print</title>');
                printWindow.document.write('<style>');
                printWindow.document.write(`
                    .header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                        border-bottom: 1px solid #d1d1d1;
                        padding-bottom: 3px;
                    }

                    .print-img {
                        text-align: center;
                        height: 200px;
                        width: 50% !important;
                        display: block;
                        margin: 0 auto 20px;
                    }

                    .footer {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                        font-weight: bold;
                        font-size: 14px;
                        // border-top: 1px solid;
                        // padding-top: 5px;
                    }
                `);
                printWindow.document.write('</style></head><body>');
                printWindow.document.write(this.$refs.printContentElement.innerHTML);

                printWindow.document.write('</body></html>');
                printWindow.document.close();

                // Wait for images to load before printing
                printWindow.addEventListener('load', () => {
                    printWindow.print();
                    printWindow.close();
                });             
            },
            
            say(even){
                this.singleNews_image = event.target.src;
            }
        }
    }
</script>

