<template>
  <div id="home">
    <form @submit.prevent="update()">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <h3 class="mb-2">Marquee Text</h3>
              <div class="row" v-for="(row, index) in marqueeTextForm.marqueeTextFormDetails">
                <div class="col-md-5 mb-3">
                  <label for="successfullyPlacedStudentTitle" class="form-label">Title</label>
                  <input v-model="row.title" :name="'marqueetext['+index+'][title]'" type="text" class="form-control" placeholder="Enter marquee text title"/>
                  <HasError :form="marqueeTextForm" field="title" />
                </div>

                <div class="col-md-5 mb-3">
                  <label for="successfullyPlacedStudentTitle" class="form-label">URL</label>
                  <input :name="'marqueetext['+index+'][url]'" v-model="row.url" type="text" class="form-control" placeholder="marquee text url"/>
                  <HasError :form="marqueeTextForm" field="url" />
                </div>

                <div class="col-lg-1 mt-4" v-if="index!=0">
                  <button type="button" class="btn btn-outline-danger"  @click.prevent="removeMarqueeForm(index)">Remove</button>
                </div>
              </div>

              <div class="col-md-11 mb-3">
                <button type="button" class="btn btn-success float-end" @click.prevent="addMoreMarqueeText">
                  Add more
                </button>
              </div>

              <button  type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </form>
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

export default {
  name: "Home",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
   
      marqueeTextForm: new Form({
        marqueeTextFormDetails: [{
        id:"",
        title:"",
        url:"",
      }],
    }),
    };
  },

  mounted() {
    axios.get(`${this.backendUrl}get-marquee-texts`)
    .then((response) => {
      console.log(response.data);
      this.marqueeTextForm.marqueeTextFormDetails.splice(0, this.marqueeTextForm.marqueeTextFormDetails.length, ...response.data);
    })
    .catch((e) => {
      console.log(e);
      this.$Progress.fail();
    });
  },

  methods: {
    //  add More row item
    addMoreMarqueeText() {
      this.marqueeTextForm.marqueeTextFormDetails.push({
        id:"",
        title:"",
        url:"",
      });
    },
    // end

    // remove row item 
      removeMarqueeForm(index) {
        this.marqueeTextForm.marqueeTextFormDetails.splice(index,1);
    },
    // end

    // onCccHeaderLogoChange(e) {
    //   let file = e.target.files[0];
    //   let reader = new FileReader();

    //   reader.onloadend = (file) => {
    //     this.cccHeaderLogoPreview = reader.result;
    //     this.form.cccHeaderLogo = reader.result;
    //   };
    //   reader.readAsDataURL(file);
    // },

    // onCccFooterLogoChange(e) {
    //   let file = e.target.files[0];
    //   let reader = new FileReader();

    //   reader.onloadend = (file) => {
    //     this.cccFooterLogoPreview = reader.result;
    //     this.form.cccFooterLogo = reader.result;
    //   };
    //   reader.readAsDataURL(file);
    // },

    update() {
      this.$Progress.start();
      this.marqueeTextForm.busy = true;
      this.marqueeTextForm
        .put(`${this.backendUrl}marquee_texts`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          this.$Progress.fail();
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
