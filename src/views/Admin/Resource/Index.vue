<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of Resources</h4>
                        <span>
                            This is an Resources related information about Resources
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Resource</button>
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
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Icon-Class</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of resources">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.icon_class }}</td>
                            <td>{{ item.status }}</td>
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

                        <tr v-show="!resources.length">
                            <td colspan="6">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="resources.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="resources.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">Resource Information</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" enctype="multipart/form-data">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-12">
                                        <div class="form-group my-2">
                                            <label>Title</label>
                                            <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="title" />
                                        </div>
                                        <div class="row">
                                            <div class="form-group my-2 col-xl-6">
                                                <label>Icon-Class</label>
                                                <input v-model="form.icon_class" type="text" name="icon_class" class="form-control" placeholder="flaticon-art" :readonly="showMode==true ? true : false">
                                                <HasError :form="form" field="icon_class" />
                                            </div>

                                            <div v-if="showMode==false" class="form-group">
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

                                            <div class="form-group my-2 col-xl-6">
                                                <label>Attachment (PDF Only)</label>
<!--                                                <input type="file" name="resource_attachment" class="form-control" accept=".xls,.xlsx, application/*" id="document-input" @change="onNewsFeedDocumentChange" :readonly="showMode==true ? true : false">-->
                                                <input :disabled="disabled" type="file" class="form-control news-feed-file-input" name="resource_attachment" accept=".pdf,.pptx, application/*" id="document-input" @change="onNewsFeedDocumentChange">
                                                <!-- Display error message if file type is invalid -->
                                                <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
<!--                                                <HasError :form="form" field="resource_attachment" />-->
                                            </div>

                                            <div class="form-group my-2 col-xl-6">
                                                <label>Status</label>
                                                <select v-if="showMode==false" name="status" id="" class="form-control" v-model="form.status">
                                                    <option value="">Select One</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" placeholder="Approval" :readonly="showMode==true ? true : false">
                                                <HasError :form="form" field="status" />
                                            </div>
                                        </div>

                                        <!-- document preview start -->
                                        <div v-if="newsFeedDocumentPreview" class="form-group text-center border rounded">
                                            <div class="d-flex">
                                                <button type="button" class="btn btn-dark ml-auto mb-auto rounded-circle" style="position: absolute; z-index: 1;right: 17px;" @click="documentCancel">
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>

                                            <table class="table mb-0">
                                                <tbody v-if="newsFeedDocumentPreview">
                                                <tr>
                                                    <embed :src="newsFeedDocumentPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                                                </tr>
                                                </tbody>
                                            </table>
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
        name: 'CCCResourcesTable',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "title",
                perPage: 10,
                resources: [],
                pagination: [],
                links: [],
                newsFeedDocumentPreview: '',
                errorMessage: '',

                subCategories: [],

                form: new Form({
                    id: "",
                    title: "",
                    description: "",
                    icon_class: "",
                    resource_attachment:'',
                    status: '',
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
                let linkUrl = url ? url :  `${this.backendUrl}resource`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        console.log(response)
                        this.resources = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            onNewsFeedDocumentChange(e) {
                let file = e.target.files[0];

                //check the file extention with error message
                const allowedExtensions = ['pdf', 'pptx'];
                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    this.errorMessage = 'The file must be a PDF or PPTX file.';
                    // Clear the file input
                    this.form.resource_attachment = '';
                } else {
                    this.errorMessage = '';

                    let reader = new FileReader();
                    reader.onloadend = (e) => {
                        this.newsFeedDocumentPreview = reader.result;
                        this.form.resource_attachment = reader.result;
                    }
                    reader.readAsDataURL(file);

                    if (file) {
                        this.disabled = true;
                    }
                }

            },

            documentCancel() {
                $('#document-input').val("");
                this.newsFeedDocumentPreview = '';
                this.disabled = false;
            },

            create() {
                this.editMode = false
                this.showMode = false
                this.form.reset()
                this.form.clear()
                $("#exampleModal").modal("show");
            },

            show(id) {
                this.showMode = true
                this.form.reset()
                this.form.clear()
                this.form.fill(id)
                $("#exampleModal").modal("show");
            },

            edit(id) {
                this.editMode = true
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.form.fill(id)
                this.newsFeedDocumentPreview = id.resource_attachment
                $("#exampleModal").modal("show");
            },

            onImageChange(e){
                this.form.image = e.target.files[0];
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}resource`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Resources Added" });
                            this.newsFeedDocumentPreview = ''
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
                this.form.put(`${this.backendUrl}resource/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Resources Updated" });
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
                        axios.delete(`${this.backendUrl}resource/`+id, )
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