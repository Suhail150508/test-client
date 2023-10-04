 <template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <h1>Guideline</h1>
                <ul>
                    <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
                    <li>Page</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Academic Details Area-->
    <div class="academics-details-area pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="academics-details">
                        <div class="details">
                            <h2>{{guideline.title}}</h2>
                            <p v-html="guideline.description"></p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="detgails-right-content">
                        <div class="related-download">
                            <h3>Related Downloads</h3>
                            <ul>
                                <li><a href="#"><i class="flaticon-pdf-file"></i>Brochure Department</a></li>
                                <li><a href="#"><i class="flaticon-pdf-file"></i>Department Details</a></li>
                                <li><a href="#"><i class="flaticon-pdf-file"></i>Journals Departments</a></li>
                                <li><a href="#"><i class="flaticon-pdf-file"></i>Alumni Departments</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Academic Details Area-->
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'SingleResource',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                guideline: [],
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
                axios.get(`${this.backendUrl}guideline/`+this.$route.query.guideId)
                    .then((response) => {
                        this.guideline = response.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },
        }
    }
</script>

