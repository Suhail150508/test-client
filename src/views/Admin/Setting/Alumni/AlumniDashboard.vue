<template>
  <div id="alumni-dashboard">
    <form @submit.prevent="update()">
        <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>
        <AlertError :form="form" message="There were some problems with your input." />

        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-2"> Header Part</h3>
                        <div class="row">
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label for="alumniDashboardHeaderLogo" class="form-label">Logo</label>
                                    <input type="file" class="form-control" @change="onAlumniDashboardHeaderLogoChange"/>
                                    <HasError :form="form" field="alumniDashboardHeaderLogo"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <img class="mt-1" :src="alumniDashboardHeaderLogoPreview" style="width: 100px;" alt="" />
                            </div>
                        </div>
                        <div>
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
        name: 'alumni-dashboard',
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
                
                alumniDashboardHeaderLogoPreview: "",
                form: new Form({
                    alumniDashboardHeaderLogo:"",
                }),

                settingKeyAndValueArray:[
                    'alumniDashboardHeaderLogo',
                ],
            };
        },

        mounted() {
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.alumniDashboardHeaderLogoPreview = value.alumniDashboardHeaderLogo;
                this.form.fill(value);
            })
        },

        methods: {
            onAlumniDashboardHeaderLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.alumniDashboardHeaderLogoPreview = reader.result;
                    this.form.alumniDashboardHeaderLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            update() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}setting/alumni/dashboard`)
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