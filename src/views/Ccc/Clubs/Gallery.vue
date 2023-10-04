<template>
    <div class="health-care-area pt-100 pb-70">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-3 col-md-4" v-for="item in galleries" :key="item.id">
                    <div class="single-health-care-card">
                        <div class="img">
                            <a href="#">
                                <img
                                        class="img-fluid img-custom-thumbnail img__img"
                                        :src="item.club_gallery_image"
                                        :alt="item.title"
                                        style="height: 100%"
                                        @click="openImgDialog(item)"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="fullscreenImage" class="fullscreen-overlay">
            <span class="close-button" @click="exitFullscreen">&times;</span>
            <img :src="fullscreenImage.club_gallery_image" class="fullscreen-image" />
        </div>
    </div>
</template>

<script>
    import ClubQuickRightSidebar from "../../../components/Ccc/ClubQuickRightSidebar.vue";
    import axios from "axios";
    import PaginationCCC from "../../../components/Ccc/PaginationCCC.vue";
    import { useHead } from '@vueuse/head';

    export default {
        name: "ClubLayout",
        components: {
            ClubQuickRightSidebar,
            PaginationCCC,
        },
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                galleries: [],
                fullscreenImage: null,
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            },
        },

        beforeCreate() {
            useHead({title: `${this.$route.params.shortName} | Gallery | EWU`});
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData(url) {
                let linkUrl = url ? url : `${this.backendUrl}club-gallery/list/`+this.$route.params.shortName;
                axios
                    .get(linkUrl)
                    .then((response) => {
                        this.galleries = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            openImgDialog(image) {
                this.fullscreenImage = image;
            },
            exitFullscreen() {
                this.fullscreenImage = null;
            },
        },
    };
</script>

<style>
    .fullscreen-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .fullscreen-image {
        max-width: 100%;
        max-height: 100%;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
    }
</style>
