<template>

    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>News Details </h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Pages</li>
                    <li>News Details</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start News Details Area-->
    <div class="news-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <router-view :key="$route.fullPath"></router-view>
                </div>
                <NewsQuickRightSidebar></NewsQuickRightSidebar>
            </div>
        </div>
    </div>
    <!--End News Details Area-->
</template>

<script>
    import NewsQuickRightSidebar from '../../../components/Ccc/NewsQuickRightSidebar.vue';

    export default {
       name: 'NewsSingle',
       components:{
            NewsQuickRightSidebar,
       },
    }
</script>