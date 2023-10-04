<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>{{noticeEvent.title}}</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Notice-Event</li>
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
                    <div class="news-details bg-f4f6f9 p-3">
                        <div class="news-simple-card">
                            <div class="d-flex justify-content-between">
                                <div style="font-size: 15px; font-weight: bold;">
                                    <i class="flaticon-writing-tool"></i> {{moment(noticeEvent.date).format('ll')}}
                                </div>

                                <div style="font-size: 15px; font-weight: bold;">
                                    <i class="flaticon-time"></i> {{ moment(noticeEvent.time,["HH.mm"]).format('hh:mm A') }}
                                </div>
                            </div>
                            
                            <div class="news-simple-card mt-4">
                                <h2>{{noticeEvent.title}}</h2>
                                <p v-html="noticeEvent.description"></p>
                            </div>

                            <div v-if="noticeEvent.document_source">
                                <a href="#" @click="downloadFile"><i class="flaticon-pdf-file"></i>Download Attachment</a>
                            </div>
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
                                                        <table style="width: 100%;">
                                                        <tbody>
                                                            <tr>
                                                            <td style="font-size: 15px; font-weight: bold;">
                                                                <i class="flaticon-writing-tool"></i> {{ moment(noticeEvent.date).format('ll') }}
                                                            </td>
                                                            <td style="font-size: 15px; font-weight: bold; text-align: right;">
                                                                <i class="flaticon-time"></i> {{ moment(noticeEvent.time,["HH.mm"]).format('hh:mm A') }}
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                        </table>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><h2>{{noticeEvent.title}}</h2></td>
                                                </tr>

                                                <tr>
                                                    <td v-html="noticeEvent.description"></td>
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
                    </div>

                    <div class="news-details">
                        <div class="news-simple-card">
                            <p class="text-dark float-end">
                                Share with:
                                <a href="#" type="btn" @click="printContent"><i class="fa fa-print circular-icon"></i></a>

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
                                    :url="'https://ccc.ewubd.edu/notice-event?id=' + noticeEvent.id"
                                    title="Notice event"
                                    description="Notice event"
                                    quote="Thank you"
                                    hashtags="Notice"
                                >
                                <i class="ri-facebook-fill circular-icon"></i>
                                </ShareNetwork>

                                <ShareNetwork
                                    network="linkedin"
                                    :url="'https://ccc.ewubd.edu/notice-event?id=' + noticeEvent.id"
                                    title="Notice event"
                                    description="Notice event"
                                    quote="Thank you"
                                    hashtags="Notice"
                                >
                                <i class="ri-linkedin-fill circular-icon"></i>
                                </ShareNetwork>

                                <ShareNetwork
                                    network="twitter"
                                    :url="'https://ccc.ewubd.edu/notice-event?id=' + noticeEvent.id"
                                    title="Notice event"
                                    description="Notice event"
                                    quote="Thank you"
                                    hashtags="Notice"
                                >
                                <i class="ri-twitter-fill circular-icon"></i>
                                </ShareNetwork>

                            </p>
                        </div>
                    </div>
                </div>
                <HomeQuickRightSidebar></HomeQuickRightSidebar>

            </div>

        </div>
    </div>
    <!--End News Details Area-->
</template>

<script>
    import axios from 'axios';
    import PrintPageHeader from './../../components/PrintPageHeaderComponent.vue';
    import { useHead } from '@vueuse/head';
    import HomeQuickRightSidebar from '../../components/Ccc/HomeQuickRightSidebar.vue';
    import moment from 'moment';

    export default {
        name: 'CCCAbout',
        components:{
            HomeQuickRightSidebar,
            PrintPageHeader,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                moment: moment,
                noticeEvent: [],
                pageUrl:"",
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            console.log(this.$route.query.id)
            this.getData();
        },

        created() {
            this.pageUrl = window.location.href;
            axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'noticeEventSingleView' } })
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
            async getData() {
                try {
                    const noticeEventSlug = this.$route.params.slug; // Access the dynamic route parameter
                    const response = await axios.get(`${this.backendUrl}notice-event/${noticeEventSlug}`);

                    this.noticeEvent = response.data;
                    useHead({ title: response.data.title + ' | EWU' });
                } catch (error) {
                    console.error(error);
                    this.$Progress.fail();
                }
            },

            downloadFile() {
                const fileUrl = this.noticeEvent.document_source;
                const link = document.createElement('a')
                link.href = fileUrl
                link.setAttribute('download', 'myfile.pdf')
                document.body.appendChild(link)
                link.click()
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
        }
    }
</script>