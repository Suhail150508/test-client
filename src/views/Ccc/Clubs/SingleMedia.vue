<template>

    <div class="health-details">
        <div class="top-content">
            <h2>{{singleMedia.title}}</h2>
            <p v-if="singleMedia.type == 'news'"><small class="vert-middle text-warning" style="margin-top: 1px;">{{moment(singleMedia.news_date).format('ll')}}</small> </p>
            <p v-if="singleMedia.type == 'events'">
                <small class="vert-middle text-warning" style="margin-top: 1px; line-height: 0.5">
                    {{moment(singleMedia.date_from).format('ll')}} - {{moment(singleMedia.date_to).format('ll')}} <br>
                    <i class="ri-map-pin-line"></i> {{singleMedia.c_address}} <br>
                    {{singleMedia.c_email}}, {{singleMedia.c_phone}}
                </small>
            </p>
            <p v-if="singleMedia.type == 'notice'"><small class="vert-middle text-warning" style="margin-top: 1px;">{{moment(singleMedia.notice_date).format('ll')}}</small> </p>
            <hr>
            <img :src="singleMediaImage" width="850" height="500" :alt="singleMedia.id">
        </div>
        <div class="madical-care-content">
            <div v-html="singleMedia.description">

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
        import { useHead } from '@vueuse/head';

    export default {
        name: 'SingleClub',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                clubId: this.$route.query.clubId,
                singleMedia: [],
                singleMediaImage: "",
                moment: moment,
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

        methods: {
            getData() {
                axios.get(`${this.backendUrl}club-media/`+this.$route.params.sluggableTitle)
                    .then((response) => {
                        this.singleMedia = response.data;
                        this.singleMediaImage = response.data.club_media_photo.source;
                        // console.log(response.data)
                        useHead({title: `${response.data.title} | ${response.data.type} | EWU`})
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>
