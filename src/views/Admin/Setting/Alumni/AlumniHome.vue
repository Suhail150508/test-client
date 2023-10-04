<template>
  <div id="alumni-home">
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
                                    <label for="headerLogo" class="form-label">Logo</label>
                                    <input type="file" class="form-control" @change="onHeaderLogoChange"/>
                                    <HasError :form="form" field="headerLogo"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <img class="mt-1" :src="headerLogoPreview" style="width: 100px;" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-2">Welcome area</h3>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Welcome title</label>
                            <input v-model="form.welcomeTitle" type="text" class="form-control" placeholder="Welcome title">
                            <HasError :form="form" field="welcomeTitle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-2">Feature alumni area</h3>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Feature alumni title</label>
                            <input v-model="form.featureAlumniTitle" type="text" class="form-control" placeholder="Feature alumni title">
                            <HasError :form="form" field="featureAlumniTitle" />
                        </div>

                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Feature alumni sub title</label>
                            <textarea v-model="form.featureAlumniSubTitle" rows="3" cols="50" class="form-control" placeholder="Feature alumni sub title"></textarea>
                            <HasError :form="form" field="featureAlumniSubTitle" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-2">Newsroom area</h3>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Newsroom title</label>
                            <input v-model="form.newsroomTitle" type="text" class="form-control" placeholder="Newsroom title">
                            <HasError :form="form" field="newsroomTitle" />
                        </div>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Newsroom sub title</label>
                            <textarea v-model="form.newsroomSubTitle" rows="3" cols="50" class="form-control" placeholder="Newsroom sub title"></textarea>
                            <HasError :form="form" field="newsroomSubTitle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-2">Latest members area</h3>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Latest members title</label>
                            <input v-model="form.latestMemberTitle" type="text" class="form-control" placeholder="Latest Member title">
                            <HasError :form="form" field="latestMemberTitle" />
                        </div>

                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Latest members sub title</label>
                            <textarea v-model="form.latestMemberSubTitle" rows="3" cols="50" class="form-control" placeholder="Latest Member sub title"></textarea>
                            <HasError :form="form" field="latestMemberSubTitle" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-2">Events area</h3>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Events title</label>
                            <input v-model="form.eventTitle" type="text" class="form-control" placeholder="Events title">
                            <HasError :form="form" field="eventTitle" />
                        </div>
                        <div class="mb-3">
                            <label for="formrow-firstname-input" class="form-label">Events sub title</label>
                            <textarea v-model="form.eventSubTitle" rows="3" cols="50" class="form-control" placeholder="Events sub title"></textarea>
                            <HasError :form="form" field="eventSubTitle" />
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
                                    <label for="footerLogo" class="form-label">Logo</label>
                                    <input type="file" class="form-control" @change="onFooterLogoChange"/>
                                    <HasError :form="form" field="footerLogo"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <img class="mt-1" :src="footerLogoPreview" style="width: 100px;" alt="" />
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="alumniSiteAddress" class="form-label">Site address</label>
                                    <textarea v-model="form.alumniSiteAddress" rows="3" cols="50" class="form-control" placeholder="Site address"></textarea>
                                    <HasError :form="form" field="alumniSiteAddress" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterContactOne" class="form-label">Contact no one</label>
                                    <input v-model="form.alumniFooterContactOne" type="text" class="form-control" placeholder="Contact no one">
                                    <HasError :form="form" field="alumniFooterContactOne" />
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterContactTwo" class="form-label">Contact no two</label>
                                    <input v-model="form.alumniFooterContactTwo" type="text" class="form-control" placeholder="Contact no two">
                                    <HasError :form="form" field="alumniFooterContactTwo" />
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterContactThree" class="form-label">Contact no three</label>
                                    <input v-model="form.alumniFooterContactThree" type="text" class="form-control" placeholder="Contact no three">
                                    <HasError :form="form" field="alumniFooterContactThree" />
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterSiteEmail" class="form-label">Email</label>
                                    <input v-model="form.alumniFooterSiteEmail" type="text" class="form-control" placeholder="Enter valid email">
                                    <HasError :form="form" field="alumniFooterSiteEmail" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <h3 class="mb-2 mt-4">Resources link area</h3>
                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesText" class="form-label">Resources text</label>
                                    <input v-model="form.alumniFooterResourcesText" type="text" class="form-control" placeholder="Resources text">
                                    <HasError :form="form" field="alumniFooterResourcesText" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesLinkOneTitle" class="form-label">Link one title</label>
                                    <input v-model="form.alumniFooterResourcesLinkOneTitle" type="text" class="form-control" placeholder="Link one title">
                                    <HasError :form="form" field="alumniFooterResourcesLinkOneTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesLinkOne" class="form-label">Link one</label>
                                    <input v-model="form.alumniFooterResourcesLinkOne" type="text" class="form-control" placeholder="Link one">
                                    <HasError :form="form" field="alumniFooterResourcesLinkOne" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesLinkTwoTitle" class="form-label">Link two title</label>
                                    <input v-model="form.alumniFooterResourcesLinkTwoTitle" type="text" class="form-control" placeholder="Link two title">
                                    <HasError :form="form" field="alumniFooterResourcesLinkTwoTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesLinkTwo" class="form-label">Link two</label>
                                    <input v-model="form.alumniFooterResourcesLinkTwo" type="text" class="form-control" placeholder="Link two">
                                    <HasError :form="form" field="alumniFooterResourcesLinkTwo" />
                                </div>
                            </div>

                            <!-- <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesLinkThreeTitle" class="form-label">Resources link three title</label>
                                    <input v-model="form.alumniFooterResourcesLinkThreeTitle" type="text" class="form-control" placeholder="Resources link three title">
                                    <HasError :form="form" field="alumniFooterResourcesLinkThreeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterResourcesLinkThree" class="form-label">Resources link three</label>
                                    <input v-model="form.alumniFooterResourcesLinkThree" type="text" class="form-control" placeholder="Resources link three">
                                    <HasError :form="form" field="alumniFooterResourcesLinkThree" />
                                </div>
                            </div> -->
                            
                            <h3 class="mb-2 mt-4">Information link area</h3>
                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationText" class="form-label">Information text</label>
                                    <input v-model="form.alumniFooterInformationText" type="text" class="form-control" placeholder="Information text">
                                    <HasError :form="form" field="alumniFooterInformationText" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationLinkOneTitle" class="form-label">Link one title</label>
                                    <input v-model="form.alumniFooterInformationLinkOneTitle" type="text" class="form-control" placeholder="Link one title">
                                    <HasError :form="form" field="alumniFooterInformationLinkOneTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationLinkOne" class="form-label">Link one</label>
                                    <input v-model="form.alumniFooterInformationLinkOne" type="text" class="form-control" placeholder="Link one">
                                    <HasError :form="form" field="alumniFooterInformationLinkOne" />
                                </div>
                            </div>

                            <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationLinkTwoTitle" class="form-label">Link two title</label>
                                    <input v-model="form.alumniFooterInformationLinkTwoTitle" type="text" class="form-control" placeholder="Link two title">
                                    <HasError :form="form" field="alumniFooterInformationLinkTwoTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationLinkTwo" class="form-label">Link two</label>
                                    <input v-model="form.alumniFooterInformationLinkTwo" type="text" class="form-control" placeholder="Link two">
                                    <HasError :form="form" field="alumniFooterInformationLinkTwo" />
                                </div>
                            </div>

                            <!-- <div class="col-lg-2">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationLinkThreeTitle" class="form-label">Resources link three title</label>
                                    <input v-model="form.alumniFooterInformationLinkThreeTitle" type="text" class="form-control" placeholder="Resources link three title">
                                    <HasError :form="form" field="alumniFooterInformationLinkThreeTitle" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="mb-3">
                                    <label for="alumniFooterInformationLinkThree" class="form-label">Resources link three</label>
                                    <input v-model="form.alumniFooterInformationLinkThree" type="text" class="form-control" placeholder="Resources link three">
                                    <HasError :form="form" field="alumniFooterInformationLinkThree" />
                                </div>
                            </div> -->

                            <h3 class="mb-2 mt-4">Location map area</h3>
                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label for="alumniFooterLocationMapText" class="form-label">Location map text</label>
                                    <input v-model="form.alumniFooterLocationMapText" type="text" class="form-control" placeholder="Location map text">
                                    <HasError :form="form" field="alumniFooterLocationMapText" />
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
                                                    <label for="alumniFooterQuickLinksOneTitle" class="form-label">Quick Links One Title</label>
                                                    <input v-model="form.alumniFooterQuickLinksOneTitle" type="text" class="form-control" placeholder="Quick Links One Title">
                                                    <HasError :form="form" field="alumniFooterQuickLinksOneTitle" />
                                                </div>
                                            </div>

                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label for="alumniFooterQuickLinksOne" class="form-label">Quick Links One</label>
                                                    <input v-model="form.alumniFooterQuickLinksOne" type="text" class="form-control" placeholder="Quick Links One">
                                                    <HasError :form="form" field="alumniFooterQuickLinksOne" />
                                                </div>
                                            </div>

                                            <div class="col-lg-2">
                                                <div class="mb-3">
                                                    <label for="alumniFooterQuickLinksTwoTitle" class="form-label">Quick Links Two Title</label>
                                                    <input v-model="form.alumniFooterQuickLinksTwoTitle" type="text" class="form-control" placeholder="Quick Links Two Title">
                                                    <HasError :form="form" field="alumniFooterQuickLinksTwoTitle" />
                                                </div>
                                            </div>

                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label for="alumniFooterQuickLinksTwo" class="form-label">Quick Links Two</label>
                                                    <input v-model="form.alumniFooterQuickLinksTwo" type="text" class="form-control" placeholder="Quick Links Two">
                                                    <HasError :form="form" field="alumniFooterQuickLinksTwo" />
                                                </div>
                                            </div>

                                            <div class="col-lg-2">
                                                <div class="mb-3">
                                                    <label for="alumniFooterQuickLinksThreeTitle" class="form-label">Quick Links Three Title</label>
                                                    <input v-model="form.alumniFooterQuickLinksThreeTitle" type="text" class="form-control" placeholder="Quick Links Three Title">
                                                    <HasError :form="form" field="alumniFooterQuickLinksThreeTitle" />
                                                </div>
                                            </div>

                                            <div class="col-lg-4">
                                                <div class="mb-3">
                                                    <label for="alumniFooterQuickLinksThree" class="form-label">Quick Links Three</label>
                                                    <input v-model="form.alumniFooterQuickLinksThree" type="text" class="form-control" placeholder="Quick Links Three">
                                                    <HasError :form="form" field="alumniFooterQuickLinksThree" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        name: 'Alumni Home',
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
                
                headerLogoPreview: "",
                footerLogoPreview: "",
                form: new Form({
                    headerLogo:"",
                    welcomeTitle: "",
                    featureAlumniTitle: "",
                    featureAlumniSubTitle: "",
                    newsroomTitle: "",
                    newsroomSubTitle: "",
                    latestMemberTitle: "",
                    latestMemberSubTitle: "",
                    eventTitle: "",
                    eventSubTitle: "",

                    footerLogo: "",
                    alumniSiteAddress: "",
                    alumniFooterContactOne: "",
                    alumniFooterContactTwo: "",
                    alumniFooterContactThree: "",
                    alumniFooterSiteEmail: "",

                    alumniFooterResourcesText: "",
                    alumniFooterResourcesLinkOneTitle: "",
                    alumniFooterResourcesLinkOne: "",
                    alumniFooterResourcesLinkTwoTitle: "",
                    alumniFooterResourcesLinkTwo: "",

                    alumniFooterInformationText: "",
                    alumniFooterInformationLinkOneTitle:"",
                    alumniFooterInformationLinkOne:"",
                    alumniFooterInformationLinkTwoTitle:"",
                    alumniFooterInformationLinkTwo:"",

                    alumniFooterLocationMapText: "",

                    alumniFooterQuickLinksOneTitle: "",
                    alumniFooterQuickLinksOne: "",
                    alumniFooterQuickLinksTwoTitle: "",
                    alumniFooterQuickLinksTwo: "",
                    alumniFooterQuickLinksThreeTitle: "",
                    alumniFooterQuickLinksThree: "",
                }),

                settingKeyAndValueArray:[
                    'headerLogo',
                    'welcomeTitle',
                    'featureAlumniTitle',
                    'featureAlumniSubTitle',
                    'newsroomTitle',
                    'newsroomSubTitle',
                    'latestMemberTitle',
                    'latestMemberSubTitle',
                    'eventTitle',
                    'eventSubTitle',

                    'footerLogo',
                    'alumniSiteAddress',
                    'alumniFooterContactOne',
                    'alumniFooterContactTwo',
                    'alumniFooterContactThree',
                    'alumniFooterSiteEmail',

                    'alumniFooterResourcesText',
                    'alumniFooterResourcesLinkOneTitle',
                    'alumniFooterResourcesLinkOne',
                    'alumniFooterResourcesLinkTwoTitle',
                    'alumniFooterResourcesLinkTwo',

                    'alumniFooterInformationText',
                    'alumniFooterInformationLinkOneTitle',
                    'alumniFooterInformationLinkOne',
                    'alumniFooterInformationLinkTwoTitle',
                    'alumniFooterInformationLinkTwo',

                    'alumniFooterLocationMapText',

                    'alumniFooterQuickLinksOneTitle',
                    'alumniFooterQuickLinksOne',
                    'alumniFooterQuickLinksTwoTitle',
                    'alumniFooterQuickLinksTwo',
                    'alumniFooterQuickLinksThreeTitle',
                    'alumniFooterQuickLinksThree',
                ],
            };
        },

        mounted() {
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.headerLogoPreview = value.headerLogo;
                this.footerLogoPreview = value.footerLogo;
                this.form.fill(value);
                this.form.headerLogo = '';
                this.form.footerLogo = '';
            })
        },

        methods: {
            onHeaderLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.headerLogoPreview = reader.result;
                    this.form.headerLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onFooterLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.footerLogoPreview = reader.result;
                    this.form.footerLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            update() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}setting/alumni/home`)
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