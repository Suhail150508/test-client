<template>
  <div id="product">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List Of Job Vacancies</h4>
            <span>
              This is an Job Vacancy related information
          
            </span>
          </div>
          <div class="col-md-4">

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
                  <select
                    @change="getData(null)"
                    v-model="perPage"
                    class="form-control form-control-sm"
                  >
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
                  <select
                    v-model="fieldName"
                    id="fields"
                    class="form-control form-control-sm"
                  >
                    <option value="company_name">Company name</option>
                    <option value="company_address">Company_address</option>
                    <option value="industry_type">Industry_type</option>
                    <option value="employment_status">Employment_status</option>
                    <option value="job_level">Job_level</option>
                    <option value="gender">Gender</option>
                    <option value="job_title">Job Title</option>  
                  </select>
                </div>

                <div class="col-md-7">
                  <input
                    v-model="keyword"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Keyword"
                  />
                </div>
              </div>
            </div>
          </div>
            <div class="table-rep-plugin">
            <div class="table-responsive mb-0" data-pattern="priority-columns">
                <table id="tech-employeers-1" class="table table-bordered align-middle nowrap ">
            <thead>
              <tr class="table-secondary">
                
                <th scope="col">Company Name</th>
                <th scope="col">industry_type</th>
                <th scope="col">contact_number</th>
                <th scope="col"> Email</th>
                <th scope="col"> Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in employeers">
                    
                  <th >{{ item.company_name }}</th>
                  <th >{{ item.industry_type }}</th>
                  <th >{{ item.contact_number }}</th>
                  <th >{{ item.email }}</th>
                  <td>

                    <p v-if="item.status == 'Active'">
                        <span class="badge bg-success">Approved</span>
                    </p>
                    <p v-else>
                        <span class="badge bg-danger">Unapproved</span>
                    </p>

                  </td>
                  <td class="">
                      <ul class="list-unstyled hstack gap-1 mb-0">                                       
                      <!-- <li data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                          <router-link :to="{ path: '/dashboard-editjob', query: { jobId: item.id } }" class="btn btn-sm btn-info">
                                  <i class="mdi mdi-pencil-outline"></i>
                          </router-link>
                      </li> -->
                      <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                  
                          <!-- <router-link :to="{ name: '/dashboard-viewjob', query: { jobId: item.id } }" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-eye"></i>
                          </router-link> -->
                      </li>
                      <li v-if="item.status == 'Active'"  data-bs-toggle="tooltip" data-bs-placement="top" title="UnApprove">
                          <button @click="approvedStatus(item.id)" type="button" class="btn btn-sm btn-danger"> <i class="fa-solid fa-thumbs-down"></i></button>
                      </li>
                
                      <li v-else data-bs-toggle="tooltip" data-bs-placement="top" title="Approve">
                          <button @click="approvedStatus(item.id)" type="button" class="btn btn-sm btn-info"> <i class="fa-solid fa-thumbs-up"></i></button>
                      </li>

                      <!-- <li data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <button @click="destroy(item.id)" type="button" class="btn btn-sm btn-danger"> <i class="mdi mdi-delete-outline"></i></button>
                      </li> -->
                  </ul>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>


          <div v-if="employeers.length" class="d-flex">
            <div
              class="col-md-4 pl-0"
              style="margin: auto"
              v-if="employeers.length"
            >
              Showing {{ pagination.from }} to {{ pagination.to }} from
              {{ pagination.total }} entiries
            </div>

            <PaginationComponent :links="links" @get-data="getData" />
          </div>
        </div>
      </div>
      <!-- Create and Edit Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Notice-Event</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                @submit.prevent="editMode ? update() : store()"
                @keydown="form.onKeydown($event)"
              >
                <div v-if="form.progress" class="text-center">
                  Progress: {{ form.progress.percentage }}%
                </div>

                <AlertError
                  :form="form"
                  message="There were some problems with your input."
                />

                <div class="modal-body">
                  <div class="form-group">
                    <label>Title</label>
                    <input
                      v-model="form.title"
                      type="text"
                      name="title"
                      class="form-control"
                      placeholder="Title"
                      :readonly="showMode == true ? true : false"
                    />
                    <HasError :form="form" field="title" />
                  </div>

                  <div class="form-group">
                    <label>Description</label>
                    <textarea
                      v-model="form.description"
                      rows="3"
                      cols="50"
                      name="description"
                      :readonly="showMode == true ? true : false"
                      class="form-control"
                      placeholder="Enter description here..."
                    ></textarea>
                    <HasError :form="form" field="description" />
                  </div>
                  <div class="form-group">
                    <label>Time</label>
                    <input
                      v-model="form.time"
                      type="time"
                      name="time"
                      class="form-control"
                      placeholder="time"
                      :readonly="showMode == true ? true : false"
                    />
                    <HasError :form="form" field="time" />
                  </div>
                  <div class="form-group">
                    <label>Date</label>
                    <input
                      v-model="form.date"
                      type="date"
                      name="date"
                      class="form-control"
                      placeholder="date"
                      :readonly="showMode == true ? true : false"
                    />
                    <HasError :form="form" field="date" />
                  </div>

                  <div class="form-group">
                    <label>Status</label>
                    <select v-if="showMode==false" name="status"  class="form-control" v-model="form.status">
                      <option value="">Select One</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" placeholder="Approval" :readonly="showMode==true ? true : false">
                    <HasError :form="form" field="status" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    v-if="showMode == false"
                    :disabled="form.busy"
                    type="submit"
                    class="btn btn-primary"
                  >
                    {{ editMode ? "Update" : "Create" }}
                  </button>
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
  import axios from "axios";
  import Form from "vform";
  import Cookies from 'js-cookie'
  import {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
  } from "vform/src/components/bootstrap5";
  import PaginationComponent from "../../../components/PaginationComponent.vue";
  
  export default {
    name: "CCCNewsTable",
    components: {
      PaginationComponent,
      Button,
      HasError,
      AlertError,
      AlertErrors,
      AlertSuccess,
    },
  
    data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,

      editMode: false,
      showMode: false,
      employeers: [],
      keyword: "",
      fieldName: "job_title",
      jobcategories: [],
      jobsubcategories: [],
      pagination: [],
      links: [],
      perPage: 10,
  
      form: new Form({
        id: "",
        title: "",
        description: "",
        time: "",
        date: "",
      }),
     
    };
  },
  
  watch: {
    keyword: function () {
      this.getData();
    },
  },
  
  mounted() {
    console.log("Component mounted.");
    this.getData();
  },
  
  methods: {
    getData(url) {
  
      this.$Progress.start();
      let linkUrl = url ? url : `${this.backendUrl}job_employeer`;
      axios
        .get(linkUrl, {
          params: {
            per_page: this.perPage,
            field_name: this.fieldName,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          // console.log(response.data.data)
          // console.log('hello from response kkkkkkkkkkkkkkkkkkkhhhh')
          this.employeers = response.data.data;
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
      this.editMode = false;
      this.showMode = false;
    //   this.form.reset();
    //   this.form.clear();
      // $("#image").val('')
      $("#exampleModal").modal("show");
    },
  
    show(id) {
      this.showMode = true;
    //   this.form.reset();
    //   this.form.clear();
    //   this.form.fill(id);
      $("#exampleModal").modal("show");
    },
  
    edit(id) {
      this.editMode = true;
      this.showMode = false;
    //   this.form.reset();
    //   this.form.clear();
    //   this.form.fill(id);
      $("#exampleModal").modal("show");
    },
  
    // onImageChange(e) {
    //   this.form.image = e.target.files[0];
    // },
  
    store() {
      this.$Progress.start();
      this.form.busy = true;
      this.form
        .post(`${this.backendUrl}job-post`)
        .then((response) => {
          this.getData();
          console.log("store a ayse");
          console.log(response);
  
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({
              type: "success",
              title: "Success",
              text: "employeers Added",
            });
          } else {
            this.$Progress.fail();
            this.$notify({
              type: "error",
              title: "Error",
              text: "Something went wrong try again later",
            });
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
    },
  
    update() {
      // this.$Progress.start();
      // this.form.busy = true;
      this.form
        .post(`${this.backendUrl}job-post/` + this.form.id)
        .then((response) => {
          console.log("update");
          console.log(response);
  
          this.getData();
  
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({
              type: "success",
              title: "Success",
              text: "employeers Updated",
            });
          } else {
            this.$Progress.fail();
            this.$notify({
              type: "error",
              title: "Error",
              text: "Something went wrong try again later",
            });
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
    },
  
    destroy(id) {
      // this.$swal
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`${this.backendUrl}job-post/` + id)
              .then((response) => {
                this.$swal.fire("Deleted!", response.data.message, "success");
                this.getData();
              });
          }
        });
    },
  
    approvedStatus(id) {
      // this.$swal
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to update Approve status!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .get(`${this.backendUrl}employeer/approval/` + id)
              .then((response) => {
                console.log(response.data)
                console.log('approval response')
                this.$swal.fire("Updated!", response.data.message, "success");
                this.getData();
              });
          }
        });
    },
  },
  };
  </script>
  