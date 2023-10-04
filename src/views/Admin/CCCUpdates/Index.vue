<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List of CCC-Updates</h4>
                        <span>
                            This is an CCC-Update related information about Alumni and Student
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add CCC-Update</button>
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
                                        <option value="types">Type</option>
                                        <option value="semester_and_year">Semester And Year</option>
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
                            <th>S.No</th>
                            <th>Image</th>
                            <th>Type</th>
                            <th>Semester And Year</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of cccUpdates" class="text-center align-middle">
                            <td>{{ index+1 }}</td>
                            <td>
                                <img width="80" height="40" :src="item.image" :alt="item.id">
                            </td>
                            <td>{{ item.types }}</td>
                            <td>{{ item.semester_and_year ? item.semester_and_year: 'N/A' }}</td>
                            <td style="width: 30%">{{ item.title }}</td>
                            <td>
                                <span v-if="item.published == 1" class="badge badge-soft-success font-size-11 fw-bold">Active</span>
                                <span v-else class="badge badge-soft-pink font-size-11 fw-bold">Inactive</span>
                            </td>
                            <td>
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

                        <tr v-show="!cccUpdates.length">
                            <td colspan="7">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="cccUpdates.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="cccUpdates.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">CCC-Updates</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />
                                <div class="row">
                                    <div class="col-xl-8">
                                        <div class="modal-body ">
                                            <div class="form-group">
                                                <label>Types</label>
                                                <select v-if="showMode==false" v-model="form.types" name="types" class="form-control" @change="getType($event)">
                                                    <option value="">Select One</option>
                                                    <option value="General">General</option>
                                                    <option value="Semester wise">Semester wise</option>
                                                    <option value="Annual">Annual</option>
                                                    <option value="Gallery">Gallery</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="form.types" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                <HasError :form="form" field="types" />
                                            </div>

                                            <div class="form-group" v-if="sub_type_visibility">
                                                <label>Semester And Year</label>
                                                <select v-if="showMode==false" v-model="form.semester_and_year" name="semester_and_year" class="form-control">
                                                    <option value="">Select One</option>
                                                    <option :value="year" v-for="year in years" :key="year">{{ year }}</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="form.semester_and_year" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                <HasError :form="form" field="semester_and_year" />
                                            </div>

                                            <div class="form-group">
                                                <label>Title</label>
                                                <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                                <HasError :form="form" field="title" />
                                            </div>

                                            <div v-if="showMode==false" class="form-group my-2">
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
                                                <label>Published</label>
                                                <select v-if="showMode==false" name="published" class="form-control" v-model="form.published">
                                                    <option value="">Select One</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </select>
                                                <div v-if="showMode==true">
                                                    <span v-if="form.published === 1" class="badge badge-soft-success font-size-11 fw-bold">Active</span>
                                                    <span v-else class="badge badge-soft-pink font-size-11 fw-bold">Inactive</span>
                                                </div>
                                                <HasError :form="form" field="published" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="card">
                                            <div class="card-header bg-transparent border-bottom text-uppercase">
                                                <h4 class="card-title">Categories</h4>
                                                <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                    <a class="" data-bs-toggle="collapse" href="#collapseCategories" role="button" aria-expanded="false" aria-controls="collapseCategories">
                                                        <i class="fas fa-align-justify"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="card-body collapse" id="collapseCategories">
                                                <ul class="list-unstyled" v-for="item in categories">
                                                    <li>
                                                        <input v-model="form.categories" type="checkbox" name="category" :value="item.id" > {{ item.name }}
                                                        <HasError :form="form" field="category" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card-header bg-transparent border-bottom text-uppercase">
                                                <h4 class="card-title">Featured Image</h4>
                                                <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                    <a class="" data-bs-toggle="collapse" href="#collapseFeaturedImage" role="button" aria-expanded="false" aria-controls="collapseFeaturedImage">
                                                        <i class="fas fa-align-justify"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="card-body collapse" id="collapseFeaturedImage">
                                                <input v-if="showMode==false" type="file" name="image" id="file" class="form-control form-control-file border" @change="onImageChange" />
                                                <HasError :form="form" field="image" />
                                                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
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
                keyword: "",
                fieldName: "types",
                perPage: 10,
                cccUpdates: [],
                pagination: [],
                links: [],
                categories: [],
                imagePreview: "",
                form: new Form({
                    id: "",
                    types: "",
                    semester_and_year: "",
                    title: "",
                    description: "",
                    categories: [],
                    image: "",
                    published:""
                }),
                sub_type_visibility: false,
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
            console.log("Component mounted.");
            this.getData();
            this.getCategory();
        },

        methods: {
            getType(){
                if (this.form.types === 'Semester wise') {
                    this.sub_type_visibility = true;
                } else{
                    this.sub_type_visibility = false;
                    this.form.semester_and_year = "";
                }
            },

            getCategory() {
                let linkUrl =`${this.backendUrl}category`;
                axios.get(linkUrl)
                    .then((response) => {
                        this.categories = response.data.data;
                        console.log(this.categories)
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}ccc-updates`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.cccUpdates = response.data.data;
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
                this.imagePreview = ""
                this.form.reset()
                this.form.clear()
                $("#exampleModal").modal("show");
            },

            show(item) {
                if (item.semester_and_year) {
                    this.sub_type_visibility = true;
                } else {
                    this.sub_type_visibility = false;
                }
                this.showMode = true
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                this.imagePreview = item.image
                $("#exampleModal").modal("show");
            },

            edit(item) {
                if (item.semester_and_year) {
                    this.sub_type_visibility = true;
                } else {
                    this.sub_type_visibility = false;
                }
                this.editMode = true
                this.showMode = false
                this.imagePreview = item.image;
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
                    this.imagePreview = reader.result;
                    this.form.image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}ccc-updates`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "CCC-Update Added" });
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
                this.form.put(`${this.backendUrl}ccc-updates/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "CCC-Update Updated" });
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
                    text: "You will be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}ccc-updates/`+id)
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
</style>