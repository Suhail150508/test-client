<template>
  <div id="alumni">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List Of Pending Registrations</h4>
            <span>
              This is an alumni related information
            </span>
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
                <th class="text-center">Registration Status</th>
                <th class="text-center" style="width: 8%;">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(alumni, index) of alumnis">
                <td class="text-center"><input type="checkbox" :value="alumni.id" v-model="checked"/></td>

                <td class="text-center">{{ index + 1 }}</td>

                <td class="text-center">{{ alumni.ewu_id_no }}</td>

                <td class="text-center">
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

                <td class="text-center">
                  <span v-if="alumni.reg_status == 'Pending'" class="badge text-bg-warning">Pending</span>
                  <span v-else-if="alumni.reg_status == 'Approve'" class="badge text-bg-success">Approve</span>
                  <span v-else-if="alumni.reg_status == 'Reject'" class="badge text-bg-danger">Reject</span>
                </td>

                <td class="text-center">
                  <template v-if="alumni.reg_status === 'Pending'">
                    <button type="button" @click="approveRemark(alumni)" class="btn btn-info btn-sm m-1"><i class="fa-solid fa-check"></i></button>
                    <button type="button" @click="rejectRemark(alumni)" class="btn btn-danger btn-sm m-1"><i class="fa-solid fa-xmark"></i></button>
                  </template>

                  <template v-else-if="alumni.reg_status === 'Approve'">
                    <button type="button" @click="rejectRemark(alumni)" class="btn btn-danger btn-sm m-1"><i class="fa-solid fa-xmark"></i></button>
                  </template>

                  <template v-else>
                    <button type="button" @click="approveRemark(alumni)" class="btn btn-info btn-sm m-1"><i class="fa-solid fa-check"></i></button>
                  </template>
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

    <!-- Approve Remark Modal -->
    <div class="modal fade" id="addApproveRemarkModal" tabindex="-1" aria-labelledby="addApproveRemarkModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addApproveRemarkModalLabel">Add Approve Remark</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addApproveRemark">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="approve-remark" class="form-label">Approve Remark</label>
                  <textarea v-model="approveRemarkForm.approve_remark" rows="3" cols="50" class="form-control" placeholder="Enter approve remark"></textarea>
                  <HasError :form="approveRemarkForm" field="approve_remark" />
                </div>
              </div>

              <div class="modal-footer">
                <button :disabled="approveRemarkForm.busy" type="submit" class="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Reject Remark Modal -->
    <div class="modal fade" id="addRejectRemarkModal" tabindex="-1" aria-labelledby="addRejectRemarkModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRejectRemarkModalLabel">Add Reject Remark</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addRejectRemark">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="reject-remark" class="form-label">Reject Remark</label>
                  <textarea v-model="rejectRemarkForm.reject_remark" rows="3" cols="50" class="form-control" placeholder="Enter reject remark"></textarea>
                  <HasError :form="rejectRemarkForm" field="reject_remark" />
                </div>
              </div>

              <div class="modal-footer">
                <button :disabled="rejectRemarkForm.busy" type="submit" class="btn btn-primary">Add</button>
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

      approveRemarkForm: new Form({
        id: '',
        user_id: '',
        approve_remark: '',
      }),

      rejectRemarkForm: new Form({
        id: '',
        user_id: '',
        reject_remark: '',
      }),
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
      let linkUrl = url ? url : `${this.backendUrl}alumni/manual/registration`;
      axios.get(linkUrl, {
        params: {
          per_page: this.perPage,
          field_name: this.fieldName,
          keyword: this.keyword,
        },
      })
      .then((response) => {
        this.alumnis = response.data.data;
        // console.log(this.alumnis);
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

    approveRemark(alumni){
      this.approveRemarkForm.fill(alumni);
      this.approveRemarkForm.user_id = alumni.user.id;
      $("#addApproveRemarkModal").modal("show");
    },

    addApproveRemark() {
      this.$Progress.start();
      this.approveRemarkForm.busy = true;
      this.approveRemarkForm.put(`${this.backendUrl}alumni/` + this.approveRemarkForm.id, {
        params: {
          valueFrom: 'add_approve_remark',
        },
      })
      .then((response) => {
        this.getData();
        if (this.approveRemarkForm.successful) {
          $("#addApproveRemarkModal").modal("hide");
          this.approveRemarkForm.reset();
          this.$Progress.finish();
          this.$notify({type: "success", title: "Success", text: "Remark added"});
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

    rejectRemark(alumni){
      this.rejectRemarkForm.fill(alumni);
      this.rejectRemarkForm.user_id = alumni.user.id;
      $("#addRejectRemarkModal").modal("show");
    },

    addRejectRemark() {
      this.$Progress.start();
      this.rejectRemarkForm.busy = true;
      this.rejectRemarkForm.put(`${this.backendUrl}alumni/` + this.rejectRemarkForm.id, {
        params: {
          valueFrom: 'add_reject_remark',
        },
      })
      .then((response) => {
        this.getData();
        if (this.rejectRemarkForm.successful) {
          $("#addRejectRemarkModal").modal("hide");
          this.rejectRemarkForm.reset();
          this.$Progress.finish();
          this.$notify({type: "success", title: "Success", text: "Remark added"});
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
