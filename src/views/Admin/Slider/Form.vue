<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Slider {{ editMode ? 'Update' : 'Create' }}</h4>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'app.slider' }" type="button" class="btn btn-sm btn-success float-end">
                                <i class="fas fa-left-arrow"></i> All Sliders
                            </router-link>
                        </div>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="editMode ? update() : store()">
                            <div v-if="form.progress" class="text-center">
                                Progress: {{ form.progress.percentage }}%
                            </div>

                            <AlertError :form="form" message="There were some problems with your input." />

                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header bg-success fw-medium">Slider Information</div>
                                        <div class="card-body">

                                            <div class="row">
                                                <div class="mb-3 col-xl-8 col-md-8">
                                                    <label>Add Slider Place</label>
                                                    <input v-model="form.place" type="text" class="form-control" placeholder="Where to place">
                                                    <HasError :form="form" field="place" />
                                                </div>

                                                <div class="mb-3 col-xl-4 col-md-4">
                                                    <label>Status</label>
                                                    <select name="slider_status" class="form-control" v-model="form.slider_status">
                                                        <option value="">Select One</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <HasError :form="form" field="slider_status" />
                                                </div>

                                            </div>
                                        </div>
                                        <!-- end card body -->
                                    </div>
                                    <!-- end card -->
                                </div>
                                <!-- end col -->

                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header text-light bg-primary fw-medium">
                                            <i class="fas fa-mobile-alt"></i> Slider Details</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div data-repeater-list="group-a">
                                                    <div>
                                                        <div data-repeater-item class="row" style="border: 1px dotted gray" v-for="(row, index) in form.slider_detail_inputs">

                                                            <div class="mb-3 col-lg-2 col-md-2 pt-3">
                                                                <label>Slider Title</label>
                                                                <input type="text" v-model="row.title" :name="'sliderDetails['+index+'][title]'" class="form-control" placeholder="Enter Slider Title"/>
                                                            </div>

                                                            <div class="col-lg-2 col-md-2 pt-3">
                                                                <label> Slider Status</label>
                                                                <select class="form-control" :name="'sliderDetails['+index+'][detail_status]'" v-model="row.detail_status" >
                                                                    <option value="">Select One</option>
                                                                    <option value="Active">Active</option>
                                                                    <option value="Inactive">Inactive</option>
                                                                </select>
                                                                <HasError :form="form" field="detail_status"/>
                                                            </div>

                                                            <div class="col-lg-2 col-md-2 pt-3">
                                                                <div class="mb-3">
                                                                    <label>Upload Slider Image</label>
                                                                    <input type="file" :name="'sliderDetails['+index+'][image]'" class="form-control" @change="onImageChange(index,$event)" />
                                                                    <HasError :form="form" field="image" />
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-1 col-md-1 pt-3">
                                                                <div class="mb-3">
                                                                    <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                                                </div>
                                                            </div>

                                                            <div class="form-floating col-lg-4 col-md-4 mb-3 pt-1">
                                                                <textarea v-model="row.short_description" :name="'sliderDetails['+index+'][short_description]'" class="form-control" rows="3" placeholder="Enter Your Message"></textarea>
                                                                <label> Slider Short Description</label>
                                                                <HasError :form="form" field="short_description" />
                                                            </div>

                                                            <div class="col-lg-1 col-md-1 align-self-center">
                                                                <div v-if="index!=0" class="d-grid">
                                                                    <input data-repeater-delete type="button" class="btn btn-danger btn-sm" value="Delete" @click.prevent="removeSocialLinks(index)"/>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <a class="btn btn-success float-end mt-1" @click.prevent="addMoreSocialLinks">
                                                        <i class="fa fa-plus-circle"></i>
                                                        Add
                                                    </a>
                                                </div>
                                            </div>
                                            <!-- end row -->
                                        </div>
                                    </div>
                                    <!-- end card -->

                                    <!-- end card body -->
                                </div>
                                <!-- end col -->

                            </div>
                            <!-- end row -->

                            <div class="col-md-12 text-center">
                                <button
                                        :disabled="form.busy"
                                        type="submit"
                                        class="btn btn-primary btn-lg"
                                >
                                    {{ editMode ? "Update" : "Create" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <vue-progress-bar></vue-progress-bar>
        <notifications />
    </div>

</template>

<script>
    import axios from 'axios';
    import Form from 'vform'
    import Editor from '@tinymce/tinymce-vue'
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap5'

    export default{
        name: 'Form',
        components: { Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                editMode: false,
                imagePreview: "",
                sliderData: [],
                form: new Form({
                    id:'',
                    place:'',
                    slider_status:'',

                    slider_detail_inputs:[{
                        title:'',
                        detail_status:'',
                        image:'',
                        short_description:'',
                    }],

                }),
            };
        },


        methods:{

            store() {
                this.$Progress.start();
                this.form.busy = true;
                this.form.post(`${this.backendUrl}slider`)
                    .then((response) => {
                        console.log(response);
                        if (this.form.successful) {
                            this.$Progress.finish();
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Slider Added Successfully",
                            });
                            this.$router.push({name: 'app.slider'})
                        } else {
                            this.$Progress.fail();
                            this.$notify({
                                type: "error",
                                title: "Error",
                                text: "Something went wrong try again later",
                            });
                        }
                    })
                    .catch((e) => {
                        this.$Progress.fail();
                        console.log(e);
                    });
            },
            /*
                        edit(){
                            let linkUrl = `${this.backendUrl}slider/edit/`+this.$route.query.sliderEditId;
                            axios.get(linkUrl)
                                .then((response) => {
                                    console.log(response)
                                    this.form.id = response.data.id;
                                    this.form.title = response.data.title;
                                    this.form.description = response.data.description;
                                    this.form.about = response.data.about;
                                    this.form.status = response.data.status;
                                    this.form.c_address = response.data.c_address;
                                    this.form.c_email = response.data.c_email;
                                    this.form.c_phone = response.data.c_phone;
                                    this.form.c_room_no = response.data.c_room_no;
                                    this.form.c_description = response.data.c_description;


                                    var inputs = this.form.slider_detail_inputs;
                                    $(response.data.link_details).each(function(index, element ) {
                                        if (index == 0){
                                            inputs[index].social_name=element.social_name;
                                            inputs[index].icon_class=element.icon_class;
                                            inputs[index].social_link=element.social_link;
                                        } else if(index > 0){
                                            inputs.push({
                                                social_name:element.social_name,
                                                icon_class:element.icon_class,
                                                social_link:element.social_link,
                                            })
                                        }

                                    })
                                    this.imagePreview = response.data.slider_header_logo.source
                                    this.imagePreviewMainLogo = response.data.slider_main_logo.source
                                })
                                .catch((e) => {
                                    console.log(e);
                                    this.$Progress.fail();
                                });
                        },

                        update() {
                            this.$Progress.start();
                            this.form.busy = true;
                            console.log(this.$route.query.sliderEditId)
                            this.form.put(`${this.backendUrl}slider/`+this.$route.query.sliderEditId)
                                .then((response) => {
                                    console.log(response);
                                    if (this.form.successful) {
                                        this.$Progress.finish();
                                        this.$notify({
                                            type: "success",
                                            title: "Success",
                                            text: "Slider Updated Successfully",
                                        });
                                        this.$router.push({name: 'app.slider'})
                                    } else {
                                        this.$Progress.fail();
                                        this.$notify({
                                            type: "error",
                                            title: "Error",
                                            text: "Something went wrong try again later",
                                        });
                                    }
                                })
                                .catch((e) => {
                                    this.$Progress.fail();
                                    console.log(e);
                                });
                        },*/


            onImageChange(index,e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.imagePreview = reader.result;
                    let inputs = this.form.slider_detail_inputs;
                    $.each(this.form.slider_detail_inputs, function(index, element) {
                        inputs[index].image = reader.result;
                    })
                }
                reader.readAsDataURL(file);
            },

            addMoreSocialLinks(){
                this.form.slider_detail_inputs.push({
                    title:'',
                    detail_status:'',
                    image:'',
                });
            },

            removeSocialLinks(index){
                this.form.slider_detail_inputs.splice(index,1);
            }

        }
    }
</script>