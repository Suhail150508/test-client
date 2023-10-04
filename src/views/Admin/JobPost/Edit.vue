<template>
  <div id="form">
    <div class="row">
      <div class="col-xl-11 m-auto">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Job Vacancy</h4>
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label class="form-label">Headline<span style="color:red;">*</span></label>
                <input type="text" v-model="form.headline" class="form-control"  placeholder="Headline">
                <HasError :form="form" field="headline" />
              </div>

              <div class="mb-3">
                <label class="form-label">Position Name<span style="color:red;">*</span></label>
                <input type="text"  v-model="form.job_title" class="form-control"  placeholder="Enter job position name">
                <HasError :form="form" field="job_title" />
              </div>

              <div class="mb-3">
                <label class="form-label">Organization<span style="color:red;">*</span></label>
                <input type="text" v-model="form.company_name" class="form-control"  placeholder="Organization">
                <HasError :form="form" field="company_name" />
              </div>

              <div class="mb-3">
                <label class="form-label">Job Details<span style="color:red;">*</span></label>
                <Editor v-model="form.job_details" name="job_details" api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
                  :init="{           
                    height: 400,
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
                <HasError :form="form" field="job_details" />
              </div>

              <div class="mb-3">
                <label class="form-label">Application Deadline<span style="color:red;">*</span></label>
                <input type="date" class="form-control" v-model="form.job_deadline">
                <HasError :form="form" field="job_deadline" />
              </div>

              <div class="mb-3">
                <label class="form-label">File</label>
                <input type="file" class="form-control news-feed-file-input" accept=".xls,.xlsx, application/*" id="document-input" @change="onDocumentChange">

                <div v-if="documentPreview">
                    <embed :src="documentPreview" width="100%" style="max-height: 50rem; min-height: 20rem"/>
                  </div>
              </div>

              <div>
                <button type="submit" class="btn btn-primary w-md">Submit</button>
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
  import Form from "vform";
  import Editor from '@tinymce/tinymce-vue'
  import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";
  
  export default {
    name: "CCCjobpostsTable",
    components: {
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
        
        keyword: "",
        fieldName: "job_title",
        perPage: 5,
        pagination: [],
        links: [],

        jobposts: [],

        documentPreview: '',
        form: new Form({
          id: "",
          headline:"",
          job_title: "",
          company_name: "",
          job_details: "",
          job_deadline: "",
          document: "",
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
      getData() {
        axios.get(`${this.backendUrl}job-post/`+this.$route.query.jobId)
        .then((response) => {
          this.form.fill(response.data);
          this.form.document = '';
          this.documentPreview = response.data.document;
        })
        .catch((e) => {
          this.$Progress.fail();
        });
      },
      
      // upload company logo 
      // onImageChange(e) {
      //   let file = e.target.files[0];
      //   let reader = new FileReader();
      //   reader.onloadend = (file) => {
      //       this.imagePreviewResumeImage = reader.result;
      //       this.form.company_logo= reader.result;
      //   }
      //   reader.readAsDataURL(file);
      // },

      onDocumentChange(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = (e) => {
          this.documentPreview = reader.result;
          this.form.document = reader.result;
        }
        reader.readAsDataURL(file);
      },

      update() {
        this.$Progress.start();
        this.form.busy = true;
        this.form.put(`${this.backendUrl}job-post/` + this.form.id)
        .then((response) => {
          if (this.form.successful) {
            this.$notify({ type: "success", title: "Success", text: "Jobposts Updated" });
            this.$router.push({ name: 'app.jobpost'})
          } else {
            this.$Progress.fail();
            this.$notify({ type: "error", title: "Error", text: "Something went wrong try again later" });
          }
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
      },
    },
  };
</script>