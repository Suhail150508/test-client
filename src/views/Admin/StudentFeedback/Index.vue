<template>
    <div id="student_feedback">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List of Student Feedback</h4>
                        <span>
                        This is a Student Feedback related information
                        </span>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-2" style="margin: auto 0">
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

                                <div class="col-md-3" style="margin: auto 0">
                                    <span>entries</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-2" style="margin: auto">
                                    <strong>Search By :</strong>
                                </div>

                                <div class="col-md-3">
                                    <select v-model="fieldName" id="fields" class="form-select form-select-sm form-control">
                                        <option value="name">Name</option>
                                        <option value="student_id">Student Id</option>
                                        <option value="degree_program">Degree Program</option>
                                        <option value="level_of_study">Level Of Study</option>
                                        <option value="email_address">Email Address</option>
                                        <option value="phone_number">Phone Number</option>
                                    </select>
                                </div>

                                <div class="col-md-7">
                                    <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered dt-responsive nowrap w-100">
                        <thead>
                            <tr class="text-center align-middle">
                                <th style="width: 5%;">S.No</th>
                                <th>Name</th>
                                <th>Student Id</th>
                                <th>Degree Program</th>
                                <th>Level Of Study</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(studentFeedback, index) of studentFeedbacks" class="text-center align-middle">
                                <td>{{ index + 1 }}</td>
                                <td>{{ studentFeedback.name }}</td>
                                <td>{{ studentFeedback.student_id }}</td>
                                <td>{{ studentFeedback.degree_program }}</td>
                                <td>{{ studentFeedback.level_of_study }}</td>
                                <td>{{ studentFeedback.email_address }}</td>
                                <td>{{ studentFeedback.phone_number }}</td>
                                <td>
                                    <button type="button" @click="show(studentFeedback)" class="btn btn-info btn-sm" style="margin-right: 5px;">
                                        <i class="fas fa-eye"></i>
                                    </button>

                                    <button type="button" @click="destroy(studentFeedback.id)" class="btn btn-danger btn-sm">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>

                            <tr v-show="!studentFeedbacks.length">
                                <td colspan="9">
                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                        No data available in table :(
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="studentFeedbacks.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto" v-if="studentFeedbacks.length">
                            Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total }} entiries
                        </div>

                        <PaginationComponent :links="links" @get-data="getData" />
                    </div>
                </div>
            </div>

            <!-- Show Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Student Feedback</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <table class="table table-bordered dt-responsive nowrap w-100">
                                <thead>
                                    <tr class="text-center align-middle">
                                        <th>Name</th>
                                        <td>{{ singleFeedback.name }}</td>

                                        <th>Student Id</th>
                                        <td>{{ singleFeedback.student_id }}</td>
                                    </tr>

                                    <tr class="text-center align-middle">
                                        <th>Degree Program</th>
                                        <td>{{ singleFeedback.degree_program }}</td>

                                        <th>Level Of Study</th>
                                        <td>{{ singleFeedback.level_of_study }}</td>
                                    </tr>

                                    <tr class="text-center align-middle">
                                        <th>Email Address</th>
                                        <td>{{ singleFeedback.email_address }}</td>

                                        <th>Phone Number</th>
                                        <td>{{ singleFeedback.phone_number }}</td>
                                    </tr>

                                    <tr class="text-center align-middle">
                                        <th>How do you feel about the website?</th>
                                        <td colspan="3">{{ singleFeedback.question_one }}</td>
                                    </tr>

                                    <tr class="text-center align-middle">
                                        <th>Is these any other features you would like to see here?</th>
                                        <td colspan="3">{{ singleFeedback.question_two }}</td>
                                    </tr>

                                    <tr class="text-center align-middle">
                                        <th>Do you need any more info?</th>
                                        <td colspan="3">{{ singleFeedback.question_three }}</td>
                                    </tr>
                                </thead>
                            </table>
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
import axios from "axios";
import PaginationComponent from "../../../components/PaginationComponent.vue";

export default {
    name: "StudentFeedback",

    components: {
        PaginationComponent
    },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            
            keyword: "",
            fieldName: "name",
            perPage: 10,
            pagination: [],
            links: [],

            singleFeedback: '',
            studentFeedbacks: [],
        };
    },

    watch: {
        keyword: function () {
            this.getData();
        },
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData(url) {
            this.$Progress.start();
            let linkUrl = url ? url : `${this.backendUrl}student-feedback`;
            axios.get(linkUrl, {
                params: {
                    per_page: this.perPage,
                    field_name: this.fieldName,
                    keyword: this.keyword,
                },
            })
            .then((response) => {
                this.studentFeedbacks = response.data.data;
                this.pagination = response.data.meta;
                this.links = response.data.meta.links;
                this.$Progress.finish();
            })
            .catch((e) => {
                this.$Progress.fail();
            });
        },

        show(item) {
            this.singleFeedback = item;
            $("#exampleModal").modal("show");
        },

        destroy(id){
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
                    axios.delete(`${this.backendUrl}student-feedback/`+id)
                    .then(response => {
                        this.$swal.fire( 'Deleted!', response.data.message,'success')
                        this.getData()
                    });
                }
            })
        }
    },
};
</script>