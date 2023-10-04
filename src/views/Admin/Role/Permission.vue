<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Permission {{ editMode ? 'Update' : 'Create' }}</h4>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'app.role' }" type="button" class="btn btn-sm btn-success float-end">
                                <i class="fas fa-left-arrow"></i> All Roles
                            </router-link>
                        </div>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="editMode ? update() : store()">
                            <div v-if="form.progress" class="text-center">
                                Progress: {{ form.progress.percentage }}%
                            </div>

                            <AlertError :form="form" message="There were some problems with your input." />

                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="card">
                                        <div class="card-header bg-success fw-medium">Menu Information</div>
                                        <div class="card-body">
                                            <div class="mb-4" v-for="(item,index) in menus">
                                                <h4 class="checkboxes">

<!--                                                    <input type="checkbox" :value="index">-->
                                                    <span><b>{{ item }}</b></span>
<!--                                                    <input type="checkbox" v-bind:id="'action-' + item.id" v-model="form.menu_id" :value="item.id">-->
<!--                                                    <span v-bind:for="'action-' + item.id"> {{ item.name }}</span>-->
<!--                                                    <label v-bind:for="'action-' + item.id">{{ item.name }}</label>-->
<!--                                                    <input type="checkbox" v-model="selectAll"  name="menu_id[]"  class="checkboxes"/>-->
<!--                                                    {{item.name}}-->
                                                </h4>
                                                <template v-for="action in menu_actions">
                                                    <h6 class="checkboxes" v-if="action.parent == item">
                                                        <!--                                                    {{action.parent}}-->
                                                        <input v-if="item == action.parent" type="checkbox" v-bind:id="'action-' + action.id" v-model="form.user_menu_action_id" :value="action.id">
                                                        <span v-if="item == action.parent">{{action.name}}</span>

                                                        <!--                                                    <input v-if="item.id == action.menu_id" type="checkbox" v-bind:id="'action-' + action.id" v-model="form.user_menu_action_id" :value="action.id">-->
                                                        <!--                                                    <span v-if="item.id == action.menu_id" v-bind:for="'action-' + action.id">{{action.menu_action.name}}</span>-->
                                                        <!--                                                    <label v-if="item.id == action.menu_id" v-bind:for="'action-' + action.id">{{ action.menu_action.name }}</label>-->
                                                        <!--                                                    <input v-if="item.id == action.menu_id" type="checkbox" name="menu_action_id[]" v-model="checkedItems" :value="item.id" class="checkboxes"/>-->
                                                        <!--                                                    <span v-if="item.id == action.menu_id">{{action.menu_action.name}}</span>-->
                                                    </h6>
                                                </template>

                                            </div>
                                        </div>

                                        <!-- end card body -->
                                    </div>
                                    <!-- end card -->
                                </div>
                                <!-- end col -->

                            </div>
                            <!-- end row -->

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
    import axios from 'axios';
    import Form from 'vform'
    import Editor from '@tinymce/tinymce-vue'
    import emitter from "../../../emitter/index.js";
    export default{
        name: 'Form',
        components: { Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                menus: [],
                menu_actions: [],
                selectAll: false,

                form: new Form({
                    id: "",
                    menu_id: [],
                    user_menu_action_id: [],
                    status: "",
                }),
            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            this.getData();
        },
        methods:{

            getData() {
                this.$Progress.start();
                axios.get(`${this.backendUrl}permission/all`)
                    .then((response) => {
                        this.menus = response.data.permission_groups;
                        this.menu_actions = response.data.permissions;
                        console.log(response)
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
                /*axios.get(`${this.backendUrl}menu`)
                    .then((response) => {
                        this.menus = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });*/

                //get menu actions
                /*axios.get(`${this.backendUrl}get/actions`)
                    .then((response) => {
                        this.menu_actions = response.data;
                    }).catch((e) => { this.$Progress.fail();});*/

                //get role-permissions
                axios.get(`${this.backendUrl}role-permission/`+this.$route.query.roleId)
                    .then((response) => {
                        console.log(response.data.assigned_permissions)
                        this.form.user_menu_action_id = response.data.assigned_permissions;
                        /*this.form.menu_id = response.data.menu_permission;
                        this.form.user_menu_action_id = response.data.menu_action_permission;*/
                    }).catch((e) => { this.$Progress.fail();});
            },

            store() {
                this.$Progress.start();
                this.form.busy = true;
                this.form.post(`${this.backendUrl}role-permission/`+this.$route.query.roleId)
                    .then((response) => {
                        console.log(response);
                        if (this.form.successful) {
                            this.$Progress.finish();
                            this.$notify({
                                type: "success",
                                title: "Success",
                                text: "Permission Added Successfully",
                            });
                            emitter.emit("toggle-sidebar");
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

            /*toggleAllCheckboxes() {
                if (this.selectAll) {
                    this.checkedItems = this.menus.map((item) => item.id);
                    this.checkedActionItems = this.menu_actions.map((action) => action.id);
                } else {
                    this.checkedItems = [];
                    this.checkedActionItems = [];
                }
            },*/

        }
    }

    import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap5'
</script>

<style>
    .checkboxes {
        display: flex;
        align-items: center;
        vertical-align: middle;
        word-wrap: break-word;
    }
</style>
