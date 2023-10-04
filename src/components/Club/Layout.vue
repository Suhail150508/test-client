<template>
    <div id="home">
        <header>
            <!--Strat Top Header Area-->
            <!--<div class="top-header-area top-header-area-club">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-6">
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="header-right-content">
                                <div class="list">
                                    <ul>
                                        <li>
                                            &lt;!&ndash;<button class="btn btn-outline-warning">Become a Member</button>&ndash;&gt;
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            <!--End Top Header Area-->

            <!-- Start Navbar Area -->
            <div class="navbar-area nav-club-bg-1">
                <div class="mobile-responsive-nav">
                    <div class="container">
                        <div class="mobile-responsive-menu">
                            <div class="logo">
                                <a href="#" v-if="clubId">
                                    <img :src="club.header_logo" :alt="club.id" class="main-logo">
                                    <img :src="club.header_logo" :alt="club.id" class="white-logo">
                                </a>
                                <a href="#" v-else>
                                    <img :src="$store.state.clubLogo" :alt="$store.state.alt" class="main-logo">
                                    <img :src="$store.state.clubLogo" :alt="$store.state.alt" class="white-logo">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="desktop-nav">
                    <div class="container-fluid">
                        <nav class="navbar navbar-expand-md navbar-light">
                            <a class="navbar-brand" href="#">
                                <img v-if="clubId" :src="club.header_logo" :alt="club.id">
                                <img v-else :src="$store.state.clubLogo" :alt="$store.state.alt">
                            </a>
                            <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto navbar-nav-club">
                                    <li class="nav-item">
                                        <router-link :to="{path: '/clubs/'+club.short_name}" class="nav-link text-black">
                                            Home
                                        </router-link>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link text-black">Media</a>

                                        <ul class="dropdown-menu">
                                            <li class="nav-item">
                                                <router-link :to="{path:'/clubs/'+club.short_name+'/news'}" class="nav-link text-black">News</router-link>
                                            </li>

                                            <li class="nav-item">
                                                <router-link :to="{path: '/clubs/'+club.short_name+'/events'}" class="nav-link text-black">Events</router-link>
                                            </li>

                                            <li class="nav-item">
                                                <router-link :to="{path:'/clubs/'+club.short_name+'/notice'}" class="nav-link text-black">Notice</router-link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{path: '/clubs/'+club.short_name+'/leaders'}" class="nav-link text-black">Moderator</router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{path: '/clubs/'+club.short_name+'/committee'}" class="nav-link text-black">Executive Committee</router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{path: '/clubs/'+club.short_name+'/about-us'}" class="nav-link text-black">
                                            All Members
                                        </router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{path: '/clubs/'+club.short_name+'/photo-gallery'}" class="nav-link text-black">Gallery</router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{path: '/clubs/'+club.short_name+'/contact'}" class="nav-link text-black">
                                            Contacts
                                        </router-link>
                                    </li>

                                    <!--<li class="nav-item mt-0">
                                        <a href="#" class="nav-link text-black"><i class="flaticon-search"></i></a>
                                    </li>-->

                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

                <!-- <div class="others-option-for-responsive">
                    <div class="container">
                        <div class="dot-menu">
                            <div class="inner">
                                <div class="icon">
                                    <i class="ri-menu-3-fill" data-bs-toggle="modal" data-bs-target="#sidebarModal"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- End Navbar Area -->
        </header>

        <router-view></router-view>

        <!-- Footer Start -->
            <CccFooter></CccFooter>
        <!-- Footer End -->
    </div>
</template>

<script>
import axios from "axios";
import CccFooter from "../Ccc/CccFooter.vue";

export default {
    name: "Layout",
    components: { CccFooter },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            
            // clubId: this.$route.query.clubId,
            clubId: this.$route.params.shortName,
            club:{},
        };
    },

    created() {
        this.loadComponent();
    },

    watch: {
        $route (to, from){
            this.clubId=to.params.shortName;
            this.loadComponent();
        }
    },

    methods:{
        loadComponent(){
            // console.log(this.clubId)
            axios.get(`${this.backendUrl}club/`+this.clubId)
                .then((response) => {
                    this.club = response.data;
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
        },
    },

    beforeCreate() {
        if (typeof window !== 'undefined') {
            // CSS
            let bodyStyle1 = document.createElement('link')
            bodyStyle1.setAttribute('href', '../../../cccAssets/assets/css/bootstrap.min.css')
            bodyStyle1.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle1)

            let bodyStyle2 = document.createElement('link')
            bodyStyle2.setAttribute('href', '../../../cccAssets/assets/css/meanmenu.css')
            bodyStyle2.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle2)

            let bodyStyle3 = document.createElement('link')
            bodyStyle3.setAttribute('href', '../../../cccAssets/assets/css/owl.carousel.min.css')
            bodyStyle3.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle3)

            let bodyStyle4 = document.createElement('link')
            bodyStyle4.setAttribute('href', '../../../cccAssets/assets/css/owl.theme.default.min.css')
            bodyStyle4.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle4)

            let bodyStyle5 = document.createElement('link')
            bodyStyle5.setAttribute('href', '../../../cccAssets/assets/css/magnific-popup.css')
            bodyStyle5.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle5)

            let bodyStyle6 = document.createElement('link')
            bodyStyle6.setAttribute('href', '../../../cccAssets/assets/css/flaticon.css')
            bodyStyle6.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle6)

            let bodyStyle7 = document.createElement('link')
            bodyStyle7.setAttribute('href', '../../../cccAssets/assets/css/remixicon.css')
            bodyStyle7.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle7)

            let bodyStyle8 = document.createElement('link')
            bodyStyle8.setAttribute('href', '../../../cccAssets/assets/css/odometer.min.css')
            bodyStyle8.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle8)

            let bodyStyle9 = document.createElement('link')
            bodyStyle9.setAttribute('href', '../../../cccAssets/assets/css/aos.css')
            bodyStyle9.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle9)

            let bodyStyle10 = document.createElement('link')
            bodyStyle10.setAttribute('href', '../../../cccAssets/assets/css/style.css')
            bodyStyle10.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle10)

            let bodyStyle11 = document.createElement('link')
            bodyStyle11.setAttribute('href', '../../../cccAssets/assets/css/dark.css')
            bodyStyle11.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle11)

            let bodyStyle12 = document.createElement('link')
            bodyStyle12.setAttribute('href', '../../../cccAssets/assets/css/responsive.css')
            bodyStyle12.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle12)

            /*let bodyStyle13 = document.createElement('link')
            bodyStyle13.setAttribute('href', '../../../cccAssets/assets/css/icons.min.css')
            bodyStyle13.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle13)

            let bodyStyle14 = document.createElement('link')
            bodyStyle14.setAttribute('href', '../../../cccAssets/assets/css/app.min.css')
            bodyStyle14.setAttribute('rel', 'stylesheet')
            document.head.appendChild(bodyStyle14)*/

            //script
            let bodyScript1 = document.createElement('script')
            bodyScript1.setAttribute('src', '../../../cccAssets/assets/js/jquery.min.js')
            document.body.appendChild(bodyScript1)

            let bodyScript2 = document.createElement('script')
            bodyScript2.setAttribute('src', '../../../cccAssets/assets/js/bootstrap.bundle.min.js')
            document.body.appendChild(bodyScript2)

            let bodyScript3 = document.createElement('script')
            bodyScript3.setAttribute('src', '../../../cccAssets/assets/js/jquery.meanmenu.js')
            document.body.appendChild(bodyScript3)

            let bodyScript4 = document.createElement('script')
            bodyScript4.setAttribute('src', '../../../cccAssets/assets/js/owl.carousel.min.js')
            document.body.appendChild(bodyScript4)

            let bodyScript5 = document.createElement('script')
            bodyScript5.setAttribute('src', '../../../cccAssets/assets/js/carousel-thumbs.min.js')
            document.body.appendChild(bodyScript5)

            let bodyScript6 = document.createElement('script')
            bodyScript6.setAttribute('src', '../../../cccAssets/assets/js/jquery.magnific-popup.js')
            document.body.appendChild(bodyScript6)

            let bodyScript7 = document.createElement('script')
            bodyScript7.setAttribute('src', '../../../cccAssets/assets/js/aos.js')
            document.body.appendChild(bodyScript7)

            let bodyScript8 = document.createElement('script')
            bodyScript8.setAttribute('src', '../../../cccAssets/assets/js/odometer.min.js')
            document.body.appendChild(bodyScript8)

            let bodyScript9 = document.createElement('script')
            bodyScript9.setAttribute('src', '../../../cccAssets/assets/js/appear.min.js')
            document.body.appendChild(bodyScript9)

            let bodyScript10 = document.createElement('script')
            bodyScript10.setAttribute('src', '../../../cccAssets/assets/js/form-validator.min.js')
            document.body.appendChild(bodyScript10)

            let bodyScript11 = document.createElement('script')
            bodyScript11.setAttribute('src', '../../../cccAssets/assets/js/contact-form-script.js')
            document.body.appendChild(bodyScript11)

            let bodyScript12 = document.createElement('script')
            bodyScript12.setAttribute('src', '../../../cccAssets/assets/js/ajaxchimp.min.js')
            document.body.appendChild(bodyScript12)

            let bodyScript13 = document.createElement('script')
            bodyScript13.setAttribute('src', '../../../cccAssets/assets/js/custom.js')
            document.body.appendChild(bodyScript13)

            /*let bodyScript14 = document.createElement('script')
            bodyScript14.setAttribute('src', '../../../cccAssets/asset/sw.js')
            document.body.appendChild(bodyScript14)*/
        }
    }
}
</script>

<style>
    .top-header-area-club {
        background-color: #007947;
    }
    .desktop-nav .navbar .navbar-nav-club .nav-item a i {
        top: 0px;
    }
    .desktop-nav .navbar .navbar-nav-club .nav-item a {
        color: #007947;
    }
    .nav-club-bg-1 {
        background-color: #FFFFFF;
    }

</style>