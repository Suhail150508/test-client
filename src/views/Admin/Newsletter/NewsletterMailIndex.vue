<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List of Newsletter mail Lists</h4>
                        <span>
                            This is a Newsletter mail List related information
                        </span>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{name: 'app.newsletter_mail'}" type="button" class="btn btn-sm btn-success float-end">
                            <i class="fas fa-plus"></i> Send Newsletter Mail
                        </router-link>

                        <router-link :to="{name: 'app.all_mail_list'}" type="button" class="btn btn-sm btn-primary float-end">
                            <i class="fas fa-plus"></i> See All Mail Lists
                        </router-link>
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
                                        <option value="mail_subject">Mail Subject</option>
                                        <option value="type">Type</option>
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
                            <th style="width: 65%">Mail Subject</th>
                            <th style="width: 15%">Type</th>
                            <th style="width: 15%">Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of mailList" class="text-center align-middle">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.mail_subject }}</td>
                            <td>{{ item.type }}</td>
                            <td>
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
                fieldName: "mail_subject",
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
                let linkUrl = url ? url :  `${this.backendUrl}newsletter_mail`;
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

            },

        }
    }
</script>