<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-6">
                        <h4 class="card-title">List of Backups</h4>
                        <span>
                            This is an backup and Restore related information
                        </span>
                    </div>
                    <div class="row col-md-6">
                        <div class="col-md-4">
<!--                            <button type="button" @click="create" class="btn btn-sm btn-primary"> <i class="fas fa-cloud-upload-alt"></i> Restore Database</button>-->
                        </div>
                        <div class="col-md-4">
                            <button type="button" @click="runBackupFiles" class="btn btn-sm btn-success"> <i class="fas fa-file-download"></i> Backup Files & Database</button>
                        </div>
                        <div class="col-md-4">
                            <button type="button" @click="runBackupDB" class="btn btn-sm btn-success"> <i class="fas fa-cloud-download-alt"></i> Backup Database</button>
                        </div>
                    </div>
                </div>

                <div class="card-body">

                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-2" style="margin: auto 0;">
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

                                <div class="col-md-3" style="margin: auto 0;">
                                    <span>entries</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                        <tr class="text-center align-middle">
                            <th>S.No</th>
                            <th>Backups</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of backups" class="text-center align-middle">
                            <td style="width: 10%;">{{ index+1 }}</td>
                            <td style="width: 45%;">{{ item.file_name }} - ({{ item.file_size }})</td>
                            <td style="width: 20%;" >{{ getFileType(item.file_size) }}</td>
                            <td class="text-center align-middle" style="width: 25%;">
                                <button type="button" @click="backupDownload(item.file_name)"  class="btn btn-sm btn-success" > <i class="fas fa-download"></i> Download</button>
                                <button type="button" @click="deleteBackup(item.file_name)"  class="btn btn-sm btn-danger" > <i class="fas fa-trash"></i> Delete</button>
                            </td>
                        </tr>

                        <tr v-show="!backups.length">
                            <td colspan="6">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="backups.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="backups.length">
                            Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                        </div>

                        <PaginationComponent
                                :links = 'links'
                                @get-data="getData"
                        />
                    </div>

                </div>
            </div>
            <!-- Create and Edit Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Restore</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="restoreDatabase()" @keydown="form.onKeydown($event)" enctype="multipart/form-data">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>

                                <AlertError :form="form" message="There were some problems with your input." />

                                <div class="modal-body row">
                                    <div class="col-xl-12">
                                        <div class="form-group my-2">
                                            <label>SQL File</label>
                                            <input :disabled="form.busy" type="file" name="file" class="form-control" @change="onDocumentChange">
                                            <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
                                            <HasError :form="form" field="file" />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button v-if="disable==true" :disabled="form.busy" type="submit" class="btn btn-primary"> {{ 'Submit' }}</button>
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
    import axios from 'axios';
    import Form from 'vform';
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../../components/PaginationComponent.vue";

    export default {
        name: 'Backup',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,

                editMode: false,
                showMode: false,
                keyword: "",
                // fieldName: "title",
                perPage: 10,
                backups: [],
                sectionNames: [],
                pagination: [],
                links: [],
                backups:[],
                errorMessage: '',
                disable: false,

                form: new Form({
                    id: "",
                    file: "",
                }),
            };
        },

        watch: {
            keyword: function () {
                // this.getData();
            }
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                axios.get(`${this.backendUrl}backup-list`)
                    .then((response) => {
                        this.backups = response.data;
                        console.log(this.backups)
                    }).catch((e) => {
                    this.$Progress.fail();
                });
            },
            getFileType(fileSize) {
                const sizeInBytes = this.parseFileSize(fileSize);
                const sizeInMiB = sizeInBytes / (1024 * 1024);

                return sizeInMiB > 100 ? 'Storage Files' : 'DB Only';
            },
            parseFileSize(fileSize) {
                const [size, unit] = fileSize.split(" ");
                const sizeInBytes = parseFloat(size);

                if (unit === "KiB") {
                    return sizeInBytes * 1024;
                } else if (unit === "MiB") {
                    return sizeInBytes * 1024 * 1024;
                } else {
                    return sizeInBytes;
                }
            },

            runBackupDB(){
                this.$Progress.start()
                axios.post(`${this.backendUrl}run-backup`)
                    .then(response => {
                        this.$Progress.finish()
                        // this.$notify({ type: "success", title: "Success", text: "Database Backup created Successfully" });
                        this.$notify({ type: "success", title: "Success", text: "Database Backup job dispatched to the queue." });
                        this.getData();
                    })
                    .catch(error => {
                        console.error(error);
                        alert('An error occurred while creating the backup.');
                    });
            },

            runBackupFiles(){
                this.$Progress.start()
                axios.post(`${this.backendUrl}run-backup-files`)
                    .then(response => {
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: "Storage Backup job dispatched to the queue." });
                        this.getData();
                    })
                    .catch(error => {
                        console.error(error);
                        alert('An error occurred while creating the backup.');
                    });
            },

            backupDownload(file_name){
                axios({
                    url: `${this.backendUrl}backup-download/`+file_name,
                    method: 'GET',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file_name);
                    document.body.appendChild(link);
                    link.click();
                });
            },

            deleteBackup(file_name){
                axios.post(`${this.backendUrl}delete-backup/`+file_name)
                    .then(response => {
                        this.$notify({ type: "success", title: "Success", text: "Backup Deleted Successfully" });
                        this.getData();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            create(){
                $("#exampleModal").modal("show");
            },

            onDocumentChange(e) {
                let file = e.target.files[0];
                console.log(file)
                //check the file extention with error message
                const allowedExtensions = ['sql'];
                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    this.errorMessage = 'The file must be a sql (testdb.sql) file.';
                    // Clear the file input
                    this.form.file = '';
                    this.disable = false
                } else {
                    this.errorMessage = '';
                    this.form.file = e.target.files[0];
                    this.disable = true

                    /*let reader = new FileReader();
                    reader.onloadend = (e) => {
                        this.form.file = reader.result;
                        this.disable = true
                    }
                    reader.readAsDataURL(file);*/
                }
            },

            restoreDatabase(){
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}restore-database`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            console.log(response)
                            this.$notify({ type: "success", title: "Success", text: "Database Restored" });
                        }else{
                            this.$Progress.fail()
                            this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
                        }
                    })
                    .catch(e => {
                        this.$Progress.fail()
                        console.log(e)
                    })
            }
        }
    }
</script>
