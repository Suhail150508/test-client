<template>
    <!--Start Letest News Area-->
    <div class="col-lg-3">
        <div v-if="$route.path == '/ccc-updates'" class="category-content">
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
                <!-- <li><router-link :to="{ name: 'Ccc-about' }">Graduates' Profile Registration <i class="ri-arrow-drop-right-fill"></i></router-link></li> -->
            </ul>
        </div>
    </div>
    <!--End Letest News Area-->
</template>

<script>
    export default {
        name: "HomeQuickRightSidebar",
        props:['type'],

        data(){
            return{
                sub_type_visibility: false,
                selectedType: '',
                selectedSubType: null
            };
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

        methods:{
            getType(){
                if (this.selectedType === 'Semester wise') {
                    this.sub_type_visibility = true;
                } else{
                    this.sub_type_visibility = false;
                    this.selectedSubType = null;
                }

                this.$emit('get-type', this.selectedType, this.selectedSubType)
            },
        }
    };
</script>