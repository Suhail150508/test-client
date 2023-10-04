<template>
    <div class="health-details">
        <div class="madical-care-content">
            <div v-html="aboutClub.about">

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'AboutClub',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                aboutClub: [],
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
                axios.get(`${this.backendUrl}club/`+this.$route.params.shortName)
                    .then((response) => {
                        this.aboutClub = response.data;
                        useHead({title: response.data.title +' '+ '| About | EWU'})
                        console.log(response.data.title);
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>