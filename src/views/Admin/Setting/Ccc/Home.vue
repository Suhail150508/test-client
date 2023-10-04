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
                                        <label for="cccHeaderLogo" class="form-label">Logo</label>
                                        <input type="file" class="form-control" @change="onCccHeaderLogoChange"/>
                                        <HasError :form="form" field="cccHeaderLogo"/>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="mt-1" :src="cccHeaderLogoPreview" style="width: 100px;" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Who we are area</h3>
                            <div class="mb-3">
                                <label for="whoWeAreTitle" class="form-label">Who we are title</label>
                                <input v-model="form.whoWeAreTitle" type="text" class="form-control" placeholder="Who we are title">
                                <HasError :form="form" field="whoWeAreTitle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Talk To Our Team</h3>
                            <div class="mb-3">
                                <label for="cccTalkToOurTeamTitle" class="form-label">Talk To Our Team Title</label>
                                <input v-model="form.cccTalkToOurTeamTitle" type="text" class="form-control" placeholder="Talk To Our Team Title">
                                <HasError :form="form" field="cccTalkToOurTeamTitle" />
                            </div>

                            <div class="mb-3">
                                <label for="cccTalkToOurTeamSubTitle" class="form-label">Talk To Our Team sub title</label>
                                <textarea v-model="form.cccTalkToOurTeamSubTitle" rows="3" cols="50" class="form-control" placeholder="Talk To Our Team sub title"></textarea>
                                <HasError :form="form" field="cccTalkToOurTeamSubTitle" />
                            </div>

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label for="cccTalkToOurTeamImage" class="form-label">Background image</label>
                                        <input type="file" class="form-control" @change="onCccTalkToOurTeamImageChange"/>
                                        <HasError :form="form" field="cccTalkToOurTeamImage"/>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="mt-1" :src="cccTalkToOurTeamImagePreview" style="width: 100px;" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">CCC News area</h3>
                            <div class="mb-3">
                                <label for="cccNewsTitle" class="form-label">CCC News Title</label>
                                <input v-model="form.cccNewsTitle" type="text" class="form-control" placeholder="CCC News Title">
                                <HasError :form="form" field="cccNewsTitle" />
                            </div>

                            <div class="mb-3">
                                <label for="cccNewsSubTitle" class="form-label">CCC News sub title</label>
                                <textarea v-model="form.cccNewsSubTitle" rows="3" cols="50" class="form-control" placeholder="CCC News sub title"></textarea>
                                <HasError :form="form" field="cccNewsSubTitle" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Notice events area</h3>
                            <div class="mb-3">
                                <label for="NoticeEventsTitle" class="form-label">Notice events title</label>
                                <input v-model="form.NoticeEventsTitle" type="text" class="form-control" placeholder="Notice events title">
                                <HasError :form="form" field="NoticeEventsTitle" />
                            </div>
                            <div class="mb-3">
                                <label for="NoticeEventsSubTitle" class="form-label">Notice events sub title</label>
                                <textarea v-model="form.NoticeEventsSubTitle" rows="3" cols="50" class="form-control" placeholder="Notice events sub title"></textarea>
                                <HasError :form="form" field="NoticeEventsSubTitle" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Recent placement area</h3>
                            <div class="mb-3">
                                <label for="recentPlacementTitle" class="form-label">Recent placement title</label>
                                <input v-model="form.recentPlacementTitle" type="text" class="form-control" placeholder="Recent placement title">
                                <HasError :form="form" field="recentPlacementTitle" />
                            </div>

                            <div class="mb-3">
                                <label for="recentPlacementSubTitle" class="form-label">Recent placement sub title</label>
                                <textarea v-model="form.recentPlacementSubTitle" rows="3" cols="50" class="form-control" placeholder="Recent placement sub title"></textarea>
                                <HasError :form="form" field="recentPlacementSubTitle" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Career tips and tricks area</h3>
                            <div class="mb-3">
                                <label for="careerTipsAndTricksTitle" class="form-label">Career Tips And Tricks Title</label>
                                <input v-model="form.careerTipsAndTricksTitle" type="text" class="form-control" placeholder="Career Tips And Tricks Title">
                                <HasError :form="form" field="careerTipsAndTricksTitle" />
                            </div>
                            <div class="mb-3">
                                <label for="careerTipsAndTricksSubTitle" class="form-label">Career Tips And Tricks Sub Title</label>
                                <textarea v-model="form.careerTipsAndTricksSubTitle" rows="3" cols="50" class="form-control" placeholder="Career Tips And Tricks Sub Title"></textarea>
                                <HasError :form="form" field="careerTipsAndTricksSubTitle" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Resources area</h3>
                            <div class="mb-3">
                                <label for="resourcesTitle" class="form-label">Resources title</label>
                                <input v-model="form.resourcesTitle" type="text" class="form-control" placeholder="Resources title">
                                <HasError :form="form" field="resourcesTitle" />
                            </div>

                            <div class="mb-3">
                                <label for="resourcesSubTitle" class="form-label">Resources sub title</label>
                                <textarea v-model="form.resourcesSubTitle" rows="3" cols="50" class="form-control" placeholder="Resources sub title"></textarea>
                                <HasError :form="form" field="resourcesSubTitle" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="mb-2">Successfully Placed Student area</h3>
                            <div class="mb-3">
                                <label for="successfullyPlacedStudentTitle" class="form-label">Successfully Placed Student Title</label>
                                <input v-model="form.successfullyPlacedStudentTitle" type="text" class="form-control" placeholder="Successfully Placed Student Title">
                                <HasError :form="form" field="successfullyPlacedStudentTitle" />
                            </div>
                            <div class="mb-3">
                                <label for="successfullyPlacedStudentSubTitle" class="form-label">Successfully Placed Student Sub Title</label>
                                <textarea v-model="form.successfullyPlacedStudentSubTitle" rows="3" cols="50" class="form-control" placeholder="Successfully Placed Student Sub Title"></textarea>
                                <HasError :form="form" field="successfullyPlacedStudentSubTitle" />
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
                            <h5 class="mb-2">First Column</h5>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="cccFooterLogo" class="form-label">Logo</label>
                                        <input type="file" class="form-control" @change="onCccFooterLogoChange"/>
                                        <HasError :form="form" field="cccFooterLogo"/>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <img class="mt-1" :src="cccFooterLogoPreview" style="width: 100px;" alt="" />
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="cccSiteAddress" class="form-label">Site address</label>
                                        <textarea v-model="form.cccSiteAddress" rows="3" cols="50" class="form-control" placeholder="Site address"></textarea>
                                        <HasError :form="form" field="cccSiteAddress" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="cccFooterContactOne" class="form-label">Contact no one</label>
                                        <input v-model="form.cccFooterContactOne" type="text" class="form-control" placeholder="Contact no one">
                                        <HasError :form="form" field="cccFooterContactOne" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="cccFooterContactTwo" class="form-label">Contact no two</label>
                                        <input v-model="form.cccFooterContactTwo" type="text" class="form-control" placeholder="Contact no two">
                                        <HasError :form="form" field="cccFooterContactTwo" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="cccFooterContactThree" class="form-label">Contact no three</label>
                                        <input v-model="form.cccFooterContactThree" type="text" class="form-control" placeholder="Contact no three">
                                        <HasError :form="form" field="cccFooterContactThree" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <div class="mb-3">
                                        <label for="cccFooterSiteEmail" class="form-label">Email</label>
                                        <input v-model="form.cccFooterSiteEmail" type="text" class="form-control" placeholder="Enter valid email">
                                        <HasError :form="form" field="cccFooterSiteEmail" />
                                    </div>
                                </div>
                            </div>
                            
                            <h5 class="mb-2 mt-4">Secound Column</h5>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColTitle" class="form-label">Title</label>
                                        <input v-model="form.cccFooterSecoundColTitle" type="text" class="form-control" placeholder="Title">
                                        <HasError :form="form" field="cccFooterSecoundColTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColLinkOneTitle" class="form-label">Link one title</label>
                                        <input v-model="form.cccFooterSecoundColLinkOneTitle" type="text" class="form-control" placeholder="Link one title">
                                        <HasError :form="form" field="cccFooterSecoundColLinkOneTitle" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColLinkOne" class="form-label">Link one</label>
                                        <input v-model="form.cccFooterSecoundColLinkOne" type="text" class="form-control" placeholder="Link one">
                                        <HasError :form="form" field="cccFooterSecoundColLinkOne" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColLinkTwoTitle" class="form-label">Link two title</label>
                                        <input v-model="form.cccFooterSecoundColLinkTwoTitle" type="text" class="form-control" placeholder="Link two title">
                                        <HasError :form="form" field="cccFooterSecoundColLinkTwoTitle" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColLinkTwo" class="form-label">Link two</label>
                                        <input v-model="form.cccFooterSecoundColLinkTwo" type="text" class="form-control" placeholder="Link two">
                                        <HasError :form="form" field="cccFooterSecoundColLinkTwo" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColLinkThreeTitle" class="form-label">Link three title</label>
                                        <input v-model="form.cccFooterSecoundColLinkThreeTitle" type="text" class="form-control" placeholder="Link three title">
                                        <HasError :form="form" field="cccFooterSecoundColLinkThreeTitle" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterSecoundColLinkThree" class="form-label">Link three</label>
                                        <input v-model="form.cccFooterSecoundColLinkThree" type="text" class="form-control" placeholder="Link two">
                                        <HasError :form="form" field="cccFooterSecoundColLinkThree" />
                                    </div>
                                </div>
                            </div>

                            <h5 class="mb-2 mt-4">Third Column</h5>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColTitle" class="form-label">Title</label>
                                        <input v-model="form.cccFooterThirdColTitle" type="text" class="form-control" placeholder="Title">
                                        <HasError :form="form" field="cccFooterThirdColTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColLinkOneTitle" class="form-label">Link one title</label>
                                        <input v-model="form.cccFooterThirdColLinkOneTitle" type="text" class="form-control" placeholder="Link one title">
                                        <HasError :form="form" field="cccFooterThirdColLinkOneTitle" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColLinkOne" class="form-label">Link one</label>
                                        <input v-model="form.cccFooterThirdColLinkOne" type="text" class="form-control" placeholder="Link one">
                                        <HasError :form="form" field="cccFooterThirdColLinkOne" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColLinkTwoTitle" class="form-label">Link two title</label>
                                        <input v-model="form.cccFooterThirdColLinkTwoTitle" type="text" class="form-control" placeholder="Link two title">
                                        <HasError :form="form" field="cccFooterThirdColLinkTwoTitle" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColLinkTwo" class="form-label">Link two</label>
                                        <input v-model="form.cccFooterThirdColLinkTwo" type="text" class="form-control" placeholder="Link two">
                                        <HasError :form="form" field="cccFooterThirdColLinkTwo" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColLinkThreeTitle" class="form-label">Link three title</label>
                                        <input v-model="form.cccFooterThirdColLinkThreeTitle" type="text" class="form-control" placeholder="Link three title">
                                        <HasError :form="form" field="cccFooterThirdColLinkThreeTitle" />
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterThirdColLinkThree" class="form-label">Link three</label>
                                        <input v-model="form.cccFooterThirdColLinkThree" type="text" class="form-control" placeholder="Link two">
                                        <HasError :form="form" field="cccFooterThirdColLinkThree" />
                                    </div>
                                </div>
                            </div>

                            <h5 class="mb-2 mt-4">Fourth Column</h5>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterFourthColTitle" class="form-label">Title</label>
                                        <input v-model="form.cccFooterFourthColTitle" type="text" class="form-control" placeholder="Title">
                                        <HasError :form="form" field="cccFooterFourthColTitle" />
                                    </div>
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
                                        <label for="cccFooterQuickLinksOneTitle" class="form-label">Quick Links One Title</label>
                                        <input v-model="form.cccFooterQuickLinksOneTitle" type="text" class="form-control" placeholder="Quick Links One Title">
                                        <HasError :form="form" field="cccFooterQuickLinksOneTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterQuickLinksOne" class="form-label">Quick Links One</label>
                                        <input v-model="form.cccFooterQuickLinksOne" type="text" class="form-control" placeholder="Quick Links One">
                                        <HasError :form="form" field="cccFooterQuickLinksOne" />
                                    </div>
                                </div>

                                <div class="col-lg-2">
                                    <div class="mb-3">
                                        <label for="cccFooterQuickLinksTwoTitle" class="form-label">Quick Links Two Title</label>
                                        <input v-model="form.cccFooterQuickLinksTwoTitle" type="text" class="form-control" placeholder="Quick Links Two Title">
                                        <HasError :form="form" field="cccFooterQuickLinksTwoTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterQuickLinksTwo" class="form-label">Quick Links Two</label>
                                        <input v-model="form.cccFooterQuickLinksTwo" type="text" class="form-control" placeholder="Quick Links Two">
                                        <HasError :form="form" field="cccFooterQuickLinksTwo" />
                                    </div>
                                </div>

                                <div class="col-lg-2">
                                    <div class="mb-3">
                                        <label for="cccFooterQuickLinksThreeTitle" class="form-label">Quick Links Three Title</label>
                                        <input v-model="form.cccFooterQuickLinksThreeTitle" type="text" class="form-control" placeholder="Quick Links Three Title">
                                        <HasError :form="form" field="cccFooterQuickLinksThreeTitle" />
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="cccFooterQuickLinksThree" class="form-label">Quick Links Three</label>
                                        <input v-model="form.cccFooterQuickLinksThree" type="text" class="form-control" placeholder="Quick Links Three">
                                        <HasError :form="form" field="cccFooterQuickLinksThree" />
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
                
                cccHeaderLogoPreview: "",
                cccFooterLogoPreview: "",
                cccTalkToOurTeamImagePreview: "",
                form: new Form({
                    cccHeaderLogo:"",
                    whoWeAreTitle:"",
                    cccNewsTitle:"",
                    cccNewsSubTitle:"",
                    cccTalkToOurTeamTitle:"",
                    cccTalkToOurTeamSubTitle:"",
                    cccTalkToOurTeamImage: "",
                    NoticeEventsTitle:"",
                    NoticeEventsSubTitle:"",
                    recentPlacementTitle:"",
                    recentPlacementSubTitle:"",
                    careerTipsAndTricksTitle:"",
                    careerTipsAndTricksSubTitle:"",
                    resourcesTitle:"",
                    resourcesSubTitle:"",
                    successfullyPlacedStudentTitle:"",
                    successfullyPlacedStudentSubTitle:"",
                    cccFooterLogo:"",
                    cccSiteAddress:"",
                    cccFooterContactOne:"",
                    cccFooterContactTwo:"",
                    cccFooterContactThree:"",
                    cccFooterSiteEmail:"",

                    cccFooterSecoundColTitle:"",
                    cccFooterSecoundColLinkOneTitle:"",
                    cccFooterSecoundColLinkOne:"",
                    cccFooterSecoundColLinkTwoTitle:"",
                    cccFooterSecoundColLinkTwo:"",
                    cccFooterSecoundColLinkThreeTitle:"",
                    cccFooterSecoundColLinkThree:"",

                    cccFooterThirdColTitle:"",
                    cccFooterThirdColLinkOneTitle:"",
                    cccFooterThirdColLinkOne:"",
                    cccFooterThirdColLinkTwoTitle:"",
                    cccFooterThirdColLinkTwo:"",
                    cccFooterThirdColLinkThreeTitle:"",
                    cccFooterThirdColLinkThree:"",

                    cccFooterFourthColTitle:"",

                    cccFooterQuickLinksOneTitle: "",
                    cccFooterQuickLinksOne: "",
                    cccFooterQuickLinksTwoTitle: "",
                    cccFooterQuickLinksTwo: "",
                    cccFooterQuickLinksThreeTitle: "",
                    cccFooterQuickLinksThree: "",
                }),

                settingKeyAndValueArray:[
                    'cccHeaderLogo',
                    'whoWeAreTitle',
                    'cccTalkToOurTeamTitle',
                    'cccTalkToOurTeamSubTitle',
                    'cccTalkToOurTeamImage',
                    'cccNewsTitle',
                    'cccNewsSubTitle',
                    'NoticeEventsTitle',
                    'NoticeEventsSubTitle',
                    'recentPlacementTitle',
                    'recentPlacementSubTitle',
                    'careerTipsAndTricksTitle',
                    'careerTipsAndTricksSubTitle',
                    'resourcesTitle',
                    'resourcesSubTitle',
                    'successfullyPlacedStudentTitle',
                    'successfullyPlacedStudentSubTitle',
                    'cccFooterLogo',
                    'cccSiteAddress',
                    'cccFooterContactOne',
                    'cccFooterContactTwo',
                    'cccFooterContactThree',
                    'cccFooterSiteEmail',

                    'cccFooterSecoundColTitle',
                    'cccFooterSecoundColLinkOneTitle',
                    'cccFooterSecoundColLinkOne',
                    'cccFooterSecoundColLinkTwoTitle',
                    'cccFooterSecoundColLinkTwo',
                    'cccFooterSecoundColLinkThreeTitle',
                    'cccFooterSecoundColLinkThree',

                    'cccFooterThirdColTitle',
                    'cccFooterThirdColLinkOneTitle',
                    'cccFooterThirdColLinkOne',
                    'cccFooterThirdColLinkTwoTitle',
                    'cccFooterThirdColLinkTwo',
                    'cccFooterThirdColLinkThreeTitle',
                    'cccFooterThirdColLinkThree',

                    'cccFooterFourthColTitle',

                    'cccFooterQuickLinksOneTitle',
                    'cccFooterQuickLinksOne',
                    'cccFooterQuickLinksTwoTitle',
                    'cccFooterQuickLinksTwo',
                    'cccFooterQuickLinksThreeTitle',
                    'cccFooterQuickLinksThree',
                ],
            }
        },

        mounted() {
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.cccHeaderLogoPreview = value.cccHeaderLogo;
                this.cccFooterLogoPreview = value.cccFooterLogo;
                this.cccTalkToOurTeamImagePreview = value.cccTalkToOurTeamImage;
                this.form.fill(value);
                this.form.cccHeaderLogo = '';
                this.form.cccFooterLogo = '';
                this.form.cccTalkToOurTeamImage = '';
            })
        },

        methods: {
            onCccHeaderLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.cccHeaderLogoPreview = reader.result;
                    this.form.cccHeaderLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onCccFooterLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.cccFooterLogoPreview = reader.result;
                    this.form.cccFooterLogo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onCccTalkToOurTeamImageChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.cccTalkToOurTeamImagePreview = reader.result;
                    this.form.cccTalkToOurTeamImage = reader.result;
                }
                reader.readAsDataURL(file);
            },

            update() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}setting/ccc/home`)
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