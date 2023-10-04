<template>
  <div id="product">
    <div class="col-12">
      <div class="card">
        <div class="row card-header bg-transparent border-bottom">
          <div class="col-md-8">
            <h4 class="card-title">List Of achievement</h4>
            <span>
              This is an achievement related information about Alumni and
              Student
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
                  <select @change="getData(null)" v-model="perPage" class="form-select form-control">
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
                  <select v-model="fieldName" id="fields" class="form-select form-control">
                    <option value="title">Title</option>
                    <option value="field">Field</option>
                    <option value="description">Description</option>
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
              <tr>
                <th>Serial No</th>
                <th>Title</th>
                <th class="text-center">Field</th>
                <!-- <th>Description</th> -->
                <th class="text-center">Date</th>
                <th class="text-center">Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(achievement, index) of achievements">
                <td>{{ achievement.id }}</td>
                <td>{{ achievement.title }}</td>
                <td class="text-center">{{ achievement.field }}</td>
                <!-- <td>{{ achievement.description }}</td> -->
                <td class="text-center">{{moment(achievement.achievement_date).format('ll')}}</td>
                <td class="text-center">{{ achievement.status }}</td>
                <td class="text-center">
                  <button type="button" @click="show(achievement)" class="btn btn-info btn-sm">
                    <i class="fas fa-eye"></i>
                  </button>

                  <button type="button" @click="edit(achievement)" class="btn btn-primary btn-sm">
                    <i class="fas fa-edit"></i>
                  </button>

                  <button type="button" @click="destroy(achievement.id)" class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>

              <tr v-show="!achievements.length">
                <td colspan="6">
                  <div class="alert alert-danger text-danger text-center" role="alert">
                    No data available in table :(
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="achievements.length" class="d-flex">
            <div class="col-md-4 pl-0" style="margin: auto" v-if="achievements.length">
              Showing {{ pagination.from }} to {{ pagination.to }} from
              {{ pagination.total }} entiries
            </div>

            <PaginationComponent :links="links" @get-data="getData" />
          </div>
        </div>
      </div>

      <!-- Create and Edit Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Achievement</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editMode ? update() : store()">
                <div v-if="form.progress" class="text-center">
                  Progress: {{ form.progress.percentage }}%
                </div>

                <AlertError :form="form" message="There were some problems with your input."/>

                <div class="modal-body">
                  <div class="form-group">
                    <label>Title</label>
                    <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false"/>
                    <HasError :form="form" field="title" />
                  </div>

                  <div class="form-group my-2">
                    <label>field</label>
                    <input v-model="form.field" type="text" name="field" class="form-control" placeholder="field" :readonly="showMode==true ? true : false"/>
                    <HasError :form="form" field="field" />
                  </div>

                  <div v-if="showMode==false" class="form-group my-2">
                    <label>Description</label>
                    <Editor
                        v-model="form.description" name="description"
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
<!--                    <textarea v-model="form.description" rows="3" cols="50" name="description" class="form-control" placeholder="Enter description here..." :readonly="showMode==true ? true : false"></textarea>-->
                    <HasError :form="form" field="description" />
                  </div>

                  <div v-if="showMode==true" class="form-group" >
                    <label>Description</label>
                    <p style="height: 150px;overflow:auto;" v-html="form.description" class="form-control border" readonly></p>
                  </div>

                  <div class="form-group my-2">
                    <label>achievement date</label>
                    <input v-model="form.achievement_date" type="date" name="achievement_date" class="form-control" placeholder="achievement_date" :readonly="showMode==true ? true : false"/>
                    <HasError :form="form" field="achievement_date" />
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
import Editor from '@tinymce/tinymce-vue'
import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from "vform/src/components/bootstrap5";
import PaginationComponent from "../../../components/PaginationComponent.vue";
import moment from 'moment';
import { useHead } from '@vueuse/head';

export default {
  name: "achievementsTable",
  components: {
    PaginationComponent,
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
    Editor
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      moment: moment,
      editMode: false,
      showMode: false,
      keyword: "",
      fieldName: "title",
      perPage: 10,
      achievements: [],
      pagination: [],
      links: [],

      form: new Form({
        id: "",
        title: "",
        field: "",
        description: "",
        achievement_date: "",
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
    useHead({title: 'Achievement | EWU'});
    this.getData();
  },

  methods: {
    getData(url) {
      this.$Progress.start();
      let linkUrl = url ? url : `${this.backendUrl}achievement`;
      axios
        .get(linkUrl, {
          params: {
            per_page: this.perPage,
            field_name: this.fieldName,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          this.achievements = response.data.data;
          this.pagination = response.data.meta;
          this.links = response.data.meta.links;
          this.$Progress.finish();
        })
        .catch((e) => {
          console.log(e);
          this.$Progress.fail();
        });
    },

    show(id) {
      this.showMode = true
      this.form.reset()
      this.form.clear()
      this.form.fill(id)
      $("#exampleModal").modal("show");
    },

    create() {
      this.editMode = false;
      this.form.reset();
      this.form.clear();
      // $("#image").val('')
      $("#exampleModal").modal("show");
    },

    edit(id) {
      this.editMode = true;
      this.form.reset();
      this.form.clear();
      this.form.fill(id);
      $("#exampleModal").modal("show");
    },

    onImageChange(e) {
      this.form.image = e.target.files[0];
    },

    store() {
      this.$Progress.start();
      this.form.busy = true;
      this.form
        .post(`${this.backendUrl}achievement`)
        .then((response) => {
          this.getData();
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({ type: "success", title: "Success", text: " New Achievement Added"});
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

    update() {
      this.$Progress.start();
      this.form.busy = true;
      this.form
        .put(`${this.backendUrl}achievement/` + this.form.id)
        .then((response) => {
          this.getData();
          $("#exampleModal").modal("hide");
          if (this.form.successful) {
            this.$Progress.finish();
            this.$notify({ type: "success", title: "Success", text: "Skill Updated"});
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
              .delete(`${this.backendUrl}achievement/` + id)
              .then((response) => {
                this.$swal.fire("Deleted!", response.data.message, "success");
                this.getData();
              });
          }
        });
    },
  },
};
</script>

<style></style>
