<template>
    <div id="view">
        <div class="row">
            <div class="col-lg-12">
                <div class="card mx-n4 mt-n4">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-12">
                            <h4 class="card-title mb-4">Newsletter Details</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store()">
                            <div class="col-md-6">
                                <div class="form-group my-2">
                                    <label>Type</label>
                                    <select v-model="form.type" class="form-control" name="type" id="" @change="typeChanged($event)">
                                        <option value="">Select Recipient Type</option>
                                        <option value="Individual">Individual</option>
                                        <option value="SystemAdmins">System Admins</option>
                                        <option value="SystemAlumnus">System Alumnis</option>
                                        <option value="SystemStudents">System Students</option>
                                        <option value="SystemCompanyHolders">System Company Holders</option>
                                        <option value="MailList">Mail List</option>
                                        <option value="ImportWithFile">Import With file (Xls)</option>
                                    </select>
                                </div>
                            </div>
                            <div  v-if="IndividualMode == true" class="col-md-6">
                                <div class="form-group my-2">
                                        <label>To</label>
                                        <Multiselect
                                                v-model="form.recipient_user_ids"
                                                mode="tags"
                                                placeholder="Select Recipient's"
                                                :close-on-select="false"
                                                :searchable="true"
                                                :create-option="false"
                                                :options="systemUsers"
                                        />
                                        <HasError :form="form" field="recipient_user_ids" />
                                    </div>
                            </div>

                            <!-- <div class="col-md-12 row"> -->
                                <!-- <div v-if="IndividualMode == true" class="col-md-6">
                                    <div class="form-group my-2">
                                        <label>To</label>
                                        <Multiselect
                                                v-model="form.recipient_user_ids"
                                                mode="tags"
                                                placeholder="Select Recipient's"
                                                :close-on-select="false"
                                                :searchable="true"
                                                :create-option="false"
                                                :options="systemUsers"
                                        />
                                        <HasError :form="form" field="recipient_user_ids" />
                                    </div>
                                </div> -->
                                <div class="row">
                                    
                                    <div v-if="SystemAlumnusMode == true" class="col-md-6">
                                        <div class="form-group my-2">
                                            <label>Sub Type</label>
                                        <select v-model="form.sub_type" class="form-control" name="sub_type" id="" @change="systeAlumniSubTypeChanged($event)">
                                            <option value="">Select One</option>
                                            <option value="CGPA">CGPA</option>
                                            <option value="Year">Year</option>
                                            <option value="Semester">Semester</option>
                                            <option value="Department">Department</option>
                                            <option value="Faculty">Faculty</option>
                                        </select>
                                        <HasError :form="form" field="mail_subject" />
                                    </div>
                                    </div>
                                    <div v-if="systemAlumnusSubTypeValueMode"  class="col-md-6 mt-4">
                                        <div class="form-group my-2">
                                        <input :type="input_type" step="0.1" v-model="form.sub_type_value" name="sub_type_value" class="form-control" :placeholder="placeholder">
                                        <HasError :form="form" field="sub_type_value" />
                                    </div>
                                    </div>
                                    <!-- <div v-if="systemAlumnusSubTypeYearMode"  class="col-md-6 mt-4">
                                        <div class="form-group my-2">
                                        <input type="text" v-model="form.mail_subject" name="mail_subject" class="form-control" placeholder="Enter Year">
                                        <HasError :form="form" field="mail_subject" />
                                    </div>
                                    </div>
                                    <div v-if="systemAlumnusSubTypeSemesterMode"  class="col-md-6 mt-4">
                                        <div class="form-group my-2">
                                        <input type="text" v-model="form.mail_subject" name="mail_subject" class="form-control" placeholder="Enter Semester">
                                        <HasError :form="form" field="mail_subject" />
                                    </div>
                                    </div>
                                    <div v-if="systemAlumnusSubTypeDepartmentMode"  class="col-md-6 mt-4">
                                        <div class="form-group my-2">
                                        <input type="text" v-model="form.mail_subject" name="mail_subject" class="form-control" placeholder="Enter Department">
                                        <HasError :form="form" field="mail_subject" />
                                    </div>
                                    </div>
                                    <div v-if="systemAlumnusSubTypeFacultyMode"  class="col-md-6 mt-4">
                                        <div class="form-group my-2">
                                        <input type="text" v-model="form.mail_subject" name="mail_subject" class="form-control" placeholder="Enter Faculty">
                                        <HasError :form="form" field="mail_subject" />
                                    </div>
                                    </div> -->
                                </div>
                                <div v-if="ImportWithFileMode == true" class="col-md-6 mt-4">
                                    <div class="form-group my-2">
                                        <label>Import Other Mail's(xls file)</label>
                                        <input  type="file" name="importedFileEmailList" class="form-control" @change="onChange">
                                        <HasError :form="form" field="importedFileEmailList" />
                                    </div>
                                </div>
                                <div v-if="MailListMode == true" class="col-md-6">
                                    <div class="form-group my-2">
                                        <label>Mail List</label>
                                        <select v-for="item in mailList" v-model="form.selected_mail_list_id" class="form-control" name="selected_mail_list_id">
                                            <option value="">Select One</option>
                                            <option :value="item.id">{{item.title}}</option>
                                        </select>
                                        <HasError :form="form" field="selected_mail_list_id" />
                                    </div>
                                </div>
                            <!-- </div> -->
                            <div class="col-md-12">
                                <div class="form-group my-2">
                                    <label>Subject</label>
                                    <input type="text" v-model="form.mail_subject" name="mail_subject" class="form-control" placeholder="Enter Mail Subject">
                                    <HasError :form="form" field="mail_subject" />
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Mail Body</label>
                                    <Editor
                                            name="mail_body"
                                            v-model="form.mail_body"
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
                                    <HasError :form="form" field="mail_body" />
                                </div>
                            </div>
                            <div class="form-group text-center my-5">
                                <button class="btn btn-primary btn-lg" type="submit">Send Mail</button>
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
    import Form from 'vform'
    import * as XLSX from "xlsx"
    import Editor from '@tinymce/tinymce-vue'
    import Multiselect from "@vueform/multiselect";
    import "@vueform/multiselect/themes/default.css";
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap5'
    import { useHead } from '@vueuse/head';

    export default {
        name: 'mailTemplate',
        components: {Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor, Multiselect },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                placeholder:"",
                input_type:"",
                IndividualMode:false,
                SystemAdminsMode:false,
                SystemAlumnusMode:false,
                systemAlumnusSubTypeMode:false,
                SystemStudentsMode:false,
                SystemCompanyHoldersMode:false,
                systemAlumnusSubTypeYearMode:false,
                systemAlumnusSubTypeSemesterMode:false,
                systemAlumnusSubTypeDepartmentMode:false,
                systemAlumnusSubTypeFacultyMode:false,
                systemAlumnusSubTypeValueMode:false,
                ImportWithFileMode:false,
                MailListMode:false,
                systemUsers: [],
                mailList: [],
                form:new Form({
                    type: "",
                    sub_type: "",
                    sub_type_value: "",
                    selected_mail_list_id: "",
                    recipient_user_ids: [],
                    importedFileEmailList: [],
                    importedFile: "",
                    mail_subject: "",
                    mail_body: "",
                }),
          
            };
        },

        mounted() {
            useHead({title: 'Newsletter | EWU'});
            this.getData();
        },

        methods:{
            getData() {
                axios.get(`${this.backendUrl}system/users`)
                    .then((response) => {
                        let data =  response.data.map((item) => {
                            return { value: item.id, label: item.name+' - ('+item.email+')' }
                        })
                        this.systemUsers = data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
                axios.get(`${this.backendUrl}create-mail-list`)
                    .then((response) => {
                        this.mailList = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            typeChanged(event){
                if (event.target.value == 'Individual'){
                    this.IndividualMode = true;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = false;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = false;
                    this.MailListMode = false;
                } else if (event.target.value == 'SystemAdmins'){
                    this.IndividualMode = false;
                    this.SystemAdminsMode = true;
                    this.SystemAlumnusMode = false;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = false;
                    this.MailListMode = false;
                } else if (event.target.value == 'SystemAlumnus'){
                    this.IndividualMode = false;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = true;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = false;
                    this.MailListMode = false;
                } else if (event.target.value == 'SystemStudents'){
                    this.IndividualMode = false;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = true;
                    this.SystemStudentsMode = true;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = false;
                    this.MailListMode = false;
                } else if (event.target.value == 'SystemCompanyHolders'){
                    this.IndividualMode = false;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = false;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = true;
                    this.ImportWithFileMode = false;
                    this.MailListMode = false;
                } else if (event.target.value == 'ImportWithFile'){
                    this.IndividualMode = false;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = false;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = true;
                    this.MailListMode = false;
                }else if (event.target.value == 'MailList'){
                    this.IndividualMode = false;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = false;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = false;
                    this.MailListMode = true;
                }else{
                    this.IndividualMode = false;
                    this.SystemAdminsMode = false;
                    this.SystemAlumnusMode = false;
                    this.SystemStudentsMode = false;
                    this.SystemCompanyHoldersMode = false;
                    this.ImportWithFileMode = false;
                    this.MailListMode = false;
                }
            },
            systeAlumniSubTypeChanged(event) {
                this.SystemAlumnusMode = true;
                if (event.target.value == 'Year'){
                    this.placeholder = "Enter year";
                    this.input_type = "number";
                    // this.systemAlumnusSubTypeYearMode = true;
                    // this.systemAlumnusSubTypeSemesterMode = false;
                    // this.systemAlumnusSubTypeDepartmentMode = false;
                    // this.systemAlumnusSubTypeFacultyMode = false;
                    this.systemAlumnusSubTypeValueMode = true;
                  
                } else if (event.target.value == 'Semester'){
                    this.placeholder = "Enter Semester";
                    this.input_type = "text";
                    // this.systemAlumnusSubTypeYearMode = false;
                    // this.systemAlumnusSubTypeSemesterMode = true;
                    // this.systemAlumnusSubTypeDepartmentMode = false;
                    // this.systemAlumnusSubTypeFacultyMode = false;
                    this.systemAlumnusSubTypeValueMode = true;
                }
                else if (event.target.value == 'Department'){
                    this.placeholder = "Enter department";
                    this.input_type = "text";
                    // this.systemAlumnusSubTypeYearMode = false;
                    // this.systemAlumnusSubTypeSemesterMode = false;
                    // this.systemAlumnusSubTypeDepartmentMode = true;
                    // this.systemAlumnusSubTypeFacultyMode = false;
                    this.systemAlumnusSubTypeValueMode = true;

                }
                else if (event.target.value == 'Faculty'){
                    this.placeholder = "Enter faculty";
                    this.input_type = "text";
                    // this.systemAlumnusSubTypeYearMode = false;
                    // this.systemAlumnusSubTypeSemesterMode = false;
                    // this.systemAlumnusSubTypeDepartmentMode = false;
                    // this.systemAlumnusSubTypeFacultyMode = true;
                    this.systemAlumnusSubTypeValueMode = true;
                }
                else if (event.target.value == 'CGPA'){
                    this.placeholder = "Enter CGPA";
                    this.input_type = "number";
                    // this.systemAlumnusSubTypeYearMode = false;
                    // this.systemAlumnusSubTypeSemesterMode = false;
                    // this.systemAlumnusSubTypeDepartmentMode = false;
                    // this.systemAlumnusSubTypeFacultyMode = false;
                    this.systemAlumnusSubTypeValueMode = true;
                }
            },

            onChange(event) {
                this.onMailListFileChange(event);

                this.file = event.target.files ? event.target.files[0] : null;
                if (this.file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        /* Parse data */
                        const bstr = e.target.result;
                        const wb = XLSX.read(bstr, { type: 'binary' });
                        /* Get first worksheet */
                        const wsname = wb.SheetNames[0];
                        const ws = wb.Sheets[wsname];
                        /* Convert array of arrays */
                        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
                        let emailColumnIndex = -1;
                        const headerRow = jsonData[0];
                        for (let i = 0; i < headerRow.length; i++) {
                            const headerCell = headerRow[i].toString().toLowerCase();
                            if (headerCell.includes('email')) {
                                emailColumnIndex = i;
                                break;
                            }
                        }
                        if (emailColumnIndex === -1) {
                            console.error('Email column not found');
                            return;
                        }
                        const emailColumn = jsonData.map(row => row[emailColumnIndex]).filter(email => email);
                        emailColumn.shift()
                        this.form.importedFileEmailList = emailColumn
                    }

                    reader.readAsBinaryString(this.file);
                }
            },

            onMailListFileChange(e) {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (e) => {
                    // this.mailListFilePreview = reader.result;
                    this.form.importedFile = reader.result;
                }
                reader.readAsDataURL(file);

                if (file) {
                    this.disabled = true;
                }
            },

            store(){
                this.$Progress.start();
                this.form.busy = true;
                this.form.post(`${this.backendUrl}newsletter_mail`)
                    .then((response) => {
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Email Send Successfully" });
                            this.form.clear()
                            this.$router.push({ path: '/newsletter-mail-list' })
                        } else{
                            this.$Progress.fail()
                            this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
                        }
                    })
                    .catch((e) => {
                        this.$Progress.fail();
                        console.log(e);
                    });
            },
        },

    }
</script>










