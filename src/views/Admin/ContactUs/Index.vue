<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of Contact-Us</h4>
                        <span>
                            This is an Contact-Us related information.
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button v-show="!contacts.length" type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Contact-Us</button>
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
                                        <option value="address">Address</option>
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
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Room</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(contact, index) of contacts">
                            <td>{{ index+1 }}</td>
                            <td>{{ contact.address }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.phone }}</td>
                            <td>{{ contact.room_no }}</td>
                            <td v-html="contact.description"></td>
                            <td>{{ contact.status }}</td>
                            <td>
                                <button type="button" @click="show(contact)" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>

                                <button type="button" @click="edit(contact)" class="btn btn-primary btn-sm">
                                    <i class="fas fa-edit"></i>
                                </button>

                                <button type="button" @click="destroy(contact.id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-show="!contacts.length">
                            <td colspan="6">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="contacts.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="contacts.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">Contact-Us</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-12">
                                        <div class="card">
                                            <div class="card-header text-light bg-info fw-medium">
                                                <i class="fas fa-mobile-alt"></i> Contact Information</div>
                                            <div class="card-body">
                                                <div data-repeater-list="group-a">
                                                    <div data-repeater-item class="row">
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="form.address" name="address" type="text" class="form-control"  placeholder="Enter Address" :readonly="showMode==true ? true : false">
                                                            <label> Address</label>
                                                            <HasError :form="form" field="address" />
                                                        </div>
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="form.phone" name="phone" type="text" class="form-control"  placeholder="Enter Phone" :readonly="showMode==true ? true : false">
                                                            <label> Phone</label>
                                                            <HasError :form="form" field="phone" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-floating mb-3">
                                                                <input v-model="form.email" name="email" type="email" class="form-control" placeholder="Enter Email address" :readonly="showMode==true ? true : false">
                                                                <label>Email address</label>
                                                                <HasError :form="form" field="email" />
                                                            </div>
                                                        </div>
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="form.room_no" name="room_no" type="text" class="form-control"  placeholder="Enter Name" :readonly="showMode==true ? true : false">
                                                            <label> Room No.</label>
                                                            <HasError :form="form" field="room_no" />
                                                        </div>
                                                        <div class="col-md-6 mb-3">
                                                            <label>Status</label>
                                                            <select v-if="showMode==false" v-model="form.status" class="form-control" name="status">
                                                                <option value="">Select One</option>
                                                                <option value="Active">Active</option>
                                                                <option value="Inactive">Inactive</option>
                                                            </select>
                                                            <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                            <HasError :form="form" field="status" />
                                                        </div>

                                                        <div v-if="showMode==false" class="form-floating col-md-12 mb-3">
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
                                                            <label> Contact Description</label>
                                                            <HasError :form="form" field="description" />
                                                        </div>

                                                        <div v-if="showMode==true" class="form-floating col-md-12 mb-3">
                                                            <div class="form-group">
                                                                <label>Description</label>
                                                                <p v-html="form.description" rows="10" class="form-control border" readonly></p>
                                                                <HasError :form="form" field="description" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                            </div>
                                        </div>
                                        <!-- end card -->
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
        name: 'CCCContactUs',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor  },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,

                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "address",
                perPage: 10,
                contacts: [],
                categories: [],
                subCategories: [],
                pagination: [],
                links: [],

                form: new Form({
                    id: "",
                    address: "",
                    phone: "",
                    email: "",
                    room_no: "",
                    description: "",
                    status: "",
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
                let linkUrl = url ? url :  `${this.backendUrl}contactUs`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.contacts = response.data.data;
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
                // $("#image").val('')
                $("#exampleModal").modal("show");
            },

            show(item) {
                this.showMode = true
                this.editMode = false
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                $("#exampleModal").modal("show");
            },

            edit(item) {
                this.editMode = true
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.form.fill(item)
                $("#exampleModal").modal("show");
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}contactUs`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Contact-Us Added" });
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
                this.form.put(`${this.backendUrl}contactUs/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Contact-Us Updated Successfully" });
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
                        axios.delete(`${this.backendUrl}contactUs/`+id, )
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