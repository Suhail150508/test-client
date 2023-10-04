<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of News</h4>
                        <span>
                            This is an News related information about Alumni and Student
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add News</button>
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
                                    <select @change="getData(null)" v-model="perPage" class="form-select form-select-sm form-control">
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
                                    <select v-model="fieldName" id="fields" class="form-select form-select-sm form-control">
                                        <option value="title">Title</option>
                                        <option value="description">Description</option>
                                    </select>
                                </div>

                                <div class="col-md-7">
                                    <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                        <tr class="text-center align-middle">
                            <th style="width: 5%;">S.No</th>
                            <th>Title</th>
                            <th>Place</th>
                            <th>Type</th>
                            <th>semester_and_year</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of news" class="text-center align-middle">
                            <td style="width: 5%">{{ index+1 }}</td>
                            <td style="width: 20%">{{ item.title }}</td>
                            <td style="width: 15%">{{ item.place }}</td>
                            <td style="width: 15%">{{ item.types }}</td>
                            <td style="width: 15%">{{ item.semester_and_year ?item.semester_and_year: "N/A" }}</td>
                            <td style="width: 15%">{{ item.status }}</td>
                            <td style="width: 20%">
                                <button type="button" @click="show(item)" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>

                                <button type="button" @click="edit(item)" class="btn btn-primary btn-sm" >
                                    <i class="fas fa-edit"></i>
                                </button>

                                <button type="button" @click="destroy(item.id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-show="!news.length">
                            <td colspan="7">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="news.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="news.length">
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
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">News {{ editMode ? 'Update' : 'Create' }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-8">
                                        <div class="row mb-3">
                                            <div class="col-xl-12 col-md-6 mb-3">
                                                <label>Place</label>
                                                <select v-if="showMode==false" class="form-control" v-model="form.place">
                                                    <option value="">Select One</option>
                                                    <option value="ccc_home">CCC Home</option>
                                                    <option value="alumni">Alumni</option>
                                                </select>
                                                <HasError :form="form" field="place" />
                                                <input v-if="showMode==true" v-model="form.place" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                            </div>
                                            <div class="col-xl-12 col-md-6">
                                                <label>Type</label>
                                                <select v-if="showMode==false" v-model="form.types"  name="types" @change="changeType($event)" class="form-control">
                                                    <option value="">Select One</option>
                                                    <option value="General">General</option>
                                                    <option value="Semester wise">Semester wise</option>
                                                    <option value="Annual">Annual</option>
                                                    <option value="Gallery">Gallery</option>
                                                </select>
                                                <HasError :form="form" field="place" />
                                                <input v-if="showMode==true" v-model="form.place" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                            </div>

                                        </div>

                                        <div class="form-group mb-3" v-if="semester_wise">
                                                <label>Semester And Year</label>
                                                <select v-if="showMode==false" v-model="form.semester_and_year" name="semester_and_year" class="form-control">
                                                    <option value="">Select One</option>
                                                    <option :value="year" v-for="year in years" :key="year">{{ year }}</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="form.semester_and_year" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                <HasError :form="form" field="semester_and_year" />
                                        </div>
                                        <div class="form-group mb-3">
                                            <label>Title</label>
                                            <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="title" />
                                        </div>

                                        <div v-if="showMode==false" class="form-group mb-3">
                                            <label>Description</label>
                                            <Editor
                                                    v-model="form.description" name="description"
                                                    api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
                                                    :init="{
                                                      height: 250,
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

                                        <div v-if="showMode==true" class="form-floating col-md-12 mb-3">
                                            <div class="form-group">
                                                <label>Description</label>
                                                <p v-html="form.description" rows="10" class="form-control border" readonly></p>
                                                <HasError :form="form" field="description" />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label>Status</label>
                                            <select v-if="showMode==false" name="status" class="form-control" v-model="form.status">
                                                <option value="">Select One</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" placeholder="Status" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="status" />
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <!-- <div class="my-2">
                                            <div class="mb-3">
                                                <h3 class="card-title">Photo</h3>
                                                <input v-if="showMode==false" type="file" name="image" class="form-control" @change="onImageChange" />
                                                <HasError :form="form" field="image"/>
                                            </div>
                                        </div>
                                        <div class="my-2">
                                            <div class="mb-3">
                                                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                            </div>
                                        </div> -->

                                        <div>
                                            <div class="my-2">
                                                <div class="mb-3">
                                                    <h3 class="card-title">Photos</h3>
                                                    <input v-if="showMode==false" type="file" name="images" multiple class="form-control" @change="handleMultipleFile" />
                                                    <HasError :form="form" field="images"/>
                                                </div>
                                            </div>

                                            <div class="my-2">
                                                <div class="mb-3">
                                                    <!-- <div v-for="(image, index) in form.images" :key="index" class="image-container">
                                                        <img class="m-1" style="width: 80px; height: 100px; border: 2px solid black;" :src="image" alt="Image" />

                                                        <button v-if="showMode==false" class="btn btn-sm remove-button text-danger" type="button" @click="removeMultipleFile(index)">
                                                            <span><b>X</b></span>
                                                        </button>
                                                    </div> -->
                                                    <div v-for="(image, index) in imagePreview" :key="index" class="image-container">
                                                        <img class="m-1" style="width: 80px; height: 100px; border: 2px solid black;" :src="image" alt="Image" />

                                                        <button v-if="showMode==false" class="btn btn-sm remove-button text-danger" type="button" @click="removeMultipleFile(index)">
                                                            <span><b>X</b></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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
    import Editor from '@tinymce/tinymce-vue'
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";

    export default {
        name: 'CCCNewsTable',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor  },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                editMode: false,
                showMode: false,
                semester_wise: false,
                keyword: "",
                fieldName: "title",
                perPage: 10,
                news: [],
                pagination: [],
                links: [],

                imagePreview: [],
                form: new Form({
                    id: "",
                    place: "",
                    types: "",
                    semester_and_year: "",
                    title: "",
                    description: "",
                    status: "",
                    images: [],
                }),


            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        computed: {
            years() {
                const currentYear = new Date().getFullYear();
                const startYear = 1995;
                const yearsArray = [];
                for (let year = startYear; year <= currentYear; year++) {
                    yearsArray.push(`Spring-${year}`, `Summer-${year}`, `Fall-${year}`);
                }
                return yearsArray;
            }
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}news`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.news = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            changeType($event) {
                if($event.target.value == "Semester wise") {
                    this.semester_wise = true;
                }else{
                    this.semester_wise = false; 
                }
            },

            create() {
                this.editMode = false
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.form.images = [];
                
                $("#exampleModal").modal("show");
            },

            show(item) {
                if (item.semester_and_year) {
                    this.semester_wise = true;
                } else {
                    this.semester_wise = false;
                }
                this.showMode = true
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                this.form.images = [];

                for(let i=0; i<item.images.length; i++) {
                    this.form.images[i] = item.images[i].source;                    
                }

                $("#exampleModal").modal("show");
            },

            edit(item) {
                if (item.semester_and_year) {
                    this.semester_wise = true;
                } else {
                    this.semester_wise = false;
                }
                this.editMode = true
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                this.form.images = [];

                for(let i=0; i<item.images.length; i++) {
                    // this.form.images[i] = item.images[i].source;                    
                    this.imagePreview[i] = item.images[i].source;                    
                }

                $("#exampleModal").modal("show");
            },

            // handleMultipleFile(e) {
            //     this.form.images = [];
            //     let files = e.target.files;

            //     for (let i = 0; i < files.length; i++) {
            //         let reader = new FileReader();
            //         reader.onload = (e) => {
            //             this.imagePreview[i] = reader.result;
            //             this.form.images[i] = reader.result;
            //         };
            //         reader.readAsDataURL(files[i]);
            //     }
            // },

            // removeMultipleFile(index) {
            //     // this.form.images.splice(index, 1);
            //     this.imagePreview.splice(index, 1);
            // },

            handleMultipleFile(e) {
                let files = e.target.files;

                for (let i = 0; i < files.length; i++) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        this.imagePreview.push(reader.result); // Append to existing images
                        this.form.images.push(reader.result); // Update the form's images array
                    };
                    reader.readAsDataURL(files[i]);
                }
            },

            removeMultipleFile(index) {
                this.imagePreview.splice(index, 1); // Remove from imagePreview array
                this.form.images.splice(index, 1); // Remove from this.form.images array
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}news`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "News Added" });
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
                this.form.put(`${this.backendUrl}news/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "News Updated" });
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
                        axios.delete(`${this.backendUrl}news/`+id, )
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

<style scoped>
    p[readonly] {
        background-color: #f5f5f5;
        height: 100px;
        border: none;
        resize: none;
        overflow: auto;
        outline: none;
    }

    .image-container {
        position: relative;
        display: inline-block;
    }

    .remove-button {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .remove-button:hover {
        background-color: #ffcccc;
    }
</style>