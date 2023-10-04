<template>
    <div id="home">
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
                                        <label for="jobPortalHeaderLogo" class="form-label">Logo</label>
                                        <input type="file" class="form-control" @change="onJobPortalHeaderLogoChange"/>
                                        <HasError :form="form" field="jobPortalHeaderLogo"/>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="mt-1" :src="jobPortalHeaderLogoPreview" style="width: 100px;" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Footer area</h3>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterLogo" class="form-label">Logo</label>
                                        <input type="file" class="form-control" @change="onJobPortalFooterLogoChange"/>
                                        <HasError :form="form" field="jobPortalFooterLogo"/>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <img class="mt-1" :src="jobPortalFooterLogoPreview" style="width: 100px;" alt="" />
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="jobPortalSiteAddress" class="form-label">Site address</label>
                                        <textarea v-model="form.jobPortalSiteAddress" rows="3" cols="50" class="form-control" placeholder="Site address"></textarea>
                                        <HasError :form="form" field="jobPortalSiteAddress" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterContactOne" class="form-label">Contact no one</label>
                                        <input v-model="form.jobPortalFooterContactOne" type="text" class="form-control" placeholder="Contact no one">
                                        <HasError :form="form" field="jobPortalFooterContactOne" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterContactTwo" class="form-label">Contact no two</label>
                                        <input v-model="form.jobPortalFooterContactTwo" type="text" class="form-control" placeholder="Contact no two">
                                        <HasError :form="form" field="jobPortalFooterContactTwo" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterContactThree" class="form-label">Contact no three</label>
                                        <input v-model="form.jobPortalFooterContactThree" type="text" class="form-control" placeholder="Contact no three">
                                        <HasError :form="form" field="jobPortalFooterContactThree" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterSiteEmail" class="form-label">Email</label>
                                        <input v-model="form.jobPortalFooterSiteEmail" type="text" class="form-control" placeholder="Enter valid email">
                                        <HasError :form="form" field="jobPortalFooterSiteEmail" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterStudentText" class="form-label">Student text</label>
                                        <input v-model="form.jobPortalFooterStudentText" type="text" class="form-control" placeholder="Student text">
                                        <HasError :form="form" field="jobPortalFooterStudentText" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterOurCampusText" class="form-label">Our Campus text</label>
                                        <input v-model="form.jobPortalFooterOurCampusText" type="text" class="form-control" placeholder="Our Campus text">
                                        <HasError :form="form" field="jobPortalFooterOurCampusText" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterLocationMapText" class="form-label">Location map text</label>
                                        <input v-model="form.jobPortalFooterLocationMapText" type="text" class="form-control" placeholder="Location map text">
                                        <HasError :form="form" field="jobPortalFooterLocationMapText" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <h3 class="mb-2 mt-4">Resources link area</h3>
                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesText" class="form-label">Resources text</label>
                                    <input v-model="form.jobPortalFooterResourcesText" type="text" class="form-control" placeholder="Resources text">
                                    <HasError :form="form" field="jobPortalFooterResourcesText" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkOneTitle" class="form-label">Link one title</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkOneTitle" type="text" class="form-control" placeholder="Link one title">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkOneTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkOne" class="form-label">Link one</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkOne" type="text" class="form-control" placeholder="Link one">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkOne" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkTwoTitle" class="form-label">Link two title</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkTwoTitle" type="text" class="form-control" placeholder="Link two title">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkTwoTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkTwo" class="form-label">Link two</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkTwo" type="text" class="form-control" placeholder="Link two">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkTwo" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkThreeTitle" class="form-label">Link three title</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkThreeTitle" type="text" class="form-control" placeholder="Link three title">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkThreeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkThree" class="form-label">Link three</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkThree" type="text" class="form-control" placeholder="Link three">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkThree" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkForeTitle" class="form-label">Link fore title</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkForeTitle" type="text" class="form-control" placeholder="Link fore title">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkForeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkFore" class="form-label">Link fore</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkFore" type="text" class="form-control" placeholder="Link fore">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkFore" />
                                </div>
                            </div>






                            <!-- <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkThreeTitle" class="form-label">Resources link three title</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkThreeTitle" type="text" class="form-control" placeholder="Resources link three title">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkThreeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterResourcesLinkThree" class="form-label">Resources link three</label>
                                    <input v-model="form.jobPortalFooterResourcesLinkThree" type="text" class="form-control" placeholder="Resources link three">
                                    <HasError :form="form" field="jobPortalFooterResourcesLinkThree" />
                                </div>
                            </div> -->
                            
                            <h3 class="mb-2 mt-4">Information link area</h3>
                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationText" class="form-label">Information text</label>
                                    <input v-model="form.jobPortalFooterInformationText" type="text" class="form-control" placeholder="Information text">
                                    <HasError :form="form" field="jobPortalFooterInformationText" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkOneTitle" class="form-label">Link one title</label>
                                    <input v-model="form.jobPortalFooterInformationLinkOneTitle" type="text" class="form-control" placeholder="Link one title">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkOneTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkOne" class="form-label">Link one</label>
                                    <input v-model="form.jobPortalFooterInformationLinkOne" type="text" class="form-control" placeholder="Link one">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkOne" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkTwoTitle" class="form-label">Link two title</label>
                                    <input v-model="form.jobPortalFooterInformationLinkTwoTitle" type="text" class="form-control" placeholder="Link two title">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkTwoTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkTwo" class="form-label">Link two</label>
                                    <input v-model="form.jobPortalFooterInformationLinkTwo" type="text" class="form-control" placeholder="Link two">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkTwo" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkThreeTitle" class="form-label">Link three title</label>
                                    <input v-model="form.jobPortalFooterInformationLinkThreeTitle" type="text" class="form-control" placeholder="Link three title">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkThreeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkThree" class="form-label">Link three</label>
                                    <input v-model="form.jobPortalFooterInformationLinkThree" type="text" class="form-control" placeholder="Link three">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkThree" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkForeTitle" class="form-label">Link fore title</label>
                                    <input v-model="form.jobPortalFooterInformationLinkForeTitle" type="text" class="form-control" placeholder="Link fore title">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkForeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkFore" class="form-label">Link fore</label>
                                    <input v-model="form.jobPortalFooterInformationLinkFore" type="text" class="form-control" placeholder="Link fore">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkFore" />
                                </div>
                            </div>

                            <!-- <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkThreeTitle" class="form-label">Resources link three title</label>
                                    <input v-model="form.jobPortalFooterInformationLinkThreeTitle" type="text" class="form-control" placeholder="Resources link three title">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkThreeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="jobPortalFooterInformationLinkThree" class="form-label">Resources link three</label>
                                    <input v-model="form.jobPortalFooterInformationLinkThree" type="text" class="form-control" placeholder="Resources link three">
                                    <HasError :form="form" field="jobPortalFooterInformationLinkThree" />
                                </div>
                            </div> -->

                            <h3 class="mb-2 mt-4">Location map area</h3>
                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label for="jobPortalFooterLocationMapText" class="form-label">Location map text</label>
                                    <input v-model="form.jobPortalFooterLocationMapText" type="text" class="form-control" placeholder="Location map text">
                                    <HasError :form="form" field="jobPortalFooterLocationMapText" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Footer Quick Links area</h3>
                            <div class="row">
                                <div class="col-lg-2">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterQuickLinksOneTitle" class="form-label">Quick Links One Title</label>
                                        <input v-model="form.jobPortalFooterQuickLinksOneTitle" type="text" class="form-control" placeholder="Quick Links One Title">
                                        <HasError :form="form" field="jobPortalFooterQuickLinksOneTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterQuickLinksOne" class="form-label">Quick Links One</label>
                                        <input v-model="form.jobPortalFooterQuickLinksOne" type="text" class="form-control" placeholder="Quick Links One">
                                        <HasError :form="form" field="jobPortalFooterQuickLinksOne" />
                                    </div>
                                </div>

                                <div class="col-lg-2">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterQuickLinksTwoTitle" class="form-label">Quick Links Two Title</label>
                                        <input v-model="form.jobPortalFooterQuickLinksTwoTitle" type="text" class="form-control" placeholder="Quick Links Two Title">
                                        <HasError :form="form" field="jobPortalFooterQuickLinksTwoTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterQuickLinksTwo" class="form-label">Quick Links Two</label>
                                        <input v-model="form.jobPortalFooterQuickLinksTwo" type="text" class="form-control" placeholder="Quick Links Two">
                                        <HasError :form="form" field="jobPortalFooterQuickLinksTwo" />
                                    </div>
                                </div>

                                <div class="col-lg-2">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterQuickLinksThreeTitle" class="form-label">Quick Links Three Title</label>
                                        <input v-model="form.jobPortalFooterQuickLinksThreeTitle" type="text" class="form-control" placeholder="Quick Links Three Title">
                                        <HasError :form="form" field="jobPortalFooterQuickLinksThreeTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="jobPortalFooterQuickLinksThree" class="form-label">Quick Links Three</label>
                                        <input v-model="form.jobPortalFooterQuickLinksThree" type="text" class="form-control" placeholder="Quick Links Three">
                                        <HasError :form="form" field="jobPortalFooterQuickLinksThree" />
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
                
                jobPortalHeaderLogoPreview: "",
                jobPortalFooterLogoPreview: "",
                form: new Form({

                    jobPortalHeaderLogo:"",
                    jobPortalFooterLogo:"",
                    jobPortalSiteAddress:"",
                    jobPortalFooterContactOne:"",
                    jobPortalFooterContactTwo:"",
                    jobPortalFooterContactThree:"",
                    jobPortalFooterSiteEmail:"",



                    jobPortalFooterStudentText:"",
                    jobPortalFooterOurCampusText:"",
                    jobPortalFooterLocationMapText:"",
                    jobPortalFooterQuickLinksOneTitle: "",
                    jobPortalFooterQuickLinksOne: "",
                    jobPortalFooterQuickLinksTwoTitle: "",
                    jobPortalFooterQuickLinksTwo: "",
                    jobPortalFooterQuickLinksThreeTitle: "",
                    jobPortalFooterQuickLinksThree: "",


                    

                    jobPortalFooterResourcesText: "",

                    jobPortalFooterResourcesLinkOneTitle: "",
                    jobPortalFooterResourcesLinkOne: "",
                    jobPortalFooterResourcesLinkTwoTitle: "",
                    jobPortalFooterResourcesLinkTwo: "",
                    jobPortalFooterResourcesLinkThreeTitle: "",
                    jobPortalFooterResourcesLinkThree: "",
                    jobPortalFooterResourcesLinkForeTitle: "",
                    jobPortalFooterResourcesLinkFore: "",



                    jobPortalFooterInformationText: "",

                    jobPortalFooterInformationLinkOneTitle: "",
                    jobPortalFooterInformationLinkOne: "",
                    jobPortalFooterInformationLinkTwoTitle: "",
                    jobPortalFooterInformationLinkTwo: "",
                    jobPortalFooterInformationLinkThreeTitle: "",
                    jobPortalFooterInformationLinkThree: "",
                    jobPortalFooterInformationLinkForeTitle: "",
                    jobPortalFooterInformationLinkFore: "",
                }),

                settingKeyAndValueArray:[
                    'jobPortalHeaderLogo',
                    'jobPortalFooterLogo',
                    'jobPortalSiteAddress',
                    'jobPortalFooterContactOne',
                    'jobPortalFooterContactTwo',
                    'jobPortalFooterContactThree',
                    'jobPortalFooterSiteEmail',

                    'jobPortalFooterStudentText',
                    'jobPortalFooterOurCampusText',
                    'jobPortalFooterLocationMapText',
                    'jobPortalFooterQuickLinksOneTitle',
                    'jobPortalFooterQuickLinksOne',
                    'jobPortalFooterQuickLinksTwoTitle',
                    'jobPortalFooterQuickLinksTwo',
                    'jobPortalFooterQuickLinksThreeTitle',
                    'jobPortalFooterQuickLinksThree',

                    'jobPortalFooterResourcesText',
                    'jobPortalFooterResourcesLinkOneTitle',
                    'jobPortalFooterResourcesLinkOne',
                    'jobPortalFooterResourcesLinkTwoTitle',
                    'jobPortalFooterResourcesLinkTwo',
                    'jobPortalFooterResourcesLinkThreeTitle',
                    'jobPortalFooterResourcesLinkThree',
                    'jobPortalFooterResourcesLinkForeTitle',
                    'jobPortalFooterResourcesLinkFore',

                    'jobPortalFooterInformationText',
                    'jobPortalFooterInformationLinkOneTitle',
                    'jobPortalFooterInformationLinkOne',
                    'jobPortalFooterInformationLinkTwoTitle',
                    'jobPortalFooterInformationLinkTwo',
                    'jobPortalFooterInformationLinkThreeTitle',
                    'jobPortalFooterInformationLinkThree',
                    'jobPortalFooterInformationLinkForeTitle',
                    'jobPortalFooterInformationLinkFore',

                ],
            }
        },

        mounted() {
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.jobPortalHeaderLogoPreview = value.jobPortalHeaderLogo;
                this.jobPortalFooterLogoPreview = value.jobPortalFooterLogo;
                this.form.fill(value);
                this.form.jobPortalHeaderLogo = '';
                this.form.jobPortalFooterLogo = '';
            })
        },

        methods: {
            onJobPortalHeaderLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.jobPortalHeaderLogoPreview = reader.result;
                    this.form.jobPortalHeaderLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onJobPortalFooterLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.jobPortalFooterLogoPreview = reader.result;
                    this.form.jobPortalFooterLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            update() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}setting/job-portal/home`)
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