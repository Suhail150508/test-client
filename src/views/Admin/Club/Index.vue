<template>
    <div id="product">
        <div class="col-12">
            <div class="card">
                <div class="row card-header bg-transparent border-bottom">
                    <div class="col-md-8">
                        <h4 class="card-title">List Of Club</h4>
                        <span>
                            This is an Club related information about Alumni and Student
                        </span>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{ name: 'app.club_add' }" class="btn btn-sm btn-success float-end">
                            <i class="fas fa-plus"></i>Add Club
                        </router-link>
<!--                        <button type="button" @click="create"  class="btn btn-sm btn-success float-end" > <i class="fas fa-plus"></i>Add Club</button>-->
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

                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-2" style="margin: auto;">
                                    <strong>Search By :</strong>
                                </div>

                                <div class="col-md-3">
                                    <select v-model="fieldName" id="fields" class="form-select form-select-sm">
                                        <option value="title">Title</option>
                                        <option value="description">Description</option>
                                    </select>
                                </div>

                                <div class="col-md-7">
                                    <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered dt-responsive  nowrap w-100">
                        <thead>
                        <tr>
                            <th style="width: 5%;">Serial No</th>
                            <th>Header Logo</th>
                            <th>Main Logo</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>


                        <tbody>
                        <tr v-for="(item, index) of clubs">
                            <td class="text-center">{{ index+1 }}</td>
                            <td class="text-center">
                                <img width="80" height="40" :src="item.header_logo" :alt="item.id">
                            </td>
                            <td class="text-center">
                                <img width="80" height="40" :src="item.image" :alt="item.id">
                            </td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.status }}</td>
                            <td>
                                <!--<router-link :to="{ path: '/club-view/'+item.short_name}" class="btn btn-info btn-sm" >
                                    <i class="fas fa-eye"></i>
                                </router-link>-->
                                <router-link :to="{ name: 'app.club_view', query:{clubViewId: item.id}}" class="btn btn-info btn-sm" >
                                    <i class="fas fa-eye"></i>
                                </router-link>
                                <!--<button type="button" @click="show(item)" class="btn btn-info btn-sm">
                                    <i class="fas fa-eye"></i>
                                </button>-->

                                <!--<button type="button" @click="edit(item)" class="btn btn-primary btn-sm" >
                                    <i class="fas fa-edit"></i>
                                </button>-->

                                <router-link :to="{ name: 'app.club_add', query:{clubEditId: item.id}}" class="btn btn-primary btn-sm" >
                                    <i class="fas fa-edit"></i>
                                </router-link>

                                <!--<router-link :to="{ name: 'app.club_add', query:{clubEditId: item.id}}" @click="show(item)" class="btn btn-warning btn-sm" >
                                    <i class="fas fa-plus"></i>
                                </router-link>-->

                                <button type="button" @click="show(item)" class="btn btn-warning btn-sm" >
                                    <i class="fas fa-plus"></i>
                                </button>

                                <button type="button" @click="destroy(item.id)" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-show="!clubs.length">
                            <td colspan="6">
                                <div class="alert alert-danger text-danger text-center" role="alert">
                                    No data available in table :(
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="clubs.length" class="d-flex">
                        <div class="col-md-4 pl-0" style="margin: auto;" v-if="clubs.length">
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
            <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-success">
                            <h5 class="modal-title text-light" id="exampleModalLabel">Add Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>

                        <!--tabs-->
                        <ul class="nav nav-pills mb-3 row m-5" id="club-details-tab" role="tablist">
                            <li class="nav-item col-md-3" role="presentation">
                                <button class="nav-link form-control bg-success fw-bolder text-uppercase active" id="club-media-tab" data-bs-toggle="pill" data-bs-target="#club-media" type="button" role="tab" aria-controls="club-media" aria-selected="true">Media</button>
                            </li>
                            <li class="nav-item col-md-3" role="presentation">
                                <button class="nav-link form-control bg-success fw-bolder text-uppercase" id="club-leaders-tab" data-bs-toggle="pill" data-bs-target="#club-leaders" type="button" role="tab" aria-controls="club-leaders" aria-selected="false">Moderators</button>
                            </li>
                            <li class="nav-item col-md-3" role="presentation">
                                <button class="nav-link form-control bg-success fw-bolder text-uppercase" id="club-committee-tab" data-bs-toggle="pill" data-bs-target="#club-committee" type="button" role="tab" aria-controls="club-committee" aria-selected="false">Committee</button>
                            </li>
                            <li class="nav-item col-md-3" role="presentation">
                                <button class="nav-link form-control bg-success fw-bolder text-uppercase" id="club-gallery-tab" data-bs-toggle="pill" data-bs-target="#club-gallery" type="button" role="tab" aria-controls="club-gallery" aria-selected="false">Gallery</button>
                            </li>
                        </ul>

                        <!--tab contents-->
                        <div class="tab-content" id="club-details-tabContent">
                            <div class="tab-pane fade show active" id="club-media" role="tabpanel" aria-labelledby="club-media-tab">
                                <div class="modal-body">
                                    <form @submit.prevent="mediaStore()" >
                                        <div v-if="media_form.progress" class="text-center">Progress: {{ media_form.progress.percentage }}%</div>

                                        <AlertError :form="media_form" message="There were some problems with your input." />

                                        <div class="modal-body row">
                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Media Type</label>
                                                    <select v-model="media_form.type" class="form-control" name="type" @change="typeChanged($event)">
                                                        <option value="">Select One</option>
                                                        <option value="news">News</option>
                                                        <option value="events">Events</option>
                                                        <option value="notice">Notice</option>
                                                    </select>
                                                    <HasError :form="media_form" field="type" />
                                                </div>
                                            </div>

                                            <input type="hidden" v-model="media_form.club_id" name="club_id">

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Title</label>
                                                    <input v-model="media_form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                                    <HasError :form="media_form" field="title" />
                                                </div>
                                            </div>

                                            <div class="col-md-4 my-2">
                                                <div class="mb-3">
                                                    <h3 class="card-title">Main Image</h3>
                                                    <input type="file" name="media_main_image" class="form-control" @change="onImageMediaChange" />
                                                    <HasError :form="media_form" field="media_main_image" />
                                                </div>
                                            </div>
                                            <div class="col-md-2 my-2">
                                                <div class="mb-3">
                                                    <img class="mt-1" :src="onImageMediaPreview" style="width: 80px;" alt="" />
                                                </div>
                                            </div>

                                            <div v-if="eventsMode == true" class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Date From</label>
                                                    <input v-model="media_form.date_from" type="date" name="date_from" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="media_form" field="date_from" />
                                                </div>
                                            </div>

                                            <div v-if="eventsMode == true" class="col-md-6">
                                                <div  class="form-group my-2">
                                                    <label>Date To</label>
                                                    <input v-model="media_form.date_to" type="date" name="date_to" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="media_form" field="date_to" />
                                                </div>
                                            </div>

                                            <div v-if="noticeMode == true" class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Notice Date</label>
                                                    <input v-model="media_form.notice_date" type="date" name="notice_date" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="media_form" field="notice_date" />
                                                </div>
                                            </div>

                                            <div v-if="newsMode == true" class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>News Date</label>
                                                    <input v-model="media_form.news_date" type="date" name="news_date" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="media_form" field="news_date" />
                                                </div>
                                            </div>

                                            <div class="col-md-6 my-2">
                                                <div class="form-group">
                                                    <label>Status</label>
                                                    <select v-model="media_form.status" class="form-control" name="status">
                                                        <option value="">Select One</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <HasError :form="media_form" field="status" />
                                                </div>
                                            </div>

                                            <div class="col-md-12 my-2">
                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <Editor
                                                            v-model="media_form.description" name="description" :readonly="showMode==true ? true : false"
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
                                                    <!--                                            <textarea v-model="media_form.description" rows="3" cols="50" name="description" :readonly="showMode==true ? true : false" class="form-control" placeholder="Enter description here..."></textarea>-->
                                                    <HasError :form="media_form" field="description" />
                                                </div>
                                            </div>

                                            <div v-if="eventsMode == true" class="col-xl-12 my-2">
                                                <div data-repeater-list="group-a">
                                                    <div data-repeater-item class="row">
                                                        <div class="form-floating col-md-12 mb-3">
                                                            <textarea v-model="media_form.c_address" name="c_address" class="form-control" rows="3" placeholder="Enter Your Message"></textarea>
                                                            <label> Address </label>
                                                            <HasError :form="media_form" field="c_address" />
                                                        </div>
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="media_form.c_phone" name="c_phone" type="text" class="form-control"  placeholder="Enter Phone">
                                                            <label> Phone</label>
                                                            <HasError :form="media_form" field="c_phone" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-floating mb-3">
                                                                <input v-model="media_form.c_email" name="c_email" type="email" class="form-control" placeholder="Enter Email address">
                                                                <label>Email address</label>
                                                                <HasError :form="media_form" field="c_email" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                            </div>

                                            <!--<div class="col-xl-4">
                                                <div class="card">
                                                    <div class="card-header bg-transparent border-bottom text-uppercase">
                                                        <h4 class="card-title">Main Logo</h4>
                                                        <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                            <a class="" data-bs-toggle="collapse" href="#collapseFeaturedImage" role="button" aria-expanded="false" aria-controls="collapseFeaturedImage">
                                                                <i class="fas fa-align-justify"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="card-body collapse" id="collapseFeaturedImage">
                                                        <input type="file" name="image" id="file" class="form-control form-control-file border" @change="onImageChange" />
                                                        <HasError :form="form" field="image" />
                                                        <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header bg-transparent border-bottom text-uppercase">
                                                        <h4 class="card-title">Header Logo</h4>
                                                        <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                            <a class="" data-bs-toggle="collapse" href="#collapseHeaderLogo" role="button" aria-expanded="false" aria-controls="collapseHeaderLogo">
                                                                <i class="fas fa-align-justify"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="card-body collapse" id="collapseHeaderLogo">
                                                        <input type="file" name="header_logo" class="form-control form-control-file border" @change="onHeaderLogoChange" />
                                                        <HasError :form="form" field="header_logo" />
                                                        <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                                    </div>
                                                </div>
                                            </div>-->
                                        </div>
                                        <div class="modal-footer">
                                            <button v-if="showMode==false" :disabled="media_form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="club-leaders" role="tabpanel" aria-labelledby="club-leaders-tab">
                                <div class="modal-body">
                                    <form @submit.prevent="moderatorStore()" >
                                        <div v-if="moderator_form.progress" class="text-center">Progress: {{ moderator_form.progress.percentage }}%</div>

                                        <AlertError :form="moderator_form" message="There were some problems with your input." />

                                        <div class="modal-body row">
                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Moderator Type</label>
                                                    <select v-model="moderator_form.type" class="form-control" name="type" >
                                                        <option value="">Select One</option>
                                                        <option value="previous">Previous Moderator</option>
                                                        <option value="present">Present Moderator</option>
                                                    </select>
                                                    <HasError :form="moderator_form" field="type" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Department</label>
                                                    <select v-model="moderator_form.department_id" class="form-control" name="department_id">
                                                        <option value="">Select One</option>
                                                        <option v-for="(department, index) in departments" :value="department.id">
                                                            {{department.title}}({{department.department_code}})</option>
                                                    </select>
                                                    <HasError :form="moderator_form" field="type" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Designation</label>
                                                    <select v-model="moderator_form.designation_id" class="form-control" name="designation_id" >
                                                        <option value="">Select One</option>
                                                        <option v-for="(designation, index) in designations" :value="designation.id">{{designation.name}}</option>
                                                    </select>
                                                    <HasError :form="moderator_form" field="type" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Name</label>
                                                    <input v-model="moderator_form.name" type="text" name="name" class="form-control" placeholder="Name">
                                                    <HasError :form="moderator_form" field="name" />
                                                </div>
                                            </div>

                                            <div class="col-md-4 my-2">
                                                <div class="mb-3">
                                                    <h3 class="card-title">Upload Photo</h3>
                                                    <input type="file" name="moderator_image" class="form-control" @change="onImageModeratorChange" />
                                                    <HasError :form="moderator_form" field="main_logo" />
                                                </div>
                                            </div>
                                            <div class="col-md-2 my-2">
                                                <div class="mb-3">
                                                    <img class="mt-1" :src="onImageModeratorPreview" style="width: 80px;" alt="" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Year From</label>
                                                    <input v-model="moderator_form.year_from" type="date" name="year_from" class="form-control">
                                                    <HasError :form="moderator_form" field="year_from" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Year To</label>
                                                    <input v-model="moderator_form.year_to" type="date" name="year_to" class="form-control">
                                                    <HasError :form="moderator_form" field="year_to" />
                                                </div>
                                            </div>

                                            <div class="col-md-6 my-2">
                                                <div class="form-group">
                                                    <label>Status</label>
                                                    <select v-model="moderator_form.status" class="form-control" name="status">
                                                        <option value="">Select One</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <HasError :form="moderator_form" field="status" />
                                                </div>
                                            </div>

                                            <!--<div class="col-xl-4">
                                                <div class="card">
                                                    <div class="card-header bg-transparent border-bottom text-uppercase">
                                                        <h4 class="card-title">Main Logo</h4>
                                                        <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                            <a class="" data-bs-toggle="collapse" href="#collapseFeaturedImage" role="button" aria-expanded="false" aria-controls="collapseFeaturedImage">
                                                                <i class="fas fa-align-justify"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="card-body collapse" id="collapseFeaturedImage">
                                                        <input type="file" name="image" id="file" class="form-control form-control-file border" @change="onImageChange" />
                                                        <HasError :form="form" field="image" />
                                                        <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header bg-transparent border-bottom text-uppercase">
                                                        <h4 class="card-title">Header Logo</h4>
                                                        <div class="card-tools" style="position: absolute; right: 1rem; top: 0.5rem">
                                                            <a class="" data-bs-toggle="collapse" href="#collapseHeaderLogo" role="button" aria-expanded="false" aria-controls="collapseHeaderLogo">
                                                                <i class="fas fa-align-justify"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="card-body collapse" id="collapseHeaderLogo">
                                                        <input type="file" name="header_logo" class="form-control form-control-file border" @change="onHeaderLogoChange" />
                                                        <HasError :form="form" field="header_logo" />
                                                        <img class="mt-1" :src="imagePreview" style="width: 100px;" alt="" />
                                                    </div>
                                                </div>
                                            </div>-->
                                        </div>
                                        <div class="modal-footer">
                                            <button v-if="showMode==false" :disabled="moderator_form.busy" type="submit" class="btn btn-primary">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="club-committee" role="tabpanel" aria-labelledby="club-committee-tab">
                                <div class="modal-body">
                                    <form @submit.prevent="committeeStore()" >
                                        <div v-if="committee_form.progress" class="text-center">Progress: {{ committee_form.progress.percentage }}%</div>

                                        <AlertError :form="committee_form" message="There were some problems with your input." />

                                        <div class="modal-body row">
                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Committee Type</label>
                                                    <select v-if="showMode==false" v-model="committee_form.type" class="form-control" name="type" >
                                                        <option value="">Select One</option>
                                                        <option value="previous">Previous Committee</option>
                                                        <option value="present">Present Committee</option>
                                                    </select>
                                                    <HasError :form="committee_form" field="type" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Department</label>
                                                    <select v-model="committee_form.department_id" class="form-control" name="department_id" :disabled="showMode==true ? true : false">
                                                        <option value="">Select One</option>
                                                        <option v-for="(department, index) in departments" :value="department.id">
                                                            {{department.title}}({{department.department_code}})</option>
                                                    </select>
                                                    <HasError :form="committee_form" field="department_id" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Designation</label>
                                                    <select v-model="committee_form.designation_id" class="form-control" name="designation_id" :disabled="showMode==true ? true : false">
                                                        <option value="">Select One</option>
                                                        <option v-for="(designation, index) in designations" :value="designation.id">{{designation.name}}</option>
                                                    </select>
                                                    <HasError :form="committee_form" field="designation_id" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Name</label>
                                                    <input v-model="committee_form.name" type="text" name="name" class="form-control" placeholder="Name" :readonly="showMode==true ? true : false">
                                                    <HasError :form="committee_form" field="name" />
                                                </div>
                                            </div>

                                            <div class="col-md-4 my-2">
                                                <div class="mb-3">
                                                    <h3 class="card-title">Committee Photo</h3>
                                                    <input v-if="showMode==false" type="file" name="committee_image" class="form-control" @change="onImageCommitteeChange" />
                                                    <HasError :form="committee_form" field="committee_image"/>
                                                </div>
                                            </div>
                                            <div class="col-md-2 my-2">
                                                <div class="mb-3">
                                                    <img class="mt-1" :src="onImageCommitteePreview" style="width: 80px;" alt="" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Date From</label>
                                                    <input v-model="committee_form.date_from" type="date" name="date_from" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="committee_form" field="date_from" />
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Date To</label>
                                                    <input v-model="committee_form.date_to" type="date" name="date_to" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="committee_form" field="date_to" />
                                                </div>
                                            </div>

                                            <div class="col-md-6 my-2">
                                                <div class="form-group">
                                                    <label>Status</label>
                                                    <select v-if="showMode==false" v-model="committee_form.status" class="form-control" name="status">
                                                        <option value="">Select One</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <input v-if="showMode==true" v-model="committee_form.status" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="committee_form" field="status" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button v-if="showMode==false" :disabled="committee_form.busy" type="submit" class="btn btn-primary"> {{ 'Create' }}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="club-gallery" role="tabpanel" aria-labelledby="club-gallery-tab">
                                <div class="modal-body">
                                    <form @submit.prevent="galleryStore()" >
                                        <div v-if="committee_form.progress" class="text-center">Progress: {{ gallery_form.progress.percentage }}%</div>

                                        <AlertError :form="gallery_form" message="There were some problems with your input." />

                                        <div class="modal-body row">

                                            <div class="col-md-6">
                                                <div class="form-group my-2">
                                                    <label>Title</label>
                                                    <input v-model="gallery_form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                                    <HasError :form="gallery_form" field="title" />
                                                </div>
                                            </div>

                                            <div class="col-md-4 my-2">
                                                <div class="mb-3">
                                                    <h3 class="card-title">Gallery Photo</h3>
                                                    <input v-if="showMode==false" type="file" name="club_gallery_image" class="form-control" @change="onImageGalleryChange" />
                                                    <HasError :form="gallery_form" field="club_gallery_image"/>
                                                </div>
                                            </div>
                                            <div class="col-md-2 my-2">
                                                <div class="mb-3">
                                                    <img class="mt-1" :src="onImageGalleryPreview" style="width: 80px;" alt="" />
                                                </div>
                                            </div>

                                            <div class="col-md-6 my-2">
                                                <div class="form-group">
                                                    <label>Status</label>
                                                    <select v-if="showMode==false" v-model="gallery_form.status" class="form-control" name="status">
                                                        <option value="">Select One</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <input v-if="showMode==true" v-model="gallery_form.status" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                    <HasError :form="gallery_form" field="status" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button v-if="showMode==false" :disabled="gallery_form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                        </div>
                                    </form>
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
    import axios from 'axios';
    import { useHead } from '@vueuse/head';
    import Form from 'vform';
    import Editor from '@tinymce/tinymce-vue'
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess} from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";

    export default {
        name: 'clubIndex',
        components: { PaginationComponent, Button, HasError, AlertError, AlertErrors, AlertSuccess, Editor },

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                editMode: false,
                showMode: false,
                newsMode: false,
                eventsMode: false,
                noticeMode: false,
                keyword: "",
                fieldName: "title",
                perPage: 10,
                clubs: [],
                pagination: [],
                links: [],

                departments:[],
                designations:[],
                onImageModeratorPreview:[],
                onImageCommitteePreview:"",
                onImageGalleryPreview:"",

                media_form: new Form({
                    id: "",
                    club_id: "",
                    type: "",
                    title: "",
                    date_from: "",
                    date_to: "",
                    notice_date: "",
                    news_date: "",
                    media_main_image: "",
                    status: "",
                    description: "",
                    c_address: "",
                    c_phone: "",
                    c_email: "",
                }),

                moderator_form: new Form({
                    id: "",
                    club_id: "",
                    type: "",
                    department_id: "",
                    designation_id: "",
                    name: "",
                    year_from: "",
                    year_to: "",
                    status: "",
                    moderator_image: "",
                }),

                committee_form: new Form({
                    id: "",
                    club_id: "",
                    type: "",
                    department_id: "",
                    designation_id: "",
                    name: "",
                    club_designation: "",
                    date_from: "",
                    date_to: "",
                    status: "",
                    committee_image: "",
                }),

                gallery_form: new Form({
                    id: "",
                    club_id: "",
                    title: "",
                    status: "",
                    club_gallery_image: "",
                }),

            };
        },

        watch: {
            keyword: function () {
                this.getData();
            }
        },

        mounted() {
            console.log("Component mounted.");
            this.getData();
        },

        created() {
         useHead({title: 'All Club of EWU'});
        },

        methods: {
            getData(url) {
                this.$Progress.start();
                let linkUrl = url ? url :  `${this.backendUrl}club`;
                axios.get(linkUrl, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.clubs = response.data.data;
                        console.log(response.data.data)
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });

                /* get department */
                axios.get(`${this.backendUrl}department`)
                    .then((response) => {
                        this.departments = response.data.data;
                    }).catch((e) => { this.$Progress.fail();});

                /* get designation */
                axios.get(`${this.backendUrl}designation`)
                    .then((response) => {
                        this.designations = response.data.data;
                    }).catch((e) => { this.$Progress.fail();});
            },

            create() {
                this.editMode = false
                this.showMode = false
                this.form.reset()
                this.form.clear()
                // $("#image").val('')
                $("#exampleModal").modal("show");
            },

            show(item) {
                // this.showMode = true
                this.media_form.reset()
                this.media_form.clear()
                this.media_form.club_id = item.club_id;
                this.moderator_form.club_id = item.club_id;
                this.committee_form.club_id = item.club_id;
                this.gallery_form.club_id = item.club_id;
                $("#exampleModal").modal("show");
            },

            typeChanged(event){
                if (event.target.value == 'news'){
                    this.newsMode = true;
                    this.eventsMode = false;
                    this.noticeMode = false;
                } else if (event.target.value == 'events'){
                    this.eventsMode = true;
                    this.newsMode = false;
                    this.noticeMode = false;
                } else if (event.target.value == 'notice'){
                    this.noticeMode = true;
                    this.noticeMode = false;
                    this.eventsMode = false;
                }
            },

            edit(id) {
                this.editMode = true
                this.showMode = false
                this.form.reset()
                this.form.clear()
                this.form.fill(id)
                $("#exampleModal").modal("show");
            },

            onImageChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    // this.imagePreview = reader.result;
                    this.form.image = reader.result;
                }
                reader.readAsDataURL(file);
            },
            onHeaderLogoChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    // this.imagePreview = reader.result;
                    this.form.header_logo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onImageMediaChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.onImageMediaPreview = reader.result;
                    this.media_form.media_main_image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onImageModeratorChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.onImageModeratorPreview = reader.result;
                    this.moderator_form.moderator_image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onImageCommitteeChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.onImageCommitteePreview = reader.result;
                    this.committee_form.committee_image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onImageGalleryChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.onImageGalleryPreview = reader.result;
                    this.gallery_form.club_gallery_image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            mediaStore() {
                this.$Progress.start()
                this.media_form.busy = true
                this.media_form.post(`${this.backendUrl}club-media`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.media_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Added" });
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

            moderatorStore() {
                this.$Progress.start()
                this.moderator_form.busy = true
                this.moderator_form.post(`${this.backendUrl}club-moderator`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.moderator_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Moderator Added Successfully" });
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

            committeeStore() {
                this.$Progress.start()
                this.committee_form.busy = true
                this.committee_form.post(`${this.backendUrl}club-committee`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.committee_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Committee Added Successfully" });
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

            galleryStore() {
                this.$Progress.start()
                this.gallery_form.busy = true
                this.gallery_form.post(`${this.backendUrl}club-gallery`)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.gallery_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Gallery Added Successfully" });
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

            /*mediaUpdate() {
                this.$Progress.start()
                this.form.busy = true
                this.form.put(`${this.backendUrl}club/`+this.form.id)
                    .then(response => {
                        this.getData()
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Updated" });
                        }else{
                            this.$Progress.fail()
                            this.$notify({type: "error", title: "Error", text: 'Something went wrong try again later'})
                        }
                    })
                    .catch(e => {
                        this.$Progress.fail()
                        console.log(e)
                    })
            },*/

            destroy(id){
                // this.$swal
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club/`+id)
                        .then(response => {
                            this.$swal.fire(
                                'Deleted!',
                                response.data.message,
                                'success'
                            )
                            this.getData()
                        });
                    }
                })
            }
        }
    }
</script>

<style>

</style>