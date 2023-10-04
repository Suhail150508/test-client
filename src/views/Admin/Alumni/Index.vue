<template>
  <div id="alumni">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List Of Alumnis</h4>
            <span>
              This is an alumni related information
            </span>
          </div>
          <div class="col-md-4">
            <router-link :to="{ name: 'app.alumni_add' }" type="button" class="btn btn-sm btn-success float-end">
              <i class="fas fa-plus"></i>Add New
            </router-link>
          </div>
        </div>

        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-3">
              <div class="row">
                <div class="col-md-3" style="margin: auto 0">
                  <span>Show</span>
                </div>
                <div class="col-md-3">
                  <select @change="getData(null)" v-model="perPage" class="form-select">
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

            <div class="col-md-3">
              <div class="dropdown ml-4">
                <button v-if="checked.length > 0" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">
                  With Checked ({{ checked.length }})
                </button>
                <div class="dropdown-menu">
                  <!-- <a href="#" class="dropdown-item" type="button" @click.prevent="deleteRecords">
                    Delete
                  </a> -->
                  <a :href="url" class="dropdown-item" type="button">
                    Export (XLS)
                  </a>
                  <a href="#" class="dropdown-item" type="button" @click.prevent="exportPDF">
                    Export (pdf)
                  </a>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row">
                <div class="col-md-2" style="margin: auto">
                  <strong>Search By :</strong>
                </div>
                <div class="col-md-3">
                  <select v-model="fieldName" id="fields" class="form-select">
                    <option value="ewu_id_no">Student Id</option>
                    <option value="title">Title</option>
                    <option value="first_name">First Name</option>
                    <option value="middle_name">Middle Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="nid">NID</option>
                    <option value="dob">Date of barth</option>
                    <option value="gender">Gender</option>
                    <option value="blood_group">Blood Group</option>
                    <option value="about">About</option>
                    <option value="personal_email">Personal Email</option>
                    <option value="university_email">University Email</option>
                    <option value="company_email">Company Email</option>
                    <option value="personal_contact_number">Contact Number</option>
                    <option value="department_id">Department</option>
                    <option value="program">Program</option>
                    <option value="passing_year">Passing Year</option>
                    <option value="convocation_year">Convocation Year</option>
                    <option value="organization">Organization</option>
                    <option value="designation_department">Designation And Department</option>
                    <option value="doj">Date of Join</option>
                    <option value="country_id">Country</option>
                    <option value="district_id">District</option>
                    <option value="id">Skill</option>
                    <option value="status">Status</option>
                  </select>
                </div>
                <div class="col-md-7">
                  <input v-model="keyword" type="text" class="form-control" placeholder="Search" style="height:36px;" />
                </div>
              </div>
            </div>
          </div>

          <div class="mb-2" v-if="selectPage">
            <div v-if="selectAll">
              You are currently selecting all
              <strong>{{ checked.length }}</strong> items.
            </div>
            <div v-else>
              You have selected <strong>{{ checked.length }}</strong> items, Do you want to
              Select All <strong></strong>?
              <a @click.prevent="selectAllRecords" href="#" class="ml-2">Select All</a>
            </div>
          </div>

          <table class="table table-bordered dt-responsive nowrap w-100">
            <thead>
              <tr>
                <th class="text-center"><input type="checkbox" v-model="selectPage" /></th>
                <th class="text-center">S/N</th>
                <th class="text-center">EWU ID</th>
                <th class="text-center">Photo</th>
                <th class="text-center">Name</th>
                <th class="text-center">Email</th>
                <th class="text-center">Contact No</th>
                <th class="text-center">Department</th>
                <th class="text-center">Occupation</th>
                <th class="text-center">Is Feature</th>
                <th class="text-center">Status</th>
                <th class="text-center" style="width: 8%;">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(alumni, index) of alumnis">
                <td class="text-center"><input type="checkbox" :value="alumni.id" v-model="checked"/></td>

                <td class="text-center">{{ index + 1 }}</td>

                <td class="text-center">{{ alumni.ewu_id_no }}</td>

                <td class="text-center">
                  <!-- <div>
                    <img v-if="alumni.profile_image" class="rounded-circle border" style="width: 70px; height: 80px;" :src="alumni.profile_image" :alt="alumni.id">
                    <img v-else class="rounded-circle border" style="width: 70px; height: 80px;"  :src="$store.state.alumniImage" :alt="$store.state.alt">
                  </div> -->

                  <div class="passport-photo">
                    <img v-if="alumni.profile_image" class="border" :src="alumni.profile_image" :alt="alumni.id">
                    <img v-else class="border" :src="$store.state.alumniImage" :alt="$store.state.alt">
                  </div>
                </td>

                <td class="text-center">
                  {{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }}
                </td>

                <td>
                  <span><b>Personal:</b> {{ alumni.personal_email }}</span><br>
                  <span><b>University:</b> {{ alumni.university_email }}</span><br>
                  <span><b>Company:</b> {{ alumni.company_email }}</span>
                </td>

                <td class="text-center">{{ alumni.personal_contact_number }}</td>
                <td class="text-center">{{ alumni.department_name }}</td>

                <!-- <td class="text-center">
                  <template v-if="alumni.department">
                    {{ alumni.department.title }}
                  </template>
                </td> -->

                <!-- <td class="text-center">{{ alumni.designation_department }} at {{ alumni.organization }}</td> -->
                <td class="text-center">
                  <template v-if="alumni.designation_department && alumni.organization">
                    {{ alumni.designation_department }} at {{ alumni.organization }}
                  </template>

                  <template v-else-if="alumni.organization">
                    {{ alumni.organization }}
                  </template>

                  <template v-else-if="alumni.designation_department">
                    {{ alumni.designation_department }}
                  </template>
                </td>

                <td class="text-center">
                  <div class="form-check form-switch">
                    <input class="form-check-input form-switch form-switch-lg" type="checkbox" role="switch" :value='alumni.id' @change="changeFeatureAlumniStatus" :checked="alumni.is_feature">
                  </div>
                </td>

                <td class="text-center">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input form-switch form-switch-lg"
                      type="checkbox"
                      role="switch"
                      :value="alumni.id"
                      :checked="alumni.status === 'Active'"
                      @change="changeAlumniStatus"
                    />
                  </div>
                </td>

                <td class="text-center">
                  <router-link :to="{ name: 'app.alumni_show', query: { id: alumni.id } }" type="button" class="btn btn-info btn-sm"><i class="fas fa-eye"></i></router-link>

                   <router-link :to="{ name: 'app.alumni_edit', query: { id: alumni.id } }" type="button" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></router-link>

                  <!-- <button type="button" @click="destroy(alumni.id)" class="btn btn-danger btn-sm m-1">
                    <i class="fas fa-trash-alt"></i>
                  </button> -->

                  <button type="button" @click="ratingModalShow(alumni)" class="btn btn-success btn-sm">
                    <i class="fas fa-star"></i>
                  </button>
                </td>
              </tr>

              <tr v-show="!alumnis.length">
                <td colspan="11">
                  <div class="alert alert-danger text-danger text-center" role="alert">
                    No data available in table :(
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="alumnis.length" class="d-flex">
            <div class="col-md-4 pl-0" style="margin: auto" v-if="alumnis.length">
              Showing {{ pagination.from }} to {{ pagination.to }} from
              {{ pagination.total }} entiries
            </div>

            <PaginationComponent :links="links" @get-data="getData" />
          </div>
        </div>
      </div>
    </div>

    <!-- rating modal -->
    <div class="modal fade" id="addRatingModal" tabindex="-1" aria-labelledby="addRatingModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRatingModalLabel">Add Rating</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addRating">
              <div class="modal-body">
                <div class="mb-3">
                  <label class="d-block">Presentation Skill :</label>
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.presentation_skill_rating" class="form-check-input" type="radio" id="presentation1" value="1">
                    <label class="form-check-label" for="presentation1">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.presentation_skill_rating" class="form-check-input" type="radio" id="presentation2" value="2">
                    <label class="form-check-label" for="presentation2">2</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.presentation_skill_rating" class="form-check-input" type="radio" id="presentation3" value="3">
                    <label class="form-check-label" for="presentation3">3</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.presentation_skill_rating" class="form-check-input" type="radio" id="presentation4" value="4">
                    <label class="form-check-label" for="presentation4">4</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.presentation_skill_rating" class="form-check-input" type="radio" id="presentation5" value="5">
                    <label class="form-check-label" for="presentation5">5</label>
                  </div>                                                          
                </div>

                <div class="mb-3">
                  <label class="d-block">Communication Skill :</label>
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.communication_skill_rating" class="form-check-input" type="radio" id="communication1" value="1">
                    <label class="form-check-label" for="communication1">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.communication_skill_rating" class="form-check-input" type="radio" id="communication2" value="2">
                    <label class="form-check-label" for="communication2">2</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.communication_skill_rating" class="form-check-input" type="radio" id="communication3" value="3">
                    <label class="form-check-label" for="communication3">3</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.communication_skill_rating" class="form-check-input" type="radio" id="communication4" value="4">
                    <label class="form-check-label" for="communication4">4</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.communication_skill_rating" class="form-check-input" type="radio" id="communication5" value="5">
                    <label class="form-check-label" for="communication5">5</label>
                  </div>                                                          
                </div>

                <div class="mb-3">
                  <label class="d-block">English Skill :</label>
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.english_skill_rating" class="form-check-input" type="radio" id="english1" value="1">
                    <label class="form-check-label" for="english1">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.english_skill_rating" class="form-check-input" type="radio" id="english2" value="2">
                    <label class="form-check-label" for="english2">2</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.english_skill_rating" class="form-check-input" type="radio" id="english3" value="3">
                    <label class="form-check-label" for="english3">3</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.english_skill_rating" class="form-check-input" type="radio" id="english4" value="4">
                    <label class="form-check-label" for="english4">4</label>
                  </div>                                                          
                  <div class="form-check form-check-inline">
                    <input v-model="ratingForm.english_skill_rating" class="form-check-input" type="radio" id="english5" value="5">
                    <label class="form-check-label" for="english5">5</label>
                  </div>                                                          
                </div>
              </div>

              <div class="modal-footer">
                <button :disabled="ratingForm.busy" type="submit" class="btn btn-primary">Add</button>
              </div>
            </form>
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
import Form from 'vform';
import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5';
import PaginationComponent from "../../../components/PaginationComponent.vue";
import { useHead } from '@vueuse/head';

export default {
  name: "Index",
  components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      editMode: false,
      keyword: "",
      fieldName: "ewu_id_no",
      perPage: 10,
      alumnis: [],
      pagination: [],
      links: [],

      checked: [],
      selectPage : false,
      selectAll : false,
      url : '',

      valueFromRatingInfo: "rating_info",
      ratingForm: new Form({
          id: '',
          alumni_id: '',
          presentation_skill_rating: '',
          communication_skill_rating: '',
          english_skill_rating: '',
      }),

      valueFromFeatureCheckboxInfo: "feature_checkbox_info",
    };
  },

  watch: {
    keyword: function () {
      this.getData();
    },

    selectPage: function(value) {
      this.checked = [];
      if(value){
        this.alumnis.forEach(alumni => {
            this.checked.push(alumni.id);
        });
      }else{
        this.checked = [];
        this.selectAll = false;
      }
    },
    
    checked: function(value) {
      this.url = `${this.backendUrl}alumnis/export/` + this.checked;
    }
  },

  mounted() {
    useHead({title: 'Alumni | EWU'});
    this.getData();
  },

  methods: {
    getData(url) {
      this.$Progress.start();
      let linkUrl = url ? url : `${this.backendUrl}alumni`;
      axios.get(linkUrl, {
        params: {
          per_page: this.perPage,
          field_name: this.fieldName,
          keyword: this.keyword,
          place: 'admin_panel'
        },
      })
      .then((response) => {
        this.alumnis = response.data.data;
        this.pagination = response.data.meta;
        this.links = response.data.meta.links;
        this.$Progress.finish();
      })
      .catch((e) => {
        console.log(e);
        this.$Progress.fail();
      });
    },

    selectAllRecords(){
      axios.get(`${this.backendUrl}all/applicants`)
      .then(response => {
        this.checked = response.data;
        this.selectAll = true;
      });
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
          axios.delete(`${this.backendUrl}alumni/`+id)
          .then(response => {
              this.$swal.fire('Deleted!',response.data.message,'success')
              this.getData()
          });
        }
      })
    },

    deleteRecords(){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you wanna delete this Record? You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${this.backendUrl}alumnis/massDestroy/`+this.checked)
          .then(response => {
              this.$swal.fire('Deleted!',response.data.message,'success');
              this.checked = [];
              this.getData();
          });
        }
      })
    },

    exportPDF() {
      const filename = 'alumni-list.pdf'; 
      axios.get(`${this.backendUrl}alumnis/export/pdf/${filename}/${this.checked}`, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error(error);
        });
    },

    ratingModalShow(alumni){
      this.ratingForm.fill(alumni);
      this.ratingForm.alumni_id = alumni.id;
      $("#addRatingModal").modal("show");
    },

    addRating() {
      this.$Progress.start();
      this.ratingForm.busy = true;
      this.ratingForm.put(`${this.backendUrl}alumni/` + this.ratingForm.alumni_id, {
        params: {
          valueFrom: this.valueFromRatingInfo,
        },
      })
      .then((response) => {
        this.getData();
        if (this.ratingForm.successful) {
          $("#addRatingModal").modal("hide");
          this.ratingForm.reset();
          this.$Progress.finish();
          this.$notify({type: "success", title: "Success", text: "Rating added"});
        } else {
          this.$Progress.fail();
          this.$notify({type: "error",title: "Error",text: "Something went wrong try again later"});
        }
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    changeFeatureAlumniStatus($event) {
      let alumni_id = $event.target.value;
      // let checkValue = $event.target.checked ? 1 : 0;
      let checkValue = $event.target.checked;

      this.$Progress.start();
      axios.put(`${this.backendUrl}alumni/` + alumni_id, {
        valueFrom: this.valueFromFeatureCheckboxInfo,
        is_feature: checkValue,
      })
      .then((response) => {
        this.getData();
        this.$notify({type: "success", title: "Success", text: "Success"});
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    changeAlumniStatus($event) {
      const alumni_id = $event.target.value;
      const checkValue = $event.target.checked ? 'Active' : 'Inactive';

      // Update status via API call
      this.$Progress.start();
      axios.put(`${this.backendUrl}alumni/` + alumni_id, {
        valueFrom: 'alumni_active_inactive_checkbox_info',
        status: checkValue,
      })
      .then((response) => {
        this.getData();
        this.$notify({type: "success", title: "Success", text: "Success"});
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },
  }
};
</script>

<style>
  .passport-photo {
    width: 35mm;
    height: 45mm;
    overflow: hidden;
  }

  .passport-photo img {
    width: 100%;
    height: 100%;
  }
</style>
