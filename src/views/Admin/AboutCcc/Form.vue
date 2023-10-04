<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Form Grid Layout</h4>
                            <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>
                                <AlertError :form="form" message="There were some problems with your input." />

                                <!--<div class="mb-3">
                                    <label for="title" class="form-label">Title</label>
                                    <input v-model="form.title" type="text" name="title" class="form-control" placeholder="Enter Your Title">
                                    <HasError :form="form" field="title" />
                                </div>-->

                                <div class="mb-3">
                                    <label for="prelude" class="form-label">Prelude</label>
                                    <Editor
                                        v-model="form.prelude" name="prelude"
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
                                    <HasError :form="form" field="prelude" />
                                </div>

                                <div class="mb-3">
                                    <label for="objectives" class="form-label">Objectives</label>
                                    <Editor
                                        v-model="form.objectives" name="objectives"
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
                                    <HasError :form="form" field="objectives" />
                                </div>

                                <div class="mb-3">
                                    <label for="mission" class="form-label">Mission</label>
                                    <Editor
                                        v-model="form.mission" name="mission"
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
                                    <HasError :form="form" field="mission" />
                                </div>

                                <div class="mb-3">
                                    <label for="conclusion" class="form-label">conclusion</label>
                                    <Editor
                                        v-model="form.conclusion" name="conclusion"
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
                                    <HasError :form="form" field="conclusion" />
                                </div>

                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label class="form-label">Status</label>
                                        <select v-model="form.status" class="form-select">
                                            <option selected>Choose One</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        <HasError :form="form" field="status" />
                                    </div>
                                </div>

                                <div>
                                    <button :disabled="form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
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
import axios from 'axios';
    import Form from 'vform';
    import Editor from '@tinymce/tinymce-vue'
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'

    export default {
        name: 'Form',
        components: { Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                editMode: false,
                aboutCccs: [],

                form: new Form({
                    id: "",
                    title: "Title",
                    prelude: "",
                    objectives: "",
                    mission: "",
                    conclusion: "",
                    status: "",
                }),
            };
        },

        mounted() {
            if (this.$route.query.aboutCcc){
                this.editMode = true;
                this.edit();
            }
        },

        methods: {
                store() {
                    this.$Progress.start()
                    this.form.busy = true
                    this.form.post(`${this.backendUrl}about-ccc`)
                        .then(response => {
                            if(this.form.successful){
                                this.$Progress.finish()
                                this.$notify({ type: "success", title: "Success", text: "About CCC Added" });
                                this.$router.push({ path: '/about-ccc' })
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

                edit(){
                    let linkUrl = `${this.backendUrl}about-ccc/edit/`+this.$route.query.aboutCcc;
                    axios.get(linkUrl)
                        .then((response) => {
                            this.form.fill(response.data)
                        })
                        .catch((e) => {
                            console.log(e);
                            this.$Progress.fail();
                        });
                },

                update() {
                    this.$Progress.start();
                    this.form.busy = true;
                    console.log(this.form)
                    this.form.put(`${this.backendUrl}about-ccc/`+this.$route.query.aboutCcc)
                        .then((response) => {
                            if (this.form.successful) {
                                this.$Progress.finish();
                                this.$notify({
                                    type: "success",
                                    title: "Success",
                                    text: "About-CCC Updated Successfully",
                                });
                                this.$router.push({name: 'app.about_ccc'})
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
            }
    }
</script>

<style>

</style>