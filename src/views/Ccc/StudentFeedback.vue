<template>
    <div id="student_feedback">
        <div class="student-area pt-100 pb-70">
            <div class="container">
                <div class="register">
                    <h3>Student Feedback</h3>
                    <form @submit.prevent="submit()">
                        <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>
                        <AlertError :form="form" message="There were some problems with your input."/>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name <span style="color:red">*</span></label>
                                    <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Enter name" required/>
                                    <HasError :form="form" field="name"/>
                                </div>

                                <div class="mb-3">
                                    <label for="degree_program" class="form-label">Degree Program <span style="color:red">*</span></label>
                                    <input v-model="form.degree_program" type="text" name="degree_program" class="form-control" placeholder="Enter Degree Program" required/>
                                    <HasError :form="form" field="degree_program"/>
                                </div>

                                <div class="mb-3">
                                    <label for="email_address" class="form-label">Email Address <span style="color:red">*</span></label>
                                    <input v-model="form.email_address" type="text" name="email_address" class="form-control" placeholder="Enter Email Address" required/>
                                    <HasError :form="form" field="email_address"/>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="student_id" class="form-label">Student Id</label>
                                    <input v-model="form.student_id" type="text" name="student_id" class="form-control" placeholder="Enter Student Id"/>
                                    <HasError :form="form" field="student_id"/>
                                </div>

                                <div class="mb-3">
                                    <label for="level_of_study" class="form-label">Level of Study <span style="color:red">*</span></label>
                                    <input v-model="form.level_of_study" type="text" name="level_of_study" class="form-control" placeholder="Enter Level of Study" required/>
                                    <HasError :form="form" field="level_of_study"/>
                                </div>

                                <div class="mb-3">
                                    <label for="phone_number" class="form-label">Phone Number</label>
                                    <input v-model="form.phone_number" type="text" name="phone_number" class="form-control" placeholder="Enter Phone Number"/>
                                    <HasError :form="form" field="phone_number"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <label for="question_one" class="form-label">How do you feel about the website? <span style="color:red">*</span></label>
                            <textarea v-model="form.question_one" name="question_one" class="form-control" rows="4" required>How do you feel about the website?</textarea>
                            <HasError :form="form" field="question_one"/>
                        </div>

                        <div class="col-md-12 mt-3">
                            <label for="question_two" class="form-label">Is these any other features you would like to see here? <span style="color:red">*</span></label>
                            <textarea v-model="form.question_two" name="question_two" class="form-control" rows="4" required>Is these any other features you would like to see here?</textarea>
                            <HasError :form="form" field="question_two"/>
                        </div>

                        <div class="col-md-12 mt-3">
                            <label for="question_three" class="form-label">Do you need any more info? <span style="color:red">*</span></label>
                            <textarea v-model="form.question_three" name="question_three" class="form-control" rows="4" required>Do you need any more info ?</textarea>
                            <HasError :form="form" field="question_three"/>
                        </div>

                        <div class="col-md-1 mt-4 d-grid">
                            <button :disabled="form.busy" type="submit" class="btn btn-primary waves-effect waves-light">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
    <notifications />
</template>

<script>
import Form from "vform";
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";

export default {
    name: "StudentFeedback",
    components: { Button, HasError, AlertError, AlertErrors, AlertSuccess },

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
        
            form: new Form({
                name: "",
                student_id:"",
                degree_program: "",
                email_address: "",
                level_of_study: "",
                phone_number: "",
                question_one: "",
                question_two: "",
                question_three: "",
            }),
        };
    },

    methods: {
        submit() {
            this.$Progress.start();
            this.form.busy = true;
            this.form
            .post(`${this.backendUrl}student-feedback`)
            .then((response) => {
                if (this.form.successful) {
                    this.form.reset();
                    this.form.clear();
                    this.$Progress.finish();
                    this.$notify({ type: "success", title: "Success", text: "Feedback successfully added" });
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
