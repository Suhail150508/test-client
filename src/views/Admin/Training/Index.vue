<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of Training-Workshop-Seminar</h4>
                
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Training-Workshop-seminar</button>
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
                                    <select @change="getData(null)" v-model="perPage" class="form-select form-select-sm">
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
                                    <select v-model="fieldName" id="fields" class="form-select form-select-sm">
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
                        <tr>
                            <th>Serial No</th>
                            <th>Training Image</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th scope="col">Applications <i class="fa-sharp fa-regular fa-file"></i></th>
                            <th>Status</th>
                            <th>Validity Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(training, index) of trainings">
                           
                            <td>{{ index+1 }}</td>
                            <td>
                                <img class="mt-1" :src="training.training_image" style="width: 80px;border-radius: 40%;" alt="" />
                            </td>
                            <td style="width:25%">{{ training.title }}</td>
                            <td>{{ training.start_date }}</td>
                            <td>{{ training.end_date }}</td>
                            <td> 
                             <router-link :to="{ name: 'app.training_application' , query: { trainingId: training.id }}" class="btn btn-sm btn-success">
                              <i class="fa-solid fa-person-circle-check"></i> {{ training.training_applications }}
                             </router-link>
                            </td>
                            <td>{{ training.status }}</td>
                            <td>
                                <span v-if="training.current_date  <= training.end_date" class="badge bg-success"><b>Activated</b></span>
                                <span v-else class="badge bg-danger">DeActivated</span>
                            </td>
                            <td>
                                <button type="button" @click="show(training)" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>

                                <button type="button" @click="edit(training)" class="btn btn-primary btn-sm" >
                                    <i class="fas fa-edit"></i>
                                </button>

                                <button type="button" @click="destroy(training.id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-show="!trainings.length">
                            <td colspan="9">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="trainings.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="trainings.length">
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
            <div class="modal fade" id="exampleModall" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Training</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body">
                                    <div class="form-group">
                                        <label>Title</label>
                                        <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                        <HasError :form="form" field="title" />
                                    </div>

                                    <div class="form-group">
                                        <label>Duration(Days)</label>
                                        <input v-model="form.duration_in_days" type="text" name="duration_in_days" class="form-control" placeholder="Duration in days" :readonly="showMode==true ? true : false">
                                        <HasError :form="form" field="duration_in_days" />
                                    </div>

                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea v-model="form.description" rows="3" cols="50" name="description" :readonly="showMode==true ? true : false" class="form-control" placeholder="Enter description here..."></textarea>
                                        <HasError :form="form" field="description" />
                                    </div>
                                  

                                    <!-- <div class="form-group">
                                        <label>Image</label>
                                        <input type="file" name="image" id="image" class="form-control-file border" @change="onImageChange" />
                                        <HasError :form="form" field="image" />
                                    </div> -->

                                    <!-- <div class="form-group">
                                      <input v-model="form.published" type="checkbox">
                                      <span> Published</span>
                                    </div> -->

                                </div>
                                <div class="modal-footer">
                                    <button v-if="showMode==false" :disabled="form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

                <!-- Create and Edit Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body">
                                    <div class="form-group">
                                        <label>Title</label>
                                        <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                        <HasError :form="form" field="title" />
                                    </div>

                                    <div class="row my-2">
                                        <div class="form-group col-md-6">
                                            <label>Start Date</label>
                                            <input v-model="form.start_date" type="date" name="start_date" class="form-control" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="start_date" />
                                        </div>

                                        <div class="form-group col-md-6">
                                            <label>End Date</label>
                                            <input v-model="form.end_date" type="date" name="end_date" class="form-control" :readonly="showMode==true ? true : false">
                                        </div>
                                    </div>

                                    <div v-if="showMode==false" class="form-group my-2">
                                        <label>Description</label>
                                        <Editor
                                                v-model="form.description" name="description" :readonly="showMode==true ? true : false"
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

                                    <div v-if="showMode==true" class="form-group my-2">
                                        <label>Description</label>
                                        <p style="height: 150px;overflow:auto;" v-html="form.description" class="form-control border" readonly></p>
                                    </div>
                                    <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label> Image</label>
                                            <input type="file" name="training_image" @change="onImageChangeMainLogo"   class="form-control" id="formrow-firstname-input">
                                            <img class="mt-1" :src="imagePreviewResumeImage" style="width: 100px;" alt="" />
                                            <HasError :form="form" field="title" />
                                        </div>

                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <img class="mt-1" :src="training_image" style="width: 100px;" alt="" />
                                            <HasError :form="form" field="title" />
                                        </div>
                                        
                                    </div>
                                       
                                    </div>
                                    

                                    <div class="form-group my-2">
                                        <label>Status</label>
                                        <select v-if="showMode==false" name="status" class="form-control" v-model="form.status">
                                            <option value="">Select One</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" placeholder="Status" :readonly="showMode==true ? true : false">
                                        <HasError :form="form" field="status" />
                                    </div>

                                    <!-- <div class="form-group">
                                        <label>Image</label>
                                        <input type="file" name="image" id="image" class="form-control-file border" @change="onImageChange" />
                                        <HasError :form="form" field="image" />
                                    </div> -->

                                    <!-- <div class="form-group">
                                      <input v-model="form.published" type="checkbox">
                                      <span> Published</span>
                                    </div> -->

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
    import Editor from '@tinymce/tinymce-vue'

    export default {
        name: 'CCCNewsTable',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                imagePreviewResumeImage:"",
                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "title",
                perPage: 10,
                trainings: [],
                pagination: [],
                links: [],
                training_image:"",

                form: new Form({
                    id: "",
                    title: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                    status:""
                }),

            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            console.log("Component mounted.");
            this.getData();
        },

        methods: {
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}training`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.trainings = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            onImageChangeMainLogo(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.imagePreviewResumeImage = reader.result;
                    this.form.training_image = reader.result;
                    // this.render_image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            create() {
                this.editMode = false
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.training_image = ""
                // $("#image").val('')
                $("#exampleModal").modal("show");
            },

            show(id) {
                this.showMode = true
                this.form.reset()
                this.form.clear()
                this.form.fill(id)
                this.training_image = id.training_image,
                $("#exampleModal").modal("show");
            },

            edit(id) {
                console.log(id);
                this.editMode = true
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.form.fill(id)
                this.training_image = id.training_image,
                $("#exampleModal").modal("show");
            },

            onImageChange(e){
                this.form.image = e.target.files[0];
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}training`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Training Added" });
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
                this.form.put(`${this.backendUrl}training/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Training Updated" });
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
                        axios.delete(`${this.backendUrl}training/`+id, )
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