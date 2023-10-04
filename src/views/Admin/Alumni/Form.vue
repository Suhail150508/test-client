<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Alumni {{ editMode ? 'Update' : 'Create' }}</h4>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'app.alumni_all' }" type="button" class="btn btn-sm btn-success float-end">
                            <i class="fas fa-left-arrow"></i> All Alumni
                            </router-link>
                        </div>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="editMode ? update() : store()">
                            <div v-if="form.progress" class="text-center">
                                Progress: {{ form.progress.percentage }}%
                            </div>
                            <AlertError :form="form" message="There were some problems with your input." />

                            <div class="mb-3">
                                <label for="ewu_id_no" class="form-label">EWU id number</label>
                                <input v-model="form.ewu_id_no" type="text" class="form-control shadow-lg bg-white rounded"
                                placeholder="Enter Your University ID" />
                                <HasError :form="form" field="ewu_id_no" />
                            </div>

                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input v-model="form.title" type="text" class="form-control shadow-lg bg-white rounded"
                                placeholder="Add Title" />
                                <HasError :form="form" field="title" />
                            </div>
  
                            <div class="mb-3">
                                <label for="first_name" class="form-label">First Name</label>
                                <input v-model="form.first_name" type="text" class="form-control shadow-lg bg-white rounded" placeholder="Enter your first name" />
                                <HasError :form="form" field="first_name" />
                            </div>
  
                            <div class="mb-3">
                                <label for="middle_name" class="form-label">Middle Name</label>
                                <input v-model="form.middle_name" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter your middle name" />
                                <HasError :form="form" field="middle_name" />
                            </div>
                
                            <div class="mb-3">
                                <label for="last_name" class="form-label">Last Name</label>
                                <input v-model="form.last_name" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter your last name" />
                                <HasError :form="form" field="last_name" />
                            </div>
  
                            <div class="mb-3">
                                <label for="personal_email" class="form-label"> Personal E-mail Address</label>
                                <input v-model="form.personal_email" type="email" class="form-control shadow-lg bg-white rounded" id="personal_email"
                                    placeholder="Format: personal@example.com" />
                                <HasError :form="form" field="personal_email" />
                            </div>
                
                            <div class="mb-3">
                                <label for="university_email" class="form-label">University E-mail Address</label>
                                <input v-model="form.university_email" type="email" class="form-control shadow-lg bg-white rounded" id="university_email"
                                    placeholder="Format: university@example.com"  />
                                <HasError :form="form" field="university_email" />
                            </div>
  
                            <div class="mb-3">
                                <label for="company_email" class="form-label">Company E-mail Address</label>
                                <input v-model="form.company_email" type="email" class="form-control shadow-lg bg-white rounded" id="company_email"
                                    placeholder="Format: company@example.com"  />
                                <HasError :form="form" field="company_email" />
                            </div>
                
                            <div class="mb-3">
                                <label for="personal_contact_number" class="form-label">Contact Number</label>
                                <input v-model="form.personal_contact_number" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Format: 01xxxxxxxxx" />
                                <HasError :form="form" field="personal_contact_number" />
                            </div>
  
                            <div class="mb-3">
                                <label for="nid" class="form-label">NID</label>
                                <input v-model="form.nid" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter your National Identity Card Number" />
                                <HasError :form="form" field="nid" />
                            </div>
                
                            <div class="mb-3">
                                <label for="dob" class="form-label">Date of Birth</label>
                                <input v-model="form.dob" type="date" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Format: DD-MM-YYYY" />
                                <HasError :form="form" field="dob" />
                            </div>
  
                            <div class="mb-3">
                                <label for="gender" class="form-label">Gender</label>
                                <select v-model="form.gender" class="form-select form-control shadow-lg rounded">
                                    <option value="">Select One</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <HasError :form="form" field="gender" />
                            </div>
                
                            <div class="mb-3">
                                <label for="blood_group" class="form-label">Blood Group</label>
                                <select v-model="form.blood_group" class="form-select form-control shadow-lg rounded">
                                    <option value="">Select One</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                                <HasError :form="form" field="blood_group" />
                            </div>
  
                            <div class="mb-3">
                                <label for="department_name" class="form-label">Department Name</label>
                                <select v-model="form.department_name" class="form-control form-select shadow-lg rounded">
                                    <option value="">Select One</option>
                                    <option v-for="(item,index) in departments" :value="item.academicDepartmentName">{{item.academicDepartmentName}}</option>
                                </select>
                                <HasError :form="form" field="department_name" />
                            </div>
                
                            <div class="mb-3">
                                <label for="program_type" class="form-label">Program Type</label>
                                <select v-model="form.program_type" class="form-select form-control shadow-lg rounded">
                                    <option value="">Select One</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Graduate">Graduate</option>
                                    <option value="Diploma">Diploma</option>
                                </select>
                                <HasError :form="form" field="program_type" />
                            </div>

                            <div class="mb-3">
                                <label for="program_name" class="form-label">Program Name</label>
                                <input v-model="form.program_name" type="text" class="form-control shadow-lg bg-white rounded" placeholder="Program Name"/>
                                <HasError :form="form" field="program_name" />
                            </div>

                            <div class="mb-3">
                                <label for="passing_semester" class="form-label">Passing Semester</label>
                                <select v-model="form.passing_semester" class="form-control form-select shadow-lg rounded">
                                    <option value="">Select One</option>
                                    <option v-for="(item,index) in semesters" :value="item.semesterName">{{item.semesterName}}</option>
                                </select>
                                <!--<input v-model="form.passing_semester" type="text" class="form-control shadow-lg bg-white rounded"
                                       placeholder="Passing Semester" />-->
                                <HasError :form="form" field="passing_semester" />
                            </div>
  
                            <div class="mb-3">
                                <label for="passing_year" class="form-label">Passing Semester And Year</label>
                                <input v-model="form.passing_year" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Format: Spring 2021, Fall 2020" />
                                <HasError :form="form" field="passing_year" />
                            </div>
                
                            <div class="mb-3">
                                <label for="convocation_year" class="form-label">Convocation Year</label>
                                <input v-model="form.convocation_year" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter your convocation year" />
                                <HasError :form="form" field="convocation_year" />
                            </div>
  
                            <div class="mb-3">
                                <label for="organization" class="form-label">Organization Name</label>
                                <input v-model="form.organization" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter organization name" />
                                <HasError :form="form" field="organization" />
                            </div>
                
                            <div class="mb-3">
                                <label for="designation_department" class="form-label">Designation / Department</label>
                                <input v-model="form.designation_department" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter Designation or Department" />
                                <HasError :form="form" field="designation_department" />
                            </div>
  
                            <div class="mb-3">
                                <label for="occupation" class="form-label">Occupation</label>
                                <input v-model="form.occupation" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter Your Occupation" />
                                <HasError :form="form" field="occupation" />
                            </div>
                
                            <div class="mb-3">
                                <label for="doj" class="form-label">Date of Join</label>
                                <input v-model="form.doj" type="date" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Format: DD-MM-YYYY" />
                                <HasError :form="form" field="doj" />
                            </div>
  
                            <div class="mb-3">
                                <label for="linkedin_profile_link" class="form-label">Linkedin Profile Link</label>
                                <input v-model="form.linkedin_profile_link" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter Linkedin Profile Link" />
                                <HasError :form="form" field="linkedin_profile_link" />
                            </div>
                
                            <div class="mb-3">
                                <label for="image" class="form-label">Image</label>
                                <input @change="onImageChange" name="image" type="file" class="form-control shadow-lg bg-white rounded"
                                    id="file" />
                                <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="">
                                <HasError :form="form" field="image" />
                            </div>
  
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input v-model="form.username" type="text" class="form-control shadow-lg bg-white rounded"
                                    placeholder="Enter username" />
                                <HasError :form="form" field="username" />
                            </div>
                
                            <div class="mb-3">
                                <label for="email" class="form-label">Login E-mail</label>
                                <select v-model="form.email" class="form-select form-control shadow-lg rounded" placeholder="Choose One" @click="getEmails()">
                                    <option v-for="item in emails" :value="item">{{ item }}</option>
                                </select>
                                <HasError :form="form" field="email" />
                            </div>
  
                            <div class="mb-3" v-if="editMode == true">
                                <label for="current_password" class="form-label">Current Password</label>
                                <input type="hidden" v-model="form.old_password">
                                <input v-model="form.current_password" type="password" name="current_password" class="form-control shadow-lg bg-white rounded" placeholder="Current password" />
                                <HasError :form="form" field="current_password" />
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">{{ editMode ? "New Password" : "Password" }}</label>
                                <input v-model="form.password" type="password" name="password" class="form-control shadow-lg bg-white rounded" placeholder="Enter password" />
                                <HasError :form="form" field="password" />
                            </div>

                            <!-- <div class="mb-3">
                                <label for="password" class="form-label">{{ editMode ? "Current Password" : "Password" }}</label>
                                <input type="hidden" v-model="form.old_password">
                                <input v-model="form.password" type="password" name="password"
                                    class="form-control shadow-lg bg-white rounded" placeholder="Enter password" />
                                <HasError :form="form" field="password" />
                            </div>

                            <div class="mb-3" v-if="editMode == true">
                                <label for="new_password" class="form-label">New Password</label>
                                <input v-model="form.new_password" type="password" name="new_password"
                                    class="form-control shadow-lg bg-white rounded" placeholder="New password" />
                                <HasError :form="form" field="new_password" />
                            </div>

                            <div class="mb-3" v-if="editMode == true">
                                <label for="password_confirm" class="form-label">Confirm Password</label>
                                <input v-model="form.password_confirm" type="password" name="password_confirm"
                                    class="form-control shadow-lg bg-white rounded" placeholder="Retype password" />
                                <HasError :form="form" field="password_confirm" />
                            </div> -->

                            <div class="col-md-12 text-center">
                                <button
                                    :disabled="form.busy"
                                    type="submit"
                                    class="btn btn-primary"
                                >
                                    {{ editMode ? "Update" : "Create" }}
                                </button>
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
import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from "vform/src/components/bootstrap5";

export default {
    name: "Register",
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

            imagePreview: "",
            editMode: false,

            form: new Form({
                id: "",
                // basic info
                ewu_id_no: "",
                title: "",
                first_name: "",
                middle_name: "",
                last_name: "",
                nid: "",
                dob: "",
                gender: "",
                blood_group: "",
                // about: "",
                image: "",

                // contact info
                personal_email: "",
                university_email: "",
                company_email: "",
                personal_contact_number: "",

                // official_contact_number: "",
                // facebook_profile_link: "",
                linkedin_profile_link: "",

                // address info
                // country_id: "",
                // division_id: "",
                // district_id: "",

                // educational info
                // department_id: "",
                // program_id: "",
                // program: "",
                department_name:"",
                program_type:"",
                program_name:"",
                passing_year: "",
                passing_semester: "",
                convocation_year: "",

                // professional info
                organization: "",
                designation_department: "",
                occupation: "",
                doj: "",
                // experience: "",
                // industry: "",

                // login info
                email: "",
                username: "",
                old_password: "",
                current_password: "",
                password: "",
                // password_confirm: "",
            }),



            departments: [],
            semesters: [],
            emails:[],
        };
    },

    mounted() {
        this.checkAuthenticateOrNot();
    },

    created() {
        axios.get(`${this.backendUrl}alumni/` + this.$route.query.id)
        .then((response) => {
            console.log(response.data.data.alumni);
            this.editMode = true;
            this.form.fill(response.data.data.alumni);
            this.form.old_password = response.data.data.alumni.password;
            this.form.password = '';
            this.imagePreview = response.data.data.alumni.profile_image;
        })
        .catch((e) => {
            console.log(e);
        });
    },

    methods: {
        getEmails() {
            if (Number(this.form.personal_email.length) > 0) {
                // this.emails.push(this.form.personal_email);
                this.emails[0] = this.form.personal_email;
            } else {
                this.emails[0] = null;
            }

            if (Number(this.form.university_email.length) > 0) {
                // this.emails.push(this.form.university_email);
                this.emails[1] = this.form.university_email;
            } else {
                this.emails[1] = null;
            }

            if (Number(this.form.company_email.length) > 0) {
                // this.emails.push(this.form.company_email);
                this.emails[2] = this.form.company_email;
            } else {
                this.emails[2] = null;
            }
        },

        // check authenticate or not
        checkAuthenticateOrNot() {
            axios.post('https://api.ewubd.edu/users/authenticate', {
                "username": "Perky_Rabbit",
                "password" : "aR-YER=7$V@R7yt"
            })
                .then((response) => {
                    this.getDependentData(response.data.token);
                    this.getSemesters(response.data.token);
                })
                .catch((e) => {
                    this.$notify({ type: "error", title: "Error", text: 'You are not authenticate' });
                });
        },

        getDependentData(authenticateToken) {
            axios.get('https://api.ewubd.edu/student/getacademicdepartment', {
                headers: {
                    'Authorization': `Bearer ${authenticateToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.departments = response.data;
            })
            .catch((e) => {
                this.$Progress.fail();
            });
        },

        getSemesters(authenticateToken) {
            axios.get('https://api.ewubd.edu/student/getsemester', {
                headers: {
                    'Authorization': `Bearer ${authenticateToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.semesters = response.data;
                console.log(response.data)
            })
            .catch((e) => {
                this.$Progress.fail();
            });
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
            console.log(this.form)
            this.$Progress.start();
            this.form.busy = true;
            this.form.post(`${this.backendUrl}alumni`, {
                params: {
                    valueFrom: 'alumni_create',
                },
            })
            .then((response) => {
                if (this.form.successful) {
                    this.$Progress.finish();
                    this.$notify({ type: "success", title: "Success", text: response.data.message });
                    this.form.reset()
                    $('#file').val('')
                    this.imagePreview = ''
                    this.$router.push({name: 'app.alumni_all'})
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

        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.put(`${this.backendUrl}alumni/` + this.form.id, {
                params: {
                    valueFrom: 'alumni_update',
                },
            })
            .then((response) => {
                if (!response.data.data.wrongCurrentPassword) {
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$notify({ type: "success", title: "Success", text: response.data.message });
                        this.form.reset()
                        $('#file').val('')
                        this.imagePreview = ''
                        this.$router.push({name: 'app.alumni_all'})
                    } else {
                        this.$Progress.fail();
                        this.$notify({type: "error", title: "Error", text: "Something went wrong try again later"});
                    }
                } else {
                    this.$Progress.fail();
                    this.$notify({type: "warn", title: "Warning", text: response.data.data.wrongCurrentPassword});
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

<style>

</style>