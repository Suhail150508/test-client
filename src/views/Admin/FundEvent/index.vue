<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of Fund-Events</h4>
                        <span>
                            This is an Fund-Event related information about Alumni and Student
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Fund-Event</button>
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
                            <th style="width: 40%">Title</th>
                            <th style="width: 15%">Amount</th>
                            <th style="width: 15%">Status</th>
                            <th style="width: 25%">Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of fundEvents" class="text-center align-middle">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.status }}</td>
                            <td>
                                <button type="button" @click="show(item)" class="btn btn-info btn-sm mlr-5">
                                    <i class="fas fa-eye"></i>
                                </button>

                                <button type="button" @click="edit(item)" class="btn btn-primary btn-sm mlr-5">
                                    <i class="fas fa-edit"></i>
                                </button>

                                <button type="button" @click="destroy(item.id)" class="btn btn-danger btn-sm mlr-5">
                                    <i class="fas fa-trash-alt"></i>
                                </button>

                                <router-link :to="{ name: 'app.fund_payment_details',query:{fundEventId: item.id} }" class="btn btn-sm btn-success mlr-5" title="Payment Details">
                                    <i class="fas fa-money-check"></i>
                                </router-link>
                            </td>
                        </tr>

                        <tr v-show="!fundEvents.length">
                            <td colspan="6">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="fundEvents.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="fundEvents.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">Fund-Event</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-8">
                                        <div class="form-group my-2">
                                            <label>Title</label>
                                            <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="title" />
                                        </div>

                                        <div v-if="showMode==false" class="form-group my-2">
                                            <label>Description</label>
                                            <Editor
                                                    name="description"
                                                    v-model="form.description"
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
<!--                                            <textarea v-model="form.description" rows="3" cols="50" name="description" :readonly="showMode==true ? true : false" class="form-control" placeholder="Enter description here..."></textarea>-->
                                            <HasError :form="form" field="description" />
                                        </div>

                                        <div v-if="showMode==true" class="form-group my-2" >
                                            <label>Description</label>
                                            <p style="height: 150px;overflow:auto;" v-html="form.description" class="form-control border" readonly></p>
                                        </div>

                                    </div>
                                    <div class="col-xl-4">

                                        <div class="form-group my-2">
                                            <label>Fund Amount</label>
                                            <input v-model="form.amount" type="number" name="amount" class="form-control" placeholder="Amount Taka" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="amount" />
                                        </div>

                                        <div class="form-group my-2">
                                            <label>Date</label>
                                            <input v-model="form.date" type="date" name="date" class="form-control" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="date" />
                                        </div>

                                        <div class="form-group my-2">
                                            <label>Time</label>
                                            <input v-model="form.time" type="time" name="time" class="form-control" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="time" />
                                        </div>

                                        <div class="form-group my-2">
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
    import Cookies from 'js-cookie'
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";
    import { useHead } from '@vueuse/head';

    export default {
        name: 'FundEvent',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                auth_id: Cookies.get('authIdCookie'),
                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "title",
                perPage: 10,
                fundEvents: [],
                categories: [],
                subCategories: [],
                pagination: [],
                links: [],

                form: new Form({
                    id: "",
                    title: "",
                    description: "",
                    amount: "",
                    time: "",
                    date: "",
                    status: "",
                    created_by: Cookies.get('authIdCookie'),
                }),

            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            useHead({title: 'Fund Events | EWU'});
            this.getData();
        },

        methods: {
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}fund-event`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.fundEvents = response.data.data;
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

            onImageChange(e){
                this.form.image = e.target.files[0];
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}fund-event`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            axios.post(`${this.backendUrl}create-new-fund-event-notification`, {
                                redirect_url: 'fund-event',
                                amount: this.form.amount,
                                sender_id: this.auth_id
                            })

                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Fund-Event Added" });
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
                this.form.put(`${this.backendUrl}fund-event/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Fund-Event Updated" });
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
                        axios.delete(`${this.backendUrl}fund-event/`+id, )
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