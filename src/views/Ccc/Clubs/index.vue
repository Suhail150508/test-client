<template>

    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Clubs </h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>Clubs</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Club Area-->
    <!--<div class="health-care-area ptb-100 bg-f4f6f9">
        <div class="container">
            <div class="section-title">
                <h2>Students' Welfare Department</h2>
                <p>Students' Welfare Department is a rendezvous spot for students of East West University so that they can participate in various aspects of academic life.</p>
            </div>
            <div class="row justify-content-center">
                <div class="row row-cols-1 row-cols-md-3 g-4">

 &lt;!&ndash; <div class="col-lg-3 col-md-3 mb-5 mt-5" v-for="(club, index) in clubs"> &ndash;&gt;
            <div v-for="(club, index) in clubs" class="col">
                <div class="card h-100">
                    <div class="text-center p-3 col-md-12">

                        <a href="#"><img class="fit-content" height="150"  :src="club.image" :alt="club.id"></a>
                    </div>
                <div style="background-color: #f5f5f5; border-style: outset;" class="card-body">
                    <h5 class="card-title">
                        <router-link :to="{ path: 'single-club', query: { clubId: club.id }}">
                                    <h3>{{ club.title }}</h3>
                        </router-link>
                        <router-link :to="{ path: 'single-club', query: { clubId: club.id }}" class="read-more-btn">
                                    Read More on this club<i class="flaticon-next"></i>
                        </router-link>
                    </h5>
                    &lt;!&ndash; <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> &ndash;&gt;
                </div>
                &lt;!&ndash; <button class="btn btn-secondary">VISIT NOW</button> &ndash;&gt;
                </div>
            </div>



            </div>
            </div>
            &lt;!&ndash;<div class="more-health-care style2 text-center">
                <p>Select From Hundreds of Options. <a href="#" class="read-more-btn active">More on healthcare<i class="flaticon-next"></i></a></p>
            </div>&ndash;&gt;
        </div>
    </div>-->
    <!--End Club Area-->


    <!--Start Club Area-->
     <div class="health-care-area ptb-100 bg-f4f6f9">
        <div class="container">
            <div class="section-title">
                <h2>Students' Welfare Department</h2>
                <p>Students' Welfare Department is a rendezvous spot for students of East West University so that they can participate in various aspects of academic life.</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-3 col-md-6 col-sm-6 mb-5 mt-5" v-for="(club, index) in clubs">
                    <div class="single-health-care-card bg-white">
                        <a href="#"><img :src="club.club_main_logo ? club.club_main_logo.source : ''" :alt="club.id" style="height: 220px;padding:30px;display: block; margin: auto;"></a>
                        <div class="img">
                            <div class="health-care-content" style="height: 120px">
                                <router-link :to="{ path: '/clubs/'+club.short_name}">
                                    <h5>{{ club.title }}</h5>
                                </router-link>
                                <router-link :to="{ path: '/clubs/'+club.short_name}" class="read-more-btn">
                                    Read More on this club<i class="flaticon-next"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!--End Club Area-->
</template>

<script>
    import axios from 'axios';
    import { useHead } from '@vueuse/head';

    export default {
        name: 'ClubsIndex',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                clubs: [],
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        created() {
            this.getData();
        },

        beforeCreate() {
            useHead({title: 'All Clubs | EWU'});
        },

        methods: {
            getData() {
                let linkUrl =`${this.backendUrl}club`;
                axios.get(linkUrl)
                    .then((response) => {
                        this.clubs = response.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>

<style>
    .single-health-care-card.style1 .health-care-content {
        max-width: 300px;
        border-bottom: 4px solid #1C4370;
    }
    .single-health-care-card .health-care-content {
        padding-bottom: 20px;
    }
img {
  max-width: 100%;
}
</style>
