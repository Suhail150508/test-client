<template>
  <div id="product">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List of Student Welfare</h4>
            <span>
              This is a Student Welfare related information
            </span>
          </div>
          <div class="col-md-4">
            <button type="button" @click="create" class="btn btn-sm btn-success float-end">
              <i class="fas fa-plus"></i> Add Student Welfare
            </button>
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
                    class="form-select form-select-sm form-control"
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
                    class="form-select form-select-sm form-control"
                  >
                    <option value="name">Name</option>
                    <option value="contact_no">Contact No</option>
                  </select>
                </div>

                <div class="col-md-7">
                  <input
                    v-model="keyword"
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>

          <table class="table table-bordered dt-responsive nowrap w-100">
            <thead>
              <tr class="text-center align-middle">
                <th style="width: 5%;">S.No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Contact Hours </th>
                <th>Contact No</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(studentWelfare, index) of studentWelfares" class="text-center align-middle">
                <td>{{ index+1 }}</td>
                <td>
                  <img width="100" height="40" :src="studentWelfare.image" :alt="studentWelfare.id">
                </td>
                <td>{{ studentWelfare.name }}</td>
                <td>{{ studentWelfare.designation.name }}</td>
                <td class="text-uppercase">{{ studentWelfare.contact_hours_from }} - {{ studentWelfare.contact_hours_to }}</td>
                <td>{{ studentWelfare.contact_no }}</td>
                <td>{{ studentWelfare.status }}</td>
                <td>
                  <button
                    type="button"
                    @click="show(studentWelfare)"
                    class="btn btn-info btn-sm"
                  >
                    <i class="fas fa-eye"></i>
                  </button>

                  <button
                    type="button"
                    @click="edit(studentWelfare)"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fas fa-edit"></i>
                  </button>

                  <button
                    type="button"
                    @click="destroy(studentWelfare.id)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>

              <tr v-show="!studentWelfares.length">
                <td colspan="9">
                  <div
                    class="alert alert-danger text-danger text-center"
                    role="alert"
                  >
                    No data available in table :(
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="studentWelfares.length" class="d-flex">
            <div
              class="col-md-4 pl-0"
              style="margin: auto"
              v-if="studentWelfares.length"
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
              <h5 class="modal-title" id="exampleModalLabel">Student Welfare</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                <div v-if="form.progress" class="text-center">
                  Progress: {{ form.progress.percentage }}%
                </div>

                <AlertError :form="form" message="There were some problems with your input."/>

                <div class="modal-body">
                  <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.name" type="text" name="name" class="form-control" placeholder="name" :readonly="showMode==true ? true : false"/>
                    <HasError :form="form" field="name" />
                  </div>

                  <div class="form-group my-2">
                    <label>Designation</label>
                    <select v-if="showMode==false" name="designation_id" v-model="form.designation_id" class="form-control">
                      <option value="">Select One</option>
                      <option v-for="designation in designations" :value="designation.id" v-html="designation.name"></option>
                    </select>
                    <input v-if="showMode==true" v-model="form.designation.name" type="text" name="designation_id" class="form-control" readonly/>
                    <HasError :form="form" field="designation_id" />
                  </div>

                  <div class="row my-2">
                    <div class="form-group col-md-6">
                      <label>Contact Hours From</label>
                      <input  v-model="form.contact_hours_from" type="text" name="contact_hours_from" class="form-control" placeholder="Ex: 02:30 AM" :readonly="showMode==true ? true : false"/>
                      <HasError :form="form" field="contact_hours_from" />
                    </div>

                    <div class="form-group col-md-6">
                      <label>Contact Hours To</label>
                      <input v-model="form.contact_hours_to" type="text" name="contact_hours_to" class="form-control" placeholder="Ex: 03:30 AM" :readonly="showMode==true ? true : false"/>
                      <HasError :form="form" field="contact_hours_to" />
                    </div>
                  </div>


                  <div class="form-group">
                    <label>Contact No</label>
                    <input v-model="form.contact_no" type="text" name="contact_no" class="form-control" placeholder="Contact No" :readonly="showMode==true ? true : false"/>
                    <HasError :form="form" field="contact_no" />
                  </div>

                  <div v-show="showMode==false" class="form-group my-2">
                    <div class="mb-3">
                      <h3 class="card-title">Image</h3>
                      <input type="file" name="image" class="form-control form-control-file border" @change="onImageChange" />
                      <HasError :form="form" field="image" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="mb-3">
                      <img class="mt-1" :src="imagePreview" style="width: 80px;" alt="" />
                    </div>
                  </div>

                  <div class="form-group my-2">
                    <label>Status</label>
                    <select v-if="showMode==false" name="status" id="" class="form-control" v-model="form.status">
                      <option value="">Select One</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <input v-if="showMode==true" v-model="form.status" type="text" class="form-control" readonly>
                    <HasError :form="form" field="status" />
                  </div>

                </div>
                <div class="modal-footer">
                  <button v-if="showMode==false" :disabled="form.busy" type="submit" class="btn btn-primary">
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
import {
  Button,
  HasError,
  AlertError,
  AlertErrors,
  AlertSuccess,
} from "vform/src/components/bootstrap5";
import PaginationComponent from "../../../components/PaginationComponent.vue";

export default {
  name: "studentwelfaresTable",
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
      keyword: "",
      fieldName: "name",
      perPage: 10,
      studentWelfares: [],
      designations: [],
      pagination: [],
      links: [],
      imagePreview: "",

      form: new Form({
        id: "",
        name: "",
        designation: [],
        designation_id: "",
        contact_hours_from: "",
        contact_hours_to: "",
        contact_no: "",
        image: "",
        status: "",
      }),
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
      let linkUrl = url ? url : `${this.backendUrl}student-welfare`;
      axios
        .get(linkUrl, {
          params: {
            per_page: this.perPage,
            field_name: this.fieldName,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          this.studentWelfares = response.data.data;
          this.designations = response.data.designations;
          this.pagination = response.data.meta;
          this.links = response.data.meta.links;
          this.$Progress.finish();
        })
        .catch((e) => {
          this.$Progress.fail();
        });
    },

    create() {
      this.editMode = false
      this.showMode = false
      this.form.reset()
      this.form.clear()
      this.imagePreview = "";
      $("#exampleModal").modal("show");
    },

    show(item) {
      this.showMode = true
      this.form.reset()
      this.form.clear()
      this.form.fill(item)
      this.imagePreview = item.image
      $("#exampleModal").modal("show");
    },

    edit(item) {
      this.editMode = true
      this.showMode = false
      this.imagePreview = item.image
      this.form.reset()
      this.form.clear()
      this.form.fill(item)
      this.form.image = ""
      $("#exampleModal").modal("show");
    },


    onImageChange(e){
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (file) => {
        this.imagePreview = reader.result;
        this.form.image = reader.result;
      }
      reader.readAsDataURL(file);
    },

    store() {
      this.$Progress.start();
      this.form.busy = true;
      this.form
        .post(`${this.backendUrl}student-welfare`)
        .then((response) => {
          this.getData();
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({
              type: "success",
              title: "Success",
              text: "Student-Welfare Added",
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
        });
    },


    update() {
      this.$Progress.start();
      this.form.busy = true;
      this.form
        .put(`${this.backendUrl}student-welfare/` + this.form.id)
        .then((response) => {
          this.getData();
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({
              type: "success",
              title: "Success",
              text: "Student-Welfare Updated",
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
        });
    },


    // this.$swal
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
        axios.delete(`${this.backendUrl}student-welfare/`+id, )
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
  },
};
</script>

<style></style>
