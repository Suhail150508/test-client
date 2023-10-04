<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List of Create Newsletter mail Lists</h4>
                        <span>
                            This is an Create Newsletter mail List related information
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Create Newsletter mail List</button>
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
                                <th style="width: 65%">Title</th>
                                <th style="width: 15%">Status</th>
                                <th style="width: 15%">Actions</th>
                            </tr>
                        </thead>


                        <tbody>
                            <tr v-for="(item, index) of mailList" class="text-center align-middle">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.title }}</td>
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

                            <tr v-show="!mailList.length">
                                <td colspan="6">
                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                        No data available in table :(
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="mailList.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="mailList.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">Create Newsletter mail List</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-8">

                                        <div class="form-group my-2">
                                            <label>Title</label>
                                            <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="title" />
                                        </div>

                                        <div class="form-group my-2">
                                            <label>Recipients</label>
                                            <Multiselect v-model="form.existing_recipients" mode="tags" placeholder="Select Recipient's" :close-on-select="false" :searchable="true" :create-option="false" :options="systemUsers"/>
                                            <HasError :form="form" field="existing_recipients" />
                                        </div>

                                    </div>
                                    <div class="col-xl-4">
                                        <div class="form-group my-2">
                                            <label>Import Other Mail's(xls file)</label>
                                            <input  type="file" name="others_mail_file" class="form-control" @change="onMailListFileChange">
                                            <HasError :form="form" field="others_mail_file" />
                                        </div>
                                        <!--<div class="form-group my-2">
                                            <iframe :src="mailListFilePreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
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
    import Multiselect from "@vueform/multiselect";
    import "@vueform/multiselect/themes/default.css";
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";
    import { useHead } from '@vueuse/head';

    export default {
        name: 'CreateList',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Multiselect },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "title",
                perPage: 10,
                skills: [],
                categories: [],
                subCategories: [],
                pagination: [],
                links: [],
                systemUsers: [],
                mailList: [],
                form: new Form({
                    id: "",
                    title: "",
                    existing_recipients: [],
                    others_mail_file: [],
                }),

            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            useHead({title: 'Newsletter | EWU'});
            this.getData();
        },

        methods: {
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}create-mail-list`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.mailList = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });

                axios.get(`${this.backendUrl}system/users`)
                    .then((response) => {
                        let data =  response.data.map((item) => {
                            return { value: item.id, label: item.name+' - ('+item.email+')' }
                        })
                        this.systemUsers = data;
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
                $("#exampleModal").modal("show");
            },

            onMailListFileChange(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (e) => {
                    // this.mailListFilePreview = reader.result;
                    this.form.others_mail_file = reader.result;
                }
                reader.readAsDataURL(file);

                if (file) {
                    this.disabled = true;
                }
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}create-mail-list`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Create Newsletter mail List Added" });
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
                this.form.put(`${this.backendUrl}create-mail-list/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Create Newsletter mail List Updated" });
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
                        axios.delete(`${this.backendUrl}create-mail-list/`+id, )
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