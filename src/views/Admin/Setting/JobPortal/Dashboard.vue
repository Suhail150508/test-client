<template>
    <div id="home">
        <form @submit.prevent="update()">
            <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>
            <AlertError :form="form" message="There were some problems with your input." />

            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Search job area</h3>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="searchJobTitle" class="form-label">Search Job Title</label>
                                        <input v-model="form.searchJobTitle" type="text" class="form-control" placeholder="Search Job Title">
                                        <HasError :form="form" field="searchJobTitle" />
                                    </div>
                                </div>
                            </div>
                            <div class="float-end">
                                <button :disabled="form.busy" type="submit" class="btn btn-primary w-md">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <vue-progress-bar></vue-progress-bar>
        <notifications />
    </div>
</template>

<script>
    import axios from 'axios';
    import Form from 'vform';
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'

    export default {
        name: 'Home',
        components: {
            Button,
            HasError,
            AlertError,
            AlertErrors,
            AlertSuccess 
        },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                form: new Form({
                    searchJobTitle:"",
                }),

                settingKeyAndValueArray:[
                    'searchJobTitle',
                ],
            }
        },

        mounted() {
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.form.fill(value);
            })
        },

        methods: {
            update() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}setting/job-portal/dashboard`)
                .then(response => {
                    if(this.form.successful){
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: response.data.message });
                    }else{
                        this.$Progress.fail()
                        this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
                    }
                })
                .catch(e => {
                    this.$Progress.fail()
                    console.log(e)
                })
            },
        }
    }
</script>

<style>

</style>