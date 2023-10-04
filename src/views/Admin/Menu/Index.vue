<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List of Menus</h4>
                        <span>
                            This is an Menu related information
                        </span>
                    </div>
                    <div class="col-md-4">
                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Menu</button>
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
                                        <option value="name">Name</option>
                                        <option value="Status">Status</option>
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
                            <th>Name</th>
                            <th>Bangla name</th>
                            <th>Parent Menu</th>
                            <th>Route Name</th>
                            <th>Menu icon</th>
                            <th>Menu Order</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(menu, index) of menus">
                            <td>{{ index+1 }}</td>
                            <td>{{ menu.name }}</td>
                            <td>{{ menu.bn_name }}</td>
                            <td>{{ menu.parent ? menu.parent.name : "" }}</td>
                            <td>{{ menu.route_name }}</td>
                            <td>{{ menu.icon }}</td>
                            <td>{{ menu.order_by }}</td>
                            <td>{{ menu.status == 1 ? 'Active' : 'Inactive' }}</td>
                            <td>
                                <button type="button" @click="show(menu)" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>

                                <button type="button" @click="edit(menu)" class="btn btn-primary btn-sm" >
                                    <i class="fas fa-edit"></i>
                                </button>

                                <button type="button" @click="destroy(menu.id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-show="!menus.length">
                            <td colspan="8">
                                <div class="alert alert-danger text-danger text-center" menu="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="menus.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="menus.length">
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
                            <h5 class="modal-title" id="exampleModalLabel">Menu</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="row col-xl-12">
                                        <div class="form-group my-2 col-xl-4">
                                            <label>Name</label>
                                            <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Name" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="name" />
                                        </div>

                                        <div class="form-group my-2 col-xl-4">
                                            <label>Bangla Name</label>
                                            <input v-model="form.bn_name" type="text" name="bn_name" class="form-control" placeholder="Bangla Name" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="bn_name" />
                                        </div>

                                        <div class="form-group my-2 col-xl-4">
                                            <label>Parent Menu</label>
                                            <select v-if="showMode==false" name="parent_id" class="form-control" v-model="form.parent_id">
                                                <option value="">Select One</option>
                                                <option v-for="item in menus" :value="item.id">{{item.name}}</option>
                                            </select>
                                            <!--                                            <input v-model="form.parent_id" type="text" name="parent_id" class="form-control" placeholder="Parent Menu" :readonly="showMode==true ? true : false">-->
                                            <HasError :form="form" field="parent_id" />
                                        </div>

                                        <div class="form-group my-2 col-xl-4">
                                            <label>Menu Icon</label>
                                            <input v-model="form.icon" type="text" name="icon" class="form-control" placeholder="Menu Icon" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="icon" />
                                        </div>

                                        <div class="form-group my-2 col-xl-4">
                                            <label>Route Name</label>
                                            <input v-model="form.route_name" type="text" name="route_name" class="form-control" placeholder="Route Name" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="route_name" />
                                        </div>

                                        <div class="form-group my-2 col-xl-4">
                                            <label>Menu Order</label>
                                            <input v-model="form.order_by" type="text" name="order_by" class="form-control" placeholder="Menu Order By" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="order_by"/>
                                        </div>

                                        <div class="form-group my-2 col-xl-4">
                                            <label>Status</label>
                                            <select v-if="showMode==false" name="status" id="" class="form-control" v-model="form.status">
                                                <option value="">Select One</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                            <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" placeholder="Approval" :readonly="showMode==true ? true : false">
                                            <HasError :form="form" field="status" />
                                        </div>
                                    </div>
                                    <hr>

                                    <h5 class="d-inline-block">
                                        <strong>Menu Actions</strong>
                                    </h5>

                                    <div class="border border-secondary mb-4 p-3">
                                        <div class="row">
                                            <div class="col-sm-12 my-2 row center">
                                                <!--<h6 class="col-sm-3 checkboxes mlr-5" v-for="action in menu_actions">
                                                    <input type="checkbox" name="menu_action_ids[]" v-model="checkedItems" :value="action.id" class="checkboxes"/>
                                                    {{action.name}}
                                                </h6>-->
                                                <h6 class="col-sm-3 checkboxes mlr-5" v-for="action in menu_actions" :key="action.id">
                                                    <input type="checkbox" v-bind:id="'action-' + action.id" v-model="form.checkedItems" :value="action.id">
                                                    <label v-bind:for="'action-' + action.id">{{ action.name }}</label>
                                                </h6>

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
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";

    export default {
        name: 'CCCNewsTable',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,

                editMode: false,
                showMode: false,
                keyword: "",
                fieldName: "name",
                perPage: 10,
                menus: [],
                menu_actions: [],
                parentMenus: [],
                pagination: [],
                links: [],

                form: new Form({
                    id: "",
                    name: "",
                    bn_name: "",
                    parent_id: "",
                    icon: "",
                    route_name: "",
                    order_by: "",
                    status: "",
                    checkedItems: [],
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
                let linkUrl = url ? url :  `${this.backendUrl}menu`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.menus = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });

                //get menu actions
                axios.get(`${this.backendUrl}menu-action`)
                    .then((response) => {
                        this.menu_actions = response.data;
                    }).catch((e) => { this.$Progress.fail();});
            },

            create() {
                this.editMode = false
                this.showMode = false
                this.form.reset()
                this.form.clear()
                // $("#image").val('')
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
                this.form.post(`${this.backendUrl}menu`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Menu Added" });
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
                this.form.put(`${this.backendUrl}menu/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Menu Updated" });
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
                    text: "You will be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}menu/`+id, )
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