<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of Sliders</h4>
                        <span>
                            This is an Slider related information about CCC
                        </span>
                    </div>
                    <div class="col-md-4">
                    <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Slider</button>
                    </div>
                </div>

                <div class="card-body">

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-2" style="margin: auto 0;">
                                    <span>Show</span>
                                </div>

                                <div class="col-md-3">
                                    <select @change="getData(null)" v-model="perPage" class="form-select form-control">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>

                                <div class="col-md-3" style="margin: auto 0;">
                                    <span>entries</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-2" style="margin: auto;">
                                    <strong>Search By :</strong>
                                </div>

                                <div class="col-md-3">
                                    <select v-model="fieldName" id="fields" class="form-select form-control">
                                        <option value="place">Place</option>
                                        <option value="title">Title</option>
                                        <option value="description">Description</option>
                                    </select>
                                </div>

                                <div class="col-md-7">
                                    <input v-model="keyword" type="text" class="form-control" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                        <tr class="text-center align-middle">
                            <th style="width: 5%;">S. No</th>
                            <th>Image</th>
                            <th>Place</th>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(slider,index) of sliders" class="text-center align-middle">
                            <td style="width: 5%" >{{ index+1 }}</td>
                            <td style="width: 25%" class="text-center"><img width="80" height="40" :src="slider.image" :alt="slider.id"></td>
                            <td style="width: 15%">{{ slider.place }}</td>
                            <td style="width: 15%">{{ slider.title }}</td>
                            <td style="width: 15%">{{ slider.url }}</td>
                            <td style="width: 15%">{{ slider.slider_status }}</td>
                            <td style="width: 25%">
                                <button type="button" @click="show(slider)" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>

                                <button type="button" @click="edit(slider)" class="btn btn-primary btn-sm" >
                                    <i class="fas fa-edit"></i>
                                </button>

                                <button type="button" @click="destroy(slider.id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-show="!sliders.length">
                            <td colspan="7">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="sliders.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="sliders.length">
                            Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                        </div>

                        <PaginationComponent
                                :links = 'links'
                                @get-data="getData"
                        />
                    </div>

                </div>
            </div>

            <!-- Create and Edit Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Slider</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>
                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-6 col-md-6 mb-3">
                                        <label>Place</label>
                                        <!-- <input v-model="form.place" type="text" name="place" class="form-control" placeholder="Where To place" :readonly="showMode==true ? true : false">
                                        <HasError :form="form" field="place" /> -->

                                        <select v-if="showMode==false" name="place" id="" class="form-control" v-model="form.place">
                                            <option value="">Select One</option>
                                            <option value="ccc_home">CCC Home</option>
                                            <option value="alumni_home">Alumni Home</option>
                                            <option value="club">Club</option>
                                        </select>
                                        <HasError :form="form" field="place" />
                                        <input v-if="showMode==true" v-model="form.place" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                    </div>

                                    <div class="col-lg-6 col-md-6 mb-3">
                                        <label>Title</label>
                                        <input type="text" v-model="form.title" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false"/>
                                        <HasError :form="form" field="title" />
                                    </div>

                                    <div class="col-lg-12 col-md-12 mb-3">
                                        <label>URL</label>
                                        <input type="text" v-model="form.url" name="url" class="form-control" placeholder="URL" :readonly="showMode==true ? true : false"/>
                                        <HasError :form="form" field="url" />
                                    </div>

                                    <div class="col-lg-12 col-md-12 mb-3">
                                        <label>Description</label>
                                        <textarea v-model="form.short_description" rows="3" cols="50" name="short_description" :readonly="showMode==true ? true : false" class="form-control" placeholder="Enter Short Description here..."></textarea>
                                        <HasError :form="form" field="description" />
                                    </div>

                                    <div class="col-xl-6 col-md-6 mb-3">
                                        <label>Status</label>
                                        <select v-if="showMode==false" name="slider_status" id="" class="form-control" v-model="form.slider_status">
                                            <option value="">Select One</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        <input v-if="showMode==true" v-model="form.slider_status" type="text" class="form-control" placeholder="Approval" :readonly="showMode==true ? true : false">
                                        <HasError :form="form" field="slider_status" />
                                    </div>

                                    <div class="col-lg-4 col-md-4 mb-3">
                                        <div class="mb-3">
                                            <label>Slider Image</label>
                                            <input v-if="showMode==false" type="file" name="image" class="form-control" @change="onImageChange" />
                                            <HasError :form="form" field="image" />
                                        </div>
                                    </div>

                                    <div class="col-md-2 my-2">
                                        <div class="mb-3">
                                            <img class="mt-1" :src="onImagePreview" style="width: 80px;" alt="" />
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button v-if="showMode==false" :disabled="form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                </div>
                            </form>
                        </div>
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
    import Form from 'vform';
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";

    export default {
        name: 'Slider',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,

                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "place",
                perPage: 10,
                sliders: [],
                pagination: [],
                links: [],

                onImagePreview:"",

                form: new Form({
                    id: '',
                    place: '',
                    title:'',
                    url:'',
                    short_description:'',
                    slider_status: '',
                    image:'',
                }),

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
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}slider`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.sliders = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            create() {
                this.editMode = false
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.onImagePreview = "";
                this.form.image = ""
                $("#exampleModal").modal("show");
            },

            show(item) {
                this.showMode = true
                this.onImagePreview = item.image;
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                $("#exampleModal").modal("show");
            },

            edit(item) {
                this.editMode = true
                this.showMode = false
                this.onImagePreview = item.image;
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                this.form.image = ""
                $("#exampleModal").modal("show");
            },

            onImageChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.onImagePreview = reader.result;
                    this.form.image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}slider`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Slider Added" });
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

            update() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}slider/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Slider Updated" });
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

            destroy(id){
                // this.$swal
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}slider/`+id, )
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getData()
                            });
                    }
                })
            }
        }
    }
</script>

<style>

</style>