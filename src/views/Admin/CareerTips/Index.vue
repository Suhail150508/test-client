<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                        <div class="col-md-8">
                            <h4 class="card-title">Career Tips & Tricks</h4>
                        </div>
                        <div class="col-md-4">
                            <!--<router-link :to="{name: 'app.career_tips.add'}" type="button" class="btn btn-sm btn-success float-end">
                                <i class="fas fa-plus"></i> Add New
                            </router-link>-->
                            <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Tips</button>
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
                                    <th style="width: 5%">S.No</th>
                                    <th style="width: 25%">Image</th>
                                    <th style="width: 30%">Title</th>
                                    <th style="width: 15%">Published Status</th>
                                    <th style="width: 25%">Actions</th>
                                </tr>
                            </thead>


                        <tbody>
                                <tr v-for="(item, index) of careerTips" class="text-center align-middle">
                                    <td>{{ index+1 }}</td>
                                    <td class="text-center"><img width="80" height="40" :src="item.image" :alt="item.id"></td>
                                    <td>{{ item.title }}</td>
                                     <td  class="text-center">
                                        <span v-if="item.published" class="badge bg-success">Published</span>
                                         <span v-else class="badge bg-warning">Unpublished</span>
                                     </td>
                                    <td class="text-center">
                                        <button type="button" @click="show(item)" class="btn btn-info btn-sm">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button type="button" @click="edit(item)" class="btn btn-primary btn-sm">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button type="button" @click="destroy(item.id)" class="btn btn-danger btn-sm">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr v-show="!careerTips.length">
                                    <td colspan="6">
                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                        No data available in table :(
                                    </div>
                                    </td>
                                </tr>
                        </tbody>
                    </table>

                    <div v-if="careerTips.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="careerTips.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">Career Tips & Tricks</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-8">
                                        <div class="form-group">
                                            <label>Title</label>
                                            <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="title" />
                                        </div>

                                        <div v-if="showMode==false" class="form-group">
                                            <label>Description</label>
                                            <Editor

                                                    v-model="form.body" name="body"
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
<!--                                            <textarea v-model="form.body" rows="3" cols="50" name="body" :readonly="showMode==true ? true : false" class="form-control" placeholder="Enter description here..."></textarea>-->
                                            <HasError :form="form" field="body" />
                                        </div>


                                        <div v-if="showMode==true" class="form-group" >
                                            <label>Description</label>
                                            <p style="height: 150px;overflow:auto;" v-html="form.body" class="form-control border" readonly></p>
                                        </div>

                                        <div class="form-group">
                                            <label>Published</label>
                                            <select v-if="showMode==false" name="published" class="form-control" v-model="form.published">
                                                <option value="">Select One</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                            <input v-if="showMode==true" v-model="form.published" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="published" />
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="my-2">
                                            <div class="mb-3">
                                                <h3 class="card-title">Photo</h3>
                                                <input v-if="showMode==false" type="file" name="image" class="form-control" @change="onImageChange" />
                                                <HasError :form="form" field="image"/>
                                            </div>
                                        </div>
                                        <div class="my-2">
                                            <div class="mb-3">
                                                <img class="mt-1" :src="imagePreview" style="width: 150px;" alt="" />
                                            </div>
                                        </div>

                                        <!--<div class="card">
                                            <div class="card-header bg-transparent border-bottom text-uppercase">
                                                <h4 class="card-title">Categories</h4>
                                                <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                    <a class="" data-bs-toggle="collapse" href="#collapseCategories" role="button" aria-expanded="false" aria-controls="collapseCategories">
                                                        <i class="fas fa-align-justify"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div  class="card-body collapse" id="collapseCategories">
                                                <ul class="list-unstyled" v-for="(item, index) in categories">
                                                    <li>
                                                        <input v-model="form.categories" type="checkbox" name="categories" :value="item.id"> {{ item.name }}
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
                                                <input v-show="showMode==false" type="file" name="image" id="file" class="form-control form-control-file border" @change="onImageChange" />
                                                <HasError :form="form" field="image" />
                                                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                            </div>
                                        </div>-->
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
    name: 'Index',
    components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

    data() {
      return {
        backendUrl: import.meta.env.VITE_API_BASE_URL,
        
        editMode: false,
        showMode: false,
        keyword: "",
        fieldName: "title",
        perPage: 10,
        careerTips: [],
        pagination: [],
        links: [],
        imagePreview: "",

        form: new Form({
          id: "",
          title: "",
          body: "",
          image: "",
          published: ""
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
        let linkUrl = url ? url :  `${this.backendUrl}career-tips`;
        axios.get(linkUrl, {
            params: {
                per_page: this.perPage,
                field_name: this.fieldName,
                keyword: this.keyword,
            }
        })
        .then((response) => {
            this.careerTips = response.data.data;
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
            this.imagePreview = "";
            $("#exampleModal").modal("show");
        },

        show(item) {
            this.showMode = true
            this.form.reset()
            this.form.clear()
            this.form.fill(item)
            this.imagePreview = item.image;
            $("#exampleModal").modal("show");
        },

        edit(item) {
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
            this.form.post(`${this.backendUrl}career-tips`)
            .then(response => {
                this.getData()
                $('#exampleModal').modal('hide')
                if (this.form.successful) {
                    this.$Progress.finish()
                    this.$notify({ type: "success", title: "Success", text: response.data.data.message });
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
            this.form.put(`${this.backendUrl}career-tips/`+this.form.id)
                .then(response => {
                    this.getData()
                    $('#exampleModal').modal('hide')
                    if(this.form.successful){
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: "Career Tips & Tricks Updated" });
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
                    axios.delete(`${this.backendUrl}career-tips/`+id)
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