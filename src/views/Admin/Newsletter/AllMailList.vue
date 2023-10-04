<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">All Mail List</h4>
                        <span>
                            This is a all mail List related information
                        </span>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{name: 'app.newsletter_mail_list'}" type="button" class="btn btn-sm btn-success float-end">
                            <i class="fas fa-plus"></i>See Newsletter Mail List
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
                                        <option value="email">Email</option>
                                        <option value="status">Status</option>
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
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of lists">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.status }}</td>
                        </tr>

                        <tr v-show="!lists.length">
                            <td colspan="6">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="lists.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="lists.length">
                            Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                        </div>

                        <PaginationComponent
                                :links = 'links'
                                @get-data="getData"
                        />
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
    import { useHead } from '@vueuse/head';

    export default {
        name: 'MailListPage',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                keyword: "",
                fieldName: "email",
                perPage: 10,
                lists: [],
                pagination: [],
                links: [],

                form: new Form({
                    id: "",
                    email: "",
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
            useHead({title: 'Newsletter | EWU'});
            this.getData();
        },

        methods: {
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}all-mail-list`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.lists = response.data.data;
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

<style>

</style>