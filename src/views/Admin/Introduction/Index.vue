<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Introduction Details</h4>
                        </div>
                    </div>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="step_one_tab" data-bs-toggle="tab" data-bs-target="#step_one" type="button" role="tab" aria-controls="step_one" aria-selected="true">What to expect?</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="step_two_tab" data-bs-toggle="tab" data-bs-target="#step_two" type="button" role="tab" aria-controls="step_two" aria-selected="false">Are You in a crisis?</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="step_three_tab" data-bs-toggle="tab" data-bs-target="#step_three" type="button" role="tab" aria-controls="step_three" aria-selected="false">Who should you meet?</button>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="step_one" role="tabpanel" aria-labelledby="step_one_tab">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12">
                                        <form @submit.prevent="stepOneUpdate()">
                                            <div class="mb-3">
                                                <Editor v-model="stepOneform.step_one" name="step_one" api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
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
                                                <HasError :form="stepOneform" field="step_one" />
                                            </div>

                                            <div>
                                                <button type="submit" class="btn btn-primary w-md">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="step_two" role="tabpanel" aria-labelledby="step_two_tab">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12">
                                        <form @submit.prevent="stepTwoUpdate()">
                                            <div class="mb-3">
                                                <Editor v-model="stepTwoform.step_two" name="step_two" api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
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
                                                <HasError :form="stepTwoform" field="step_two" />
                                            </div>

                                            <div>
                                                <button type="submit" class="btn btn-primary w-md">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="step_three" role="tabpanel" aria-labelledby="step_three_tab">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12">
                                        <form @submit.prevent="stepThreeUpdate()">
                                            <div class="mb-3">
                                                <Editor v-model="stepThreeform.step_three" name="step_three"  api-key="d96q2ppkalbf7qegddzixp72gwn2ivlzvdnzxor2th9jnen2"
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
                                                <HasError :form="stepThreeform" field="step_three" />
                                            </div>

                                            <div>
                                                <button type="submit" class="btn btn-primary w-md">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";

export default {
  name: "CCCjobpostsTable",
  components: {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
    Editor,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      stepOneform: new Form({
        id: "",
        step_one:"",
      }),

      stepTwoform: new Form({
        id: "",
        step_two:"",
      }),

      stepThreeform: new Form({
        id: "",
        step_three:"",
      }),
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData(){
        axios.get(`${this.backendUrl}introduction/list`)
        .then((response) => {
            this.stepOneform.step_one = response.data.step_one.value;
            this.stepTwoform.step_two = response.data.step_two.value;
            this.stepThreeform.step_three = response.data.step_three.value;
        })
        .catch((e) => {
            console.log(e);
        });
    },

    stepOneUpdate() {
        this.$Progress.start()
        this.stepOneform.busy = true
        this.stepOneform.put(`${this.backendUrl}introduction/step-one`)
        .then(response => {
            this.getData()
            if(this.stepOneform.successful){
                this.$Progress.finish()
                this.$notify({ type: "success", title: "Success", text: response.data.message });
            }else{
                this.$Progress.fail()
                this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
            }
        })
        .catch(e => {
            this.$Progress.fail()
            console.log(e)
        })
    },

    stepTwoUpdate() {
        this.$Progress.start()
        this.stepTwoform.busy = true
        this.stepTwoform.put(`${this.backendUrl}introduction/step-two`)
        .then(response => {
            this.getData()
            if(this.stepTwoform.successful){
                this.$Progress.finish()
                this.$notify({ type: "success", title: "Success", text: response.data.message });
            }else{
                this.$Progress.fail()
                this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
            }
        })
        .catch(e => {
            this.$Progress.fail()
            console.log(e)
        })
    },

    stepThreeUpdate() {
        this.$Progress.start()
        this.stepThreeform.busy = true
        this.stepThreeform.put(`${this.backendUrl}introduction/step-three`)
        .then(response => {
            this.getData()
            if(this.stepThreeform.successful){
                this.$Progress.finish()
                this.$notify({ type: "success", title: "Success", text: response.data.message });
            }else{
                this.$Progress.fail()
                this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
            }
        })
        .catch(e => {
            this.$Progress.fail()
            console.log(e)
        })
    },
  },
};
</script>


