<template>
  <div id="seo">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List Of SEO data</h4>
            <span>
              This is a SEO related information about Alumni and Student
            </span>
          </div>
          <div class="col-md-4">
            <button type="button" @click="create" class="btn btn-sm btn-success float-end">
              <i class="fas fa-plus"></i> Add New
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
                  <select @change="getData(null)" v-model="perPage" class="form-select form-select-sm">
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
                  <select v-model="fieldName" id="fields" class="form-select form-select-sm">
                    <option value="title">Title</option>
                  </select>
                </div>

                <div class="col-md-7">
                  <input v-model="keyword" type="text" class="form-control" placeholder="Search" style="height:26px;" />
                </div>
              </div>
            </div>
          </div>

          <table class="table table-bordered dt-responsive nowrap w-100">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Site</th>
                <th>Page URL</th>
                <th>Title</th>
                <th>Keywords</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(seo, index) of seos">
                <td>{{ index + 1 }}</td>
                <td>{{ seo.site }}</td>
                <td>{{ seo.page_url }}</td>
                <td>{{ seo.title }}</td>
                <td>{{ seo.keywords }}</td>
                <td>{{ seo.description }}</td>
                <td>
                  <!-- <button type="button" @click="show(seo)" class="btn btn-info btn-sm">
                    <i class="fas fa-eye"></i>
                  </button> -->

                  <button type="button" @click="edit(seo)" class="btn btn-primary btn-sm">
                    <i class="fas fa-edit"></i>
                  </button>

                  <button type="button" @click="destroy(seo.id)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>

              <tr v-show="!seos.length">
                <td colspan="8">
                  <div class="alert alert-danger text-danger text-center" role="alert">
                    No data available in table :(
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="seos.length" class="d-flex">
            <div class="col-md-4 pl-0" style="margin: auto" v-if="seos.length">
              Showing {{ pagination.from }} to {{ pagination.to }} from
              {{ pagination.total }} entiries
            </div>

            <PaginationComponent
              :links="links"
              @get-data="getData" 
            />
          </div>
        </div>
      </div>

      <!-- Create and Edit Modal -->
      <div class="modal fade" id="createEditModal" tabindex="-1" aria-labelledby="createEditModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createEditModalLabel"> {{ editMode ? 'Update' : 'Create' }} SEO data</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editMode ? update() : store()">
                <div v-if="form.progress" class="text-center">
                  Progress: {{ form.progress.percentage }}%
                </div>
                <AlertError :form="form" message="There were some problems with your input." />

                <div class="modal-body">
                  <div class="form-group">
                      <label>Site</label>
                      <select v-model="form.site" class="form-control form-select">
                          <option value="ccc">CCC</option>
                          <option value="alumni">Alumni Portal</option>
                          <option value="job_portal">Job Portal</option>
                      </select>
                      <HasError :form="form" field="site" />
                  </div>

                  <!-- <div class="form-group mt-2">
                      <label>Module</label>
                      <select v-model="form.module" class="form-control form-select">
                          <option value="home">Home</option>
                          <option value="auth">Auth</option>
                      </select>
                      <HasError :form="form" field="module" />
                  </div>

                  <div class="form-group mt-2">
                      <label>Page</label>
                      <select v-model="form.page" class="form-control form-select">
                          <template v-if="form.site == 'ccc' && form.module == 'home'">
                            <option v-for="(value, key) in cccHomePageNameArray" :key="key" :value="key">{{ value }}</option>
                          </template>

                          <template v-if="form.site == 'ccc' && form.module == 'auth'">
                            <option v-for="(value, key) in cccAuthPageNameArray" :key="key" :value="key">{{ value }}</option>
                          </template>

                          <template v-if="form.site == 'alumni' && form.module == 'home'">
                            <option v-for="(value, key) in alumniHomePageNameArray" :key="key" :value="key">{{ value }}</option>
                          </template>

                          <template v-if="form.site == 'alumni' && form.module == 'auth'">
                            <option v-for="(value, key) in alumniAuthPageNameArray" :key="key" :value="key">{{ value }}</option>
                          </template>
                      </select>
                      <HasError :form="form" field="page" />
                  </div> -->

                  <div class="form-group mt-2">
                    <label>Page URL</label>
                    <input v-model="form.page_url" type="text" class="form-control" placeholder="page url"/>
                    <HasError :form="form" field="page_url" />
                  </div>

                  <div class="form-group mt-2">
                    <label>Title</label>
                    <input v-model="form.title" type="text" class="form-control" placeholder="Title"/>
                    <HasError :form="form" field="title" />
                  </div>

                  <div class="form-group mt-2">
                    <label>Keywords</label>
                    <input v-model="form.keywords" type="text" class="form-control" placeholder="Keywords"/>
                    <HasError :form="form" field="keywords" />
                  </div>

                  <div class="form-group mt-2">
                    <label>Description</label>
                    <textarea v-model="form.description" class="form-control" cols="30" rows="5" placeholder="Description ..."></textarea>
                    <HasError :form="form" field="description" />
                  </div>
                </div>

                <div class="modal-footer">
                  <button :disabled="form.busy" type="submit" class="btn btn-primary">
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
import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from "vform/src/components/bootstrap5";
import PaginationComponent from "../../../components/PaginationComponent.vue";

export default {
  name: "Index",
  components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess},

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      editMode: false,
      keyword: "",
      fieldName: "title",
      perPage: 10,
      pagination: [],
      links: [],
      seos: [],

      form: new Form({
        id: "",
        site: "",
        // module: "",
        // page: "",
        page_url: "",
        title: "",
        keywords: "",
        description: "",
      }),

      cccHomePageNameArray: {
        index: 'Index',
        aboutCcc: 'About CCC',
        noticeEvent:'Notice Event',
        noticeEventSingleView:'Notice Event Single View',
        cccUpdate:'CCC Update',
        cccUpdateSingleView:'CCC Update Single View',
        cccFaq:'CCC FAQ',
      },

      cccAuthPageNameArray: {
        login: 'Login',
        register: 'Register',
      },

      alumniHomePageNameArray: {
        index: 'Index',
        news: 'News',
        newsSingleView:'News Single View',
        event:'Event',
        eventSingleView:'Event Single View',
      },

      alumniAuthPageNameArray: {
        login: 'Login',
        register: 'Register',
        forgotPassword: 'Forgot Password',
        resetPassword: 'Reset Password',
      },
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
      let linkUrl = url ? url : `${this.backendUrl}seo`;
      axios.get(linkUrl, {
        params: {
          per_page: this.perPage,
          field_name: this.fieldName,
          keyword: this.keyword,
        },
      })
      .then((response) => {
        this.seos = response.data.data;
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
      this.form.reset();
      this.form.clear();
      $("#createEditModal").modal("show");
    },

    store() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.post(`${this.backendUrl}seo`)
      .then((response) => {
        this.getData();
        $("#createEditModal").modal("hide");
        if (this.form.successful) {
          this.$Progress.finish();
          this.$notify({ type: "success", title: "Success", text: "SEO Data Added"});
        } else {
          this.$Progress.fail();
          this.$notify({ type: "error", title: "Error", text: "Something went wrong try again later"});
        }
      })
      .catch((e) => {
        this.$Progress.fail();
        console.log(e);
      });
    },

    edit(seo) {
      this.editMode = true;
      this.form.reset();
      this.form.clear();
      this.form.fill(seo);
      $("#createEditModal").modal("show");
    },

    update() {
      this.$Progress.start();
      this.form.busy = true;
      this.form.put(`${this.backendUrl}seo/` + this.form.id)
      .then((response) => {
        this.getData();
        $("#createEditModal").modal("hide");
        if (this.form.successful) {
          this.$Progress.finish();
          this.$notify({ type: "success", title: "Success", text: "SEO Data Updated"});
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

    destroy(id) {
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
            axios.delete(`${this.backendUrl}seo/` + id)
            .then((response) => {
              this.$notify({type: "success",title: "Success",text: "SEO Data Deleted"});
              this.getData();
            });
          }
        });
    },
  },
};
</script>