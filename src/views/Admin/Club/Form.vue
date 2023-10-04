<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Club {{ editMode ? 'Update' : 'Create' }}</h4>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'app.club' }" type="button" class="btn btn-sm btn-success float-end">
                                <i class="fas fa-left-arrow"></i> All Clubs
                            </router-link>
                        </div>
                    </div>

                    <div class="card-body">
                        <!-- <form @submit.prevent="store()" @keydown="form.onKeydown($event)"> -->
                        <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                            <div v-if="form.progress" class="text-center">
                                Progress: {{ form.progress.percentage }}%
                            </div>

                            <AlertError :form="form" message="There were some problems with your input." />

                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header bg-success fw-medium">Basic Information</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-9">
                                                    <div class="mb-3">
                                                        <h3 class="card-title fw-bolder">Add Club Name</h3>
                                                        <input v-model="form.title" type="text" class="form-control" placeholder="Add Club Name/Title">
                                                        <HasError :form="form" field="title"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <h3 class="card-title fw-bolder">Short Name</h3>
                                                        <input v-model="form.short_name" type="text" class="form-control lowercase" placeholder="Ex: ewuscc">
                                                        <HasError :form="form" field="short_name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <h3 class="card-title fw-bolder">Upload Main Logo</h3>
                                                        <input type="file" name="main_logo" class="form-control" @change="onImageChangeMainLogo" />
                                                        <HasError :form="form" field="main_logo" />
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="mb-3">
                                                        <img class="mt-1" :src="imagePreviewMainLogo" style="width: 100px;" alt="" />
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <h3 class="card-title fw-bolder">Upload Header Logo</h3>
                                                        <input type="file" name="header_logo" class="form-control" @change="onImageChange" />
                                                        <HasError :form="form" field="header_logo" />
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="mb-3">
                                                        <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <h3 class="card-title fw-bolder">Body Description</h3>
                                                <Editor
                                                        v-model="form.description" name="description"
                                                        api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
                                                        :init="{
                                                  height: 200,
                                                  plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                  ],
                                                  toolbar: 'undo redo | blocks | ' +
                                                  'bold italic backcolor | alignleft aligncenter ' +
                                                  'alignright alignjustify | bullist numlist outdent indent | ' +
                                                  'removeformat | help',

                                                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                                                }"
                                                />
                                                <HasError :form="form" field="description" />
                                            </div>

                                            <div class="mb-3">
                                                <h3 class="card-title fw-bolder">All Members</h3>
                                                <Editor
                                                        v-model="form.about" name="about"
                                                        api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
                                                        :init="{
                                                  height: 200,
                                                  plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                                  ],
                                                  toolbar: 'undo redo | blocks | ' +
                                                  'bold italic backcolor | alignleft aligncenter ' +
                                                  'alignright alignjustify | bullist numlist outdent indent | ' +
                                                  'removeformat | help',

                                                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                                                }"
                                                />
                                                <HasError :form="form" field="about" />
                                            </div>
                                        </div>
                                        <!-- end card body -->
                                    </div>
                                    <!-- end card -->
                                </div>
                                <!-- end col -->

                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header text-light bg-info fw-medium">
                                            <i class="fas fa-mobile-alt"></i> Contact Information</div>
                                        <div class="card-body">
                                            <div data-repeater-list="group-a">
                                                        <div data-repeater-item class="row">
                                                            <div class="form-floating col-md-6 mb-3">
                                                                <input v-model="form.c_address" name="c_address" type="text" class="form-control"  placeholder="Enter Address">
                                                                <label> Address</label>
                                                                <HasError :form="form" field="c_address" />
                                                            </div>
                                                            <div class="form-floating col-md-6 mb-3">
                                                                <input v-model="form.c_phone" name="c_phone" type="text" class="form-control"  placeholder="Enter Phone">
                                                                <label> Phone</label>
                                                                <HasError :form="form" field="c_phone" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-floating mb-3">
                                                                    <input v-model="form.c_email" name="c_email" type="email" class="form-control" placeholder="Enter Email address">
                                                                    <label for="floatingemailInput">Email address</label>
                                                                    <HasError :form="form" field="c_email" />
                                                                </div>
                                                            </div>
                                                            <div class="form-floating col-md-6 mb-3">
                                                                <input v-model="form.c_room_no" name="c_room_no" type="text" class="form-control"  placeholder="Enter Name">
                                                                <label> Room No.</label>
                                                                <HasError :form="form" field="c_room_no" />
                                                            </div>
                                                            <div class="form-floating col-md-12 mb-3">
                                                                <textarea v-model="form.c_description" name="c_description" class="form-control" rows="3" placeholder="Enter Your Message"></textarea>
                                                                <label> Contact Description</label>
                                                                <HasError :form="form" field="c_description" />
                                                            </div>
                                                        </div>
                                                    </div>
                                            <!-- end row -->
                                        </div>
                                    </div>
                                    <!-- end card -->
                                </div>

                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header text-light bg-primary fw-medium">
                                            <i class="fas fa-mobile-alt"></i> Social Links</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div data-repeater-list="group-a">
                                                    <div>
                                                        <div data-repeater-item class="row" v-for="(row, index) in form.social_link_inputs">
                                                            <div  class="mb-3 col-lg-3">
                                                                <label for="social_name">Social Name</label>
                                                                    <input type="text" v-model="row.social_name" :name="'socialLinks['+index+'][social_name]'" class="form-control" placeholder="Facebook"/>
                                                            </div>
                                                            <div  class="mb-3 col-lg-3">
                                                                <label for="class_icon">Icon Class</label>
                                                                <input type="text" v-model="row.icon_class" :name="'socialLinks['+index+'][icon_class]'" class="form-control" placeholder="fab fa-facebook"/>
                                                            </div>

                                                            <div class="mb-3 col-lg-4">
                                                                <label for="social_link">Social Link</label>
                                                                <input type="text" v-model="row.social_link" class="form-control" :name="'socialLinks['+index+'][social_link]'" placeholder="https://www.facebook.com/xyz">
                                                            </div>

                                                            <div class="col-lg-1 align-self-center">
                                                                <div v-if="index!=0" class="d-grid">
                                                                    <input data-repeater-delete type="button" class="btn btn-primary" value="Delete" @click.prevent="removeSocialLinks(index)"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a class="btn btn-success float-end" @click.prevent="addMoreSocialLinks">
                                                        <i class="fa fa-plus-circle"></i>
                                                        Add
                                                    </a>
                                                </div>
                                            </div>
                                            <!-- end row -->
                                            <div class="card-foter">
                                                <div class="row mb-3">
                                                    <div class="col-lg-3">
                                                        <label> Club Status</label>
                                                        <select class="form-control" name="status" v-model="form.status">
                                                            <option selected>Select One</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Inactive">Inactive</option>
                                                        </select>
                                                        <HasError :form="form" field="status" />
                                                    </div>
                                                </div>
                                            </div>

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
                                        class="btn btn-primary"
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
                imagePreviewMainLogo: "",
                imagePreview: "",
                clubData: [],
                form: new Form({
                    id:'',
                    title:'',
                    short_name:'',
                    description:'',
                    about:'',
                    status:'',
                    c_address:'',
                    c_email:'',
                    c_phone:'',
                    c_room_no:'',
                    c_description:'',
                    social_link_inputs:[{
                        social_name:'',
                        icon_class:'',
                        social_link:'',
                    }],
                    main_logo:'',
                    header_logo:'',

                }),
            };
        },

        mounted() {
            if (this.$route.query.clubEditId){
                this.editMode = true;
                this.edit();
            }
            console.log(this.$route.query.clubEditId);
        },

        methods:{

            store() {
                this.$Progress.start();
                this.form.busy = true;
                this.form.post(`${this.backendUrl}club`)
                    .then((response) => {
                        if (this.form.successful) {
                            this.$Progress.finish();
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Club Added Successfully",
                            });
                            this.$router.push({name: 'app.club'})
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

            edit(){
                let linkUrl = `${this.backendUrl}club/edit/`+this.$route.query.clubEditId;
                axios.get(linkUrl)
                    .then((response) => {
                        console.log(response)
                        this.form.id = response.data.id;
                        this.form.title = response.data.title;
                        this.form.short_name = response.data.short_name;
                        this.form.description = response.data.description;
                        this.form.about = response.data.about;
                        this.form.status = response.data.status;
                        this.form.c_address = response.data.c_address;
                        this.form.c_email = response.data.c_email;
                        this.form.c_phone = response.data.c_phone;
                        this.form.c_room_no = response.data.c_room_no;
                        this.form.c_description = response.data.c_description;


                        var inputs = this.form.social_link_inputs;
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
                        this.imagePreview = response.data.club_header_logo.source
                        this.imagePreviewMainLogo = response.data.club_main_logo.source
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            update() {
                this.$Progress.start();
                this.form.busy = true;
                this.form.put(`${this.backendUrl}club/`+this.$route.query.clubEditId)
                    .then((response) => {
                        this.$notify({
                            type: "success",
                            title: "Success",
                            text: "Club Updated Successfully",
                        });
                        this.$router.push({name: 'app.club'})

                        /*if (this.form.successful) {
                            this.$Progress.finish();
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Club Updated Successfully",
                            });

                        } else {
                            this.$Progress.fail();
                            this.$notify({
                                type: "error",
                                title: "Error",
                                text: "Something went wrong try again later",
                            });
                        }*/
                    })
                    .catch((e) => {
                        this.$notify({
                            type: "success",
                            title: "Success",
                            text: "Club Updated Successfully",
                        });
                        this.$router.push({name: 'app.club'})
                        /*this.$Progress.fail();
                        console.log(e);*/
                    });
            },

            onImageChangeMainLogo(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.imagePreviewMainLogo = reader.result;
                    this.form.main_logo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onImageChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.imagePreview = reader.result;
                    this.form.header_logo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            addMoreSocialLinks(){
                this.form.social_link_inputs.push({
                    social_name:'',
                    icon_class:'',
                    social_link:'',
                });
            },

            removeSocialLinks(index){
                this.form.social_link_inputs.splice(index,1);
            }

        }
    }
</script>