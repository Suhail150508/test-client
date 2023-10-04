<template>
    
    <!--Start Letest News Area-->
    <div class="col-lg-4">

        <div  class="category-content">
            <h3>Select a Type</h3>
            <select v-model="selectedType" class="form-select form-control" aria-label="Default select example" @change="getType($event)">
                <option value="">Select One</option>
                <option value="General">General</option>
                <option value="Semester wise">Semester wise</option>
                <option value="Annual">Annual</option>
                <option value="Gallery">Gallery</option>
            </select>

            <div v-if="sub_type_visibility" class="mt-4">
                <h3>Select a Sub Type</h3>
                <select v-model="selectedSubType" class="form-select form-control" aria-label="Default select example" @change="getType($event)">
                    <option value="">Select One</option>
                    <option :value="year" v-for="year in years" :key="year">{{ year }}</option>

                    <!-- <option value="">Select One</option>
                    <option value="Spring">Spring</option>
                    <option value="Fall">Fall</option>
                    <option value="Summer">Summer</option> -->
                </select>
            </div>
        </div>

        <div class="category-list">
            <h3>Related Links</h3>
            <ul>
                <li><router-link :to="{ name: 'Ccc-about' }">About CCC<i class="ri-arrow-drop-right-fill"></i></router-link></li>
                <li><router-link :to="{ name: 'noticeEvent' }">Notice <i class="ri-arrow-drop-right-fill"></i></router-link></li>
                <li><router-link :to="{ name: 'Ccc-updates' }">CCC-Updates <i class="ri-arrow-drop-right-fill"></i></router-link></li>
                <li><router-link :to="{ name: 'noticeEvent' }">Events <i class="ri-arrow-drop-right-fill"></i></router-link></li>
                <li><router-link :to="{ name: 'AllNews' }">News <i class="ri-arrow-drop-right-fill"></i></router-link></li>
            </ul>
        </div>

        <div class="related-post-area">
            <h3>Related News</h3>
            <div class="related-post-box" v-for="item in news">
                <div class="related-post-content mb-3">
                    <!-- {{item.images[0].source }} -->
                    <!-- <router-link :to="{ path: 'special-news', query: { newsId: item.id }}">
                        <img v-if="item.images[0]" :src="item.images[0].source" :alt="$store.state.image">
                    </router-link> -->

                    <!-- <router-link :to="{ path: 'special-news', query: { newsId: item.id }}">
                        {{ item.title }}
                    </router-link> -->

                    <router-link :to="`/special-news/${item.slug}`">
                        <img v-if="item.images[0]" :src="item.images[0].source" :alt="$store.state.image">
                    </router-link>

                    <router-link :to="`/special-news/${item.slug}`">
                        {{ item.title }}
                    </router-link>
                <!--<p><i class="flaticon-tag"></i> Social Sciences</p>-->
                </div>
            </div>
        </div>
    </div>
    <!--End Letest News Area-->
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'NewsQuickRightSidebar',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                news: [],
                sub_type_visibility: false,
            };
        },

        created() {
            this.getData();
        },

        computed: {
            // years() {
            //     const currentYear = new Date().getFullYear();
            //     const startYear = 1995;
            //     const yearsArray = [];
            //     for (let year = startYear; year <= currentYear; year++) {
            //         yearsArray.push(`Spring-${year}`, `Summer-${year}`, `Fall-${year}`);
            //     }

            //     return yearsArray;
            // }

            years() {
                const currentYear = new Date().getFullYear();
                const startYear = 1995;
                const yearsArray = [];
                for (let year = startYear; year <= currentYear; year++) {
                    yearsArray.push(`Spring-${year}`, `Summer-${year}`, `Fall-${year}`);
                }

                return yearsArray.reverse();
            }
        },

        methods: {

            getType(){
                if (this.selectedType === 'Semester wise') {
                    this.sub_type_visibility = true;
                } else{
                    this.sub_type_visibility = false;
                    this.selectedSubType = null;
                }

                this.$emit('get-type', this.selectedType, this.selectedSubType)
            },

            getData() {
                //get  3 news
                axios.get(`${this.backendUrl}news`,{params:{place:'ccc_home'}})
                    .then((response) => {
                        this.news = response.data.data.slice(Math.max(response.data.data.length - 3, 0));
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>