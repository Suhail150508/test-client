<template>
    <div id="form">
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Club Details</h4>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'app.club' }" type="button" class="btn btn-success waves-effect waves-light float-end">
                                <i class="bx bx-check-double font-size-16 align-middle me-2"></i> All Clubs
                            </router-link>
                        </div>
                    </div>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="media-tab" data-bs-toggle="tab" data-bs-target="#media" type="button" role="tab" aria-controls="media" aria-selected="false">Media</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="leaders-tab" data-bs-toggle="tab" data-bs-target="#leaders" type="button" role="tab" aria-controls="leaders" aria-selected="false">Moderators</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="committee-tab" data-bs-toggle="tab" data-bs-target="#committee" type="button" role="tab" aria-controls="committee" aria-selected="false">Committee</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="gallery-tab" data-bs-toggle="tab" data-bs-target="#gallery" type="button" role="tab" aria-controls="gallery" aria-selected="false">Gallery</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="slider-tab" data-bs-toggle="tab" data-bs-target="#slider" type="button" role="tab" aria-controls="slider" aria-selected="false">Slider</button>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="home-tab">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="card">
                                            <div class="card-header bg-success fw-medium">Basic Information</div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <h3 class="card-title fw-bolder">Add Club Title</h3>
                                                    <p v-html="clubData.title"></p>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="mb-3">
                                                            <h3 class="card-title fw-bolder">Upload Main Logo</h3>
                                                            <img class="mt-1 border" :src="clubData.main_logo" style="width: 150px;" alt="" />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="mb-3">
                                                            <h3 class="card-title fw-bolder">Upload Header Logo</h3>
                                                            <img class="mt-1 border" :src="clubData.header_logo" style="width: 200px;" alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <h3 class="card-title fw-bolder">Body Description</h3>
                                                    <p v-html="clubData.description"></p>
                                                </div>

                                                <div class="mb-3">
                                                    <h3 class="card-title fw-bolder">About Club</h3>
                                                    <p v-html="clubData.about"></p>
                                                </div>
                                            </div>
                                            <!-- end card body -->
                                        </div>
                                        <!-- end card -->
                                    </div>
                                    <!-- end col -->

                                    <div class="col-xl-12">
                                        <div class="card">
                                            <div class="card-header text-light bg-info fw-medium">
                                                <i class="fas fa-mobile-alt"></i> Contact Information</div>
                                            <div class="card-body">
                                                <div data-repeater-list="group-a">
                                                    <div data-repeater-item class="row">
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="clubData.c_address" name="c_address" type="text" class="form-control" readonly  placeholder="Enter Address">
                                                            <label> Address</label>
                                                        </div>
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="clubData.c_phone" name="c_phone" type="text" class="form-control" readonly  placeholder="Enter Phone">
                                                            <label> Phone</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-floating mb-3">
                                                                <input v-model="clubData.c_email" name="c_email" type="email" class="form-control" readonly placeholder="Enter Email address">
                                                                <label>Email address</label>
                                                            </div>
                                                        </div>
                                                        <div class="form-floating col-md-6 mb-3">
                                                            <input v-model="clubData.c_room_no" name="c_room_no" type="text" class="form-control" readonly  placeholder="Enter Name">
                                                            <label> Room No.</label>
                                                        </div>
                                                        <div class="form-floating col-md-12 mb-3">
                                                            <textarea v-model="clubData.c_description" name="c_description" class="form-control" readonly rows="3" placeholder="Enter Your Message"></textarea>
                                                            <label> Contact Description</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                            </div>
                                        </div>
                                        <!-- end card -->
                                    </div>

                                    <div class="col-xl-12">
                                        <div class="card">
                                            <div class="card-header text-light bg-primary fw-medium">
                                                <i class="fas fa-mobile-alt"></i> Social Links</div>
                                            <div class="card-body">
                                                <div class="row border my-2">
                                                    <div data-repeater-list="group-a">
                                                        <div>
                                                            <div data-repeater-item class="row" v-for="(row, index) in clubData.link_details">
                                                                <div  class="mb-3 col-lg-3">
                                                                    <label>Social Name</label>
                                                                    <input type="text" v-model="row.social_name" :name="'socialLinks['+index+'][social_name]'" class="form-control" readonly/>
                                                                </div>
                                                                <div  class="mb-3 col-lg-3">
                                                                    <label>Icon Class</label>
                                                                    <input type="text" v-model="row.icon_class" :name="'socialLinks['+index+'][icon_class]'" class="form-control" readonly/>
                                                                </div>

                                                                <div class="mb-3 col-lg-4">
                                                                    <label>Social Link</label>
                                                                    <input type="text" v-model="row.social_link" class="form-control" :name="'socialLinks['+index+'][social_link]'" readonly>
                                                                </div>

                                                                <div class="col-lg-1 align-self-center">
                                                                    <div class="d-grid">
                                                                        <h4><span class="badge bg-primary">{{index+1}}</span></h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end row -->
                                                <div class="card-foter">
                                                    <div class="row mb-3">
                                                        <div class="col-lg-3">
                                                            <label> Club Status</label>
                                                            <input type="text" class="form-control" v-model="clubData.status" readonly>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <!-- end card -->

                                        <!-- end card body -->
                                    </div>
                                    <!-- end col -->

                                </div>
                                <!-- end row -->
                            </div>
                        </div>

                        <div class="tab-pane fade" id="media" role="tabpanel" aria-labelledby="media-tab">
                            <div class="card-header bg-transparent my-3 ">
                                <button type="button" @click="mediaCreate"  class="btn btn-sm btn-warning waves-effect waves-light float-end mlr-5" >
                                    <i class="fas fa-plus"></i>Add Media
                                </button>

                                <ul class="float-end" role="tablist">
                                    <div class="btn-group btn-group-example mb-3" role="group">
                                        <button type="button" class="nav-link btn btn-outline-primary w-md p-1 active"
                                                data-bs-toggle="tab" href="#media_list" role="tab">Media List</button>
                                        <button type="button" class="nav-link btn btn-outline-danger p-1 w-md"
                                                data-bs-toggle="tab" href="#deleted_media_list" role="tab">Deleted List</button>
                                    </div>
                                </ul>
                            </div>

                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="media_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldName" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="type">Type</option>
                                                            <option value="title">Title</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive  nowrap w-100">
                                            <thead class="table-success">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Type</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            <tr v-for="(item, index) of clubMedias" class="text-center align-middle">
                                                <td style="width: 5%">{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.type }}</td>
                                                <td style="width: 20%"><img :src="item.media_main_image" width="100" height="50" :alt="item.id"></td>
                                                <td style="width: 35%">{{ item.title }}</td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 20%">
                                                    <button type="button" @click="mediaShow(item)" class="btn btn-info btn-sm">
                                                        <i class="fas fa-eye"></i>
                                                    </button>

                                                    <button type="button" @click="mediaEdit(item)" class="btn btn-primary btn-sm">
                                                        <i class="fas fa-edit"></i>
                                                    </button>

                                                    <button type="button" @click="mediaDestroy(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!clubMedias.length">
                                                <td colspan="6">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="clubMedias.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="clubMedias.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane" id="deleted_media_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldName" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="type">Type</option>
                                                            <option value="title">Title</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive   nowrap w-100">
                                            <thead class="table-danger">
                                            <tr class="text-center align-middle">
                                                <th style="width: 10%;">S. No</th>
                                                <th>Type</th>
                                                <th>Title</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr v-for="(item, index) of deletedClubMedias" class="text-center align-middle">
                                                <td style="width: 10%">{{ index+1 }}</td>
                                                <td style="width: 15%">{{ item.type }}</td>
                                                <td style="width: 50%">{{ item.title }}</td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="mediaRestore(item.id)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-sync-alt"></i>
                                                    </button>

                                                    <button type="button" @click="mediaPermanentDelete(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!deletedClubMedias.length">
                                                <td colspan="6">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="deletedClubMedias.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="deletedClubMedias.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane fade" id="leaders" role="tabpanel" aria-labelledby="leaders-tab">
                            <div class="card-header bg-transparent my-3 ">
                                <button type="button" @click="moderatorCreate"  class="btn btn-sm btn-warning waves-effect waves-light float-end mlr-5" >
                                    <i class="fas fa-plus"></i>Add Moderator
                                </button>

                                <ul class="float-end" role="tablist">
                                    <div class="btn-group btn-group-example mb-3" role="group">
                                        <button type="button" class="nav-link btn btn-outline-primary w-md p-1 active"
                                                data-bs-toggle="tab" href="#moderator_list" role="tab">Moderator List</button>
                                        <button type="button" class="nav-link btn btn-outline-danger p-1 w-md"
                                                data-bs-toggle="tab" href="#deleted_moderator_list" role="tab">Deleted List</button>
                                    </div>
                                </ul>
                            </div>

                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="moderator_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldName" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="type">Type</option>
                                                            <option value="name">Name</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive  nowrap w-100">
                                            <thead class="table-success">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Type</th>
                                                <th>Designation</th>
                                                <th>Department</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            <tr v-for="(item, index) of clubModerators" class="text-center align-middle">
                                                <td style="width: 5%" class="text-center">{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.type }}</td>
                                                <td style="width: 15%">{{ item.designation.name }}</td>
                                                <td style="width: 15%">{{ item.department.title }}</td>
                                                <td style="width: 30%">{{ item.name }}</td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="moderatorShow(item)" class="btn btn-info btn-sm">
                                                        <i class="fas fa-eye"></i>
                                                    </button>

                                                    <button type="button" @click="moderatorEdit(item)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-edit"></i>
                                                    </button>

                                                    <button type="button" @click="moderatorDestroy(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!clubModerators.length">
                                                <td colspan="7">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="clubModerators.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="clubModerators.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane" id="deleted_moderator_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>D Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldName" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="type">Type</option>
                                                            <option value="name">Name</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive   nowrap w-100">
                                            <thead class="table-danger">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Type</th>
                                                <th>Designation</th>
                                                <th>Department</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr v-for="(item, index) of deletedClubModerators" class="text-center align-middle">
                                                <td style="width: 5%" class="text-center">{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.type }}</td>
                                                <td style="width: 15%">{{ item.designation.name }}</td>
                                                <td style="width: 15%">{{ item.department.title }}</td>
                                                <td style="width: 30%">{{ item.name }}</td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="moderatorRestore(item.id)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-sync-alt"></i>
                                                    </button>

                                                    <button type="button" @click="moderatorPermanentDelete(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!deletedClubModerators.length">
                                                <td colspan="7">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="deletedClubModerators.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="deletedClubModerators.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="committee" role="tabpanel" aria-labelledby="committee-tab">
                            <div class="card-header bg-transparent my-3 ">
                                <button type="button" @click="committeeCreate"  class="btn btn-sm btn-warning waves-effect waves-light float-end mlr-5" >
                                    <i class="fas fa-plus"></i>Add Committee
                                </button>

                                <ul class="float-end" role="tablist">
                                    <div class="btn-group btn-group-example mb-3" role="group">
                                        <button type="button" class="nav-link btn btn-outline-primary w-md p-1 active"
                                                data-bs-toggle="tab" href="#committee_list" role="tab">Committee List</button>
                                        <button type="button" class="nav-link btn btn-outline-danger p-1 w-md"
                                                data-bs-toggle="tab" href="#deleted_committee_list" role="tab">Deleted List</button>
                                    </div>
                                </ul>
                            </div>

                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="committee_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldName" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="type">Type</option>
                                                            <option value="name">Name</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive  nowrap w-100">
                                            <thead class="table-success">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Type</th>
                                                <th>Designation</th>
                                                <th>Department</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            <tr v-for="(item, index) of clubCommittees" class="text-center align-middle">
                                                <td style="width: 5%" >{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.type }}</td>
                                                <td style="width: 15%">{{ item.designation.name }}</td>
                                                <td style="width: 15%">{{ item.department.title }}</td>
                                                <td style="width: 30%">{{ item.name }}</td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="committeeShow(item)" class="btn btn-info btn-sm">
                                                        <i class="fas fa-eye"></i>
                                                    </button>

                                                    <button type="button" @click="committeeEdit(item)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-edit"></i>
                                                    </button>

                                                    <button type="button" @click="committeeDestroy(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!clubCommittees.length">
                                                <td colspan="7">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="clubCommittees.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="clubCommittees.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane" id="deleted_committee_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>D Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldName" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="type">Type</option>
                                                            <option value="name">Name</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive   nowrap w-100">
                                            <thead class="table-danger">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Type</th>
                                                <th>Designation</th>
                                                <th>Department</th>
                                                <th>Status</th>
                                                <th>Name</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr v-for="(item, index) of deletedClubCommittees" class="text-center align-middle">
                                                <td style="width: 5%">{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.type }}</td>
                                                <td style="width: 15%">{{ item.designation.name }}</td>
                                                <td style="width: 30%">{{ item.department.title }}</td>
                                                <td style="width: 15%">{{ item.name }}</td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="committeeRestore(item.id)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-sync-alt"></i>
                                                    </button>

                                                    <button type="button" @click="committeePermanentDelete(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!deletedClubCommittees.length">
                                                <td colspan="7">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="deletedClubCommittees.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="deletedClubCommittees.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="gallery" role="tabpanel" aria-labelledby="gallery-tab">

                            <div class="card-header bg-transparent my-3 ">
                                <button type="button" @click="galleryCreate"  class="btn btn-sm btn-warning waves-effect waves-light float-end mlr-5" >
                                    <i class="fas fa-plus"></i>Add Gallery
                                </button>

                                <ul class="float-end" role="tablist">
                                    <div class="btn-group btn-group-example mb-3" role="group">
                                        <button type="button" class="nav-link btn btn-outline-primary w-md p-1 active"
                                                data-bs-toggle="tab" href="#gallery_list" role="tab">Gallery List</button>
                                        <button type="button" class="nav-link btn btn-outline-danger p-1 w-md"
                                                data-bs-toggle="tab" href="#deleted_gallery_list" role="tab">Deleted List</button>
                                    </div>
                                </ul>
                            </div>

                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="gallery_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldNameGallery" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="title">Title</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive  nowrap w-100">
                                            <thead class="table-success">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Title</th>
                                                <th>Gallery Image</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            <tr v-for="(item, index) of clubGalleries" class="text-center align-middle">
                                                <td style="width: 5%" >{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.title }}</td>
                                                <td style="width: 10%">
                                                    <img class="mt-1 border" :src="item.club_gallery_image" style="width: 70px; height: 40px" alt="" />
                                                </td>
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="galleryShow(item)" class="btn btn-info btn-sm">
                                                        <i class="fas fa-eye"></i>
                                                    </button>

                                                    <button type="button" @click="galleryEdit(item)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-edit"></i>
                                                    </button>

                                                    <button type="button" @click="galleryDestroy(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!clubGalleries.length">
                                                <td colspan="7">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="clubGalleries.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="clubGalleries.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div class="tab-pane" id="deleted_gallery_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>D Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldNameGallery" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="title">Title</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive   nowrap w-100">
                                            <thead class="table-danger">
                                            <tr class="text-center align-middle">
                                                <th style="width: 5%;">S. No</th>
                                                <th>Title</th>
                                                <!--<th>Gallery Image</th>-->
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            <tr v-for="(item, index) of deletedClubGalleries" class="text-center align-middle">
                                                <td style="width: 5%">{{ index+1 }}</td>
                                                <td style="width: 10%">{{ item.title }}</td>

                                                <!--<td style="width: 10%">
                                                    <img class="mt-1 border" :src="item.club_gallery_image" style="width: 70px; height: 40px;" alt="" />
                                                </td>-->
                                                <td style="width: 10%">{{ item.status }}</td>
                                                <td style="width: 15%">
                                                    <button type="button" @click="galleryRestore(item.id)" class="btn btn-primary btn-sm" >
                                                        <i class="fas fa-sync-alt"></i>
                                                    </button>

                                                    <button type="button" @click="galleryPermanentDelete(item.id)" class="btn btn-danger btn-sm">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-show="!deletedClubGalleries.length">
                                                <td colspan="7">
                                                    <div class="alert alert-danger text-danger text-center" role="alert">
                                                        No data available in table :(
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="deletedClubGalleries.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="deletedClubGalleries.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                    :links = 'links'
                                                    @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slider datatable code start -->
                        <div class="tab-pane fade" id="slider" role="tabpanel" aria-labelledby="slider-tab">
                            <div class="card-header bg-transparent my-3 ">
                                <button type="button" @click="sliderCreate"  class="btn btn-sm btn-warning waves-effect waves-light float-end mlr-5" >
                                    <i class="fas fa-plus"></i> Add Slider
                                </button>

                                <ul class="float-end" role="tablist">
                                    <div class="btn-group btn-group-example mb-3" role="group">
                                        <button type="button" class="nav-link btn btn-outline-primary w-md p-1 active" data-bs-toggle="tab" href="#slider_list" role="tab">
                                            Slider List
                                        </button>

                                        <button type="button" class="nav-link btn btn-outline-danger p-1 w-md" data-bs-toggle="tab" href="#deleted_slider_list" role="tab">
                                            Deleted List
                                        </button>
                                    </div>
                                </ul>
                            </div>

                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="slider_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldNameSlider" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="title">Title</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive nowrap w-100">
                                            <thead class="table-success">
                                                <tr class="text-center align-middle">
                                                    <th style="width: 5%;">S. No</th>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>URL</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="(item, index) of clubSliders" class="text-center align-middle">
                                                    <td style="width: 5%" >{{ index + 1 }}</td>

                                                    <td style="width: 25%" class="text-center">
                                                        <img v-if="item.image" class="border" width="80" height="50" :src="item.image" :alt="item.id">
                                                        <img v-else class="border" width="80" height="50" :src="$store.state.avatar" :alt="$store.state.alt">
                                                    </td>

                                                    <td style="width: 15%">{{ item.title }}</td>

                                                    <td style="width: 15%">{{ item.url }}</td>

                                                    <td style="width: 15%">{{ item.status }}</td>

                                                    <td style="width: 15%">
                                                        <button type="button" @click="sliderShow(item)" class="btn btn-info btn-sm">
                                                            <i class="fas fa-eye"></i>
                                                        </button>

                                                        <button type="button" @click="sliderEdit(item)" class="btn btn-primary btn-sm mlr-5">
                                                            <i class="fas fa-edit"></i>
                                                        </button>

                                                        <button type="button" @click="sliderDestroy(item.id)" class="btn btn-danger btn-sm">
                                                            <i class="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr v-show="!clubSliders.length">
                                                    <td colspan="6">
                                                        <div class="alert alert-danger text-danger text-center" role="alert">
                                                            No data available in table :(
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="clubSliders.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="clubSliders.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                :links = 'links'
                                                @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div class="tab-pane" id="deleted_slider_list" role="tabpanel">
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-md-4">
                                                <div class="row">
                                                    <div class="col-md-2" style="margin: auto 0;">
                                                        <span>Show</span>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <select @change="getData(null)" v-model="perPage" class="form-select form-control form-select-sm">
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
                                                        <select v-model="fieldNameSlider" id="fields" class="form-select form-control form-select-sm">
                                                            <option value="title">Title</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <input v-model="keyword" type="text" class="form-control form-control-sm" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table class="table table-bordered dt-responsive   nowrap w-100">
                                            <thead class="table-danger">
                                                <tr class="text-center align-middle">
                                                    <th style="width: 5%;">S. No</th>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>URL</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="(item, index) of deletedClubSliders" class="text-center align-middle">
                                                    <td style="width: 5%">{{ index + 1 }}</td>

                                                    <td style="width: 25%" class="text-center">
                                                        <img v-if="item.image" class="border" width="80" height="50" :src="item.image" :alt="item.id">
                                                        <img v-else class="border" width="80" height="50" :src="$store.state.avatar" :alt="$store.state.alt">
                                                    </td>

                                                    <td style="width: 15%">{{ item.title }}</td>

                                                    <td style="width: 15%">{{ item.url }}</td>

                                                    <td style="width: 15%">{{ item.status }}</td>

                                                    <td style="width: 15%">
                                                        <button type="button" @click="sliderRestore(item.id)" class="btn btn-primary btn-sm mlr-5">
                                                            <i class="fas fa-sync-alt"></i>
                                                        </button>

                                                        <button type="button" @click="sliderPermanentDelete(item.id)" class="btn btn-danger btn-sm">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr v-show="!deletedClubSliders.length">
                                                    <td colspan="6">
                                                        <div class="alert alert-danger text-danger text-center" role="alert">
                                                            No data available in table :(
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div v-if="deletedClubSliders.length" class="d-flex">
                                            <div class="col-md-4 pl-0" style="margin: auto;" v-if="deletedClubSliders.length">
                                                Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
                                            </div>

                                            <PaginationComponent
                                                :links = 'links'
                                                @get-data="getData"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Media Create, Show and Edit Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Media Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="editMode ? mediaUpdate() : mediaStore()">
                                    <div v-if="media_form.progress" class="text-center">Progress: {{ media_form.progress.percentage }}%</div>

                                    <AlertError :form="media_form" message="There were some problems with your input." />

                                    <div class="modal-body row">
                                        <div class="col-md-6">
                                            <div class="form-group my-2">
                                                <label>Media Type</label>
                                                <select v-if="showMode==false" v-model="media_form.type" class="form-control" name="type" @change="typeChanged($event)">
                                                    <option value="">Select One</option>
                                                    <option value="news">News</option>
                                                    <option value="events">Events</option>
                                                    <option value="notice">Notice</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="media_form.type" type="text" class="form-control" placeholder="Approval" :readonly="showMode==true ? true : false">
                                                <HasError :form="media_form" field="type" />
                                            </div>
                                        </div>

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
                                                <input v-if="showMode==false" type="file" name="media_main_image" class="form-control" @change="onImageMediaChange" />
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
                                                <select v-if="showMode==false" v-model="media_form.status" class="form-control" name="status">
                                                    <option value="">Select One</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="media_form.status" type="text" class="form-control" placeholder="Approval" :readonly="showMode==true ? true : false">
                                                <HasError :form="media_form" field="status" />
                                            </div>
                                        </div>

                                        <div v-if="showMode==false" class="col-md-12 my-2">
                                            <div class="form-group">
                                                <label>Description</label>
                                                <Editor
                                                        v-model="media_form.description" name="description"
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
                                                <HasError :form="media_form" field="description" />
                                            </div>
                                        </div>

                                        <div v-if="showMode==true" class="col-md-12 my-2">
                                            <div class="form-group">
                                                <label>Description</label>
                                                <p v-html="media_form.description" rows="10" class="form-control border" readonly></p>
                                                <HasError :form="media_form" field="description" />
                                            </div>
                                        </div>

                                        <div v-if="eventsMode == true" class="col-xl-12 my-2">
                                            <div data-repeater-list="group-a">
                                                <div data-repeater-item class="row">
                                                    <div class="form-floating col-md-12 mb-3">
                                                        <textarea v-if="showMode==false" v-model="media_form.c_address" name="c_address" class="form-control" rows="3" placeholder="Enter Your Message"></textarea>
                                                        <p v-if="showMode==true" v-html="media_form.c_address" class="form-control border" readonly></p>
                                                        <label> Address </label>
                                                        <HasError :form="media_form" field="c_address" />
                                                    </div>
                                                    <div class="form-floating col-md-6 mb-3">
                                                        <input v-model="media_form.c_phone" name="c_phone" type="text" class="form-control"  placeholder="Enter Phone" :readonly="showMode==true ? true : false">
                                                        <label> Phone</label>
                                                        <HasError :form="media_form" field="c_phone" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-floating mb-3">
                                                            <input v-model="media_form.c_email" name="c_email" type="email" class="form-control" placeholder="Enter Email address" :readonly="showMode==true ? true : false">
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
                    </div>
                </div>

                <!--Moderator Create, Show and Edit Modal -->
                <div class="modal fade" id="moderatorModal" tabindex="-1" aria-labelledby="moderatorModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-success">
                                <h5 class="modal-title text-light" id="moderatorModalLabel">Moderator Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="editMode ? moderatorUpdate() : moderatorStore()" >
                                    <div v-if="moderator_form.progress" class="text-center">Progress: {{ moderator_form.progress.percentage }}%</div>

                                    <AlertError :form="moderator_form" message="There were some problems with your input." />

                                    <div class="modal-body row">
                                        <div class="col-md-6">
                                            <div class="form-group my-2">
                                                <label>Moderator Type</label>
                                                <select v-model="moderator_form.type" class="form-control" name="type" :disabled="showMode==true ? true : false">
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
                                                <select v-model="moderator_form.department_id" class="form-control" name="department_id" :disabled="showMode==true ? true : false">
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
                                                <select v-model="moderator_form.designation_id" class="form-control" name="designation_id" :disabled="showMode==true ? true : false">
                                                    <option value="">Select One</option>
                                                    <option v-for="(designation, index) in designations" :value="designation.id">{{designation.name}}</option>
                                                </select>
                                                <HasError :form="moderator_form" field="type" />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group my-2">
                                                <label>Name</label>
                                                <input v-model="moderator_form.name" type="text" name="name" class="form-control" placeholder="Name" :readonly="showMode==true ? true : false">
                                                <HasError :form="moderator_form" field="name" />
                                            </div>
                                        </div>

                                        <div class="col-md-4 my-2">
                                            <div class="mb-3">
                                                <h3 class="card-title">Moderator Photo</h3>
                                                <input v-if="showMode==false" type="file" name="moderator_image" class="form-control" @change="onImageModeratorChange" />
                                                <HasError :form="moderator_form" field="main_logo"/>
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
                                                <input v-model="moderator_form.year_from" type="date" name="year_from" class="form-control" :readonly="showMode==true ? true : false">
                                                <HasError :form="moderator_form" field="year_from" />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group my-2">
                                                <label>Year To</label>
                                                <input v-model="moderator_form.year_to" type="date" name="year_to" class="form-control" :readonly="showMode==true ? true : false">
                                                <HasError :form="moderator_form" field="year_to" />
                                            </div>
                                        </div>

                                        <div class="col-md-6 my-2">
                                            <div class="form-group">
                                                <label>Status</label>
                                                <select v-if="showMode==false" v-model="moderator_form.status" class="form-control" name="status">
                                                    <option value="">Select One</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="moderator_form.status" type="text" class="form-control" :readonly="showMode==true ? true : false">
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
                                        <button v-if="showMode==false" :disabled="moderator_form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Committee Create, Show and Edit Modal -->
                <div class="modal fade" id="committeeModal" tabindex="-1" aria-labelledby="committeeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-success">
                                <h5 class="modal-title text-light" id="committeeModalLabel">Committee Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="editMode ? committeeUpdate() : committeeStore()" >
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
                                                <input v-if="showMode==true" v-model="committee_form.type" type="text" class="form-control" :readonly="showMode==true ? true : false">
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
                                        <button v-if="showMode==false" :disabled="committee_form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Gallery Create, Show and Edit Modal -->
                <div class="modal fade" id="galleryModal" tabindex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-success">
                                <h5 class="modal-title text-light" id="galleryModalLabel">Gallery Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="editMode ? galleryUpdate() : galleryStore()" >
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

                <!--Slider Create, Show and Edit Modal -->
                <div class="modal fade" id="sliderModal" tabindex="-1" aria-labelledby="sliderModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-success">
                                <h5 class="modal-title text-light" id="sliderModalLabel">Slider {{ editMode ? 'Update' : 'Create' }}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="editMode ? sliderUpdate() : sliderStore()" >
                                    <div v-if="slider_form.progress" class="text-center">Progress: {{ slider_form.progress.percentage }}%</div>
                                    <AlertError :form="slider_form" message="There were some problems with your input." />

                                    <div class="modal-body row">
                                        <div class="col-md-12">
                                            <div class="form-group my-2">
                                                <label>Title</label>
                                                <input v-model="slider_form.title" type="text" name="title" class="form-control" placeholder="Title" :readonly="showMode==true ? true : false">
                                                <HasError :form="slider_form" field="title" />
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12">
                                            <div class="form-group my-2">
                                                <label>Description</label>
                                                <textarea v-model="slider_form.description" rows="3" cols="50" name="description" :readonly="showMode==true ? true : false" class="form-control" placeholder="Enter Short Description here..."></textarea>
                                                <HasError :form="slider_form" field="description" />
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12">
                                            <div class="form-group my-2">
                                                <label>URL</label>
                                                <input type="text" v-model="slider_form.url" name="url" class="form-control" placeholder="URL" :readonly="showMode==true ? true : false"/>
                                                <HasError :form="slider_form" field="url" />
                                            </div>
                                        </div>

                                        <div class="col-md-4 my-2">
                                            <div class="mb-3">
                                                <h3 class="card-title">Photo</h3>
                                                <input v-if="showMode==false" type="file" name="club_slider_image" class="form-control" @change="onSliderImageChange" />
                                                <HasError :form="slider_form" field="club_slider_image"/>
                                            </div>
                                        </div>

                                        <div class="col-md-2 my-2">
                                            <div class="mb-3">
                                                <img class="mt-1" :src="onSliderImagePreview" style="width: 80px;" alt="" />
                                            </div>
                                        </div>

                                        <div class="col-md-6 my-2">
                                            <div class="form-group">
                                                <label>Status</label>
                                                <select v-if="showMode==false" v-model="slider_form.status" class="form-control" name="status">
                                                    <option value="">Select One</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                                <input v-if="showMode==true" v-model="slider_form.status" type="text" class="form-control" :readonly="showMode==true ? true : false">
                                                <HasError :form="slider_form" field="status" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button v-if="showMode==false" :disabled="slider_form.busy" type="submit" class="btn btn-primary"> {{ editMode ? 'Update' : 'Create' }}</button>
                                    </div>
                                </form>
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
    import {useRoute} from 'vue-router';
    import slugify from "slugify";
    import Form from 'vform'
    import Editor from '@tinymce/tinymce-vue'
    import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap5'
    import PaginationComponent from "../../../components/PaginationComponent.vue";

    export default{
        name: 'Form',
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
                fieldName: "type",
                fieldNameGallery: "title",
                fieldNameSlider: "title",
                perPage: 10,
                clubs: [],
                pagination: [],
                links: [],

                departments: [],
                designations: [],

                imagePreviewMainLogo: "",
                onImageMediaPreview: "",
                imagePreview: "",
                onImageModeratorPreview:"",
                onImageCommitteePreview:"",
                onImageGalleryPreview:"",

                clubData: [],
                clubMedias: [],
                clubModerators: [],
                clubCommittees: [],
                clubGalleries: [],
                deletedClubMedias: [],
                deletedClubModerators: [],
                deletedClubCommittees: [],
                deletedClubGalleries: [],

                form: new Form({
                    id:'',
                    type:'',
                    title:'',
                    description:'',
                    about:'',
                    status:'',
                    c_address:'',
                    c_email:'',
                    c_phone:'',
                    c_room_no:'',
                    c_description:'',
                    social_link_inputs:[{
                        social_name:'',
                        icon_class:'',
                        social_link:'',
                    }],
                    main_logo:'',
                    header_logo:'',

                }),

                club_short_name: "",
                media_form: new Form({
                    id: "",
                    club_id: this.$route.query.clubViewId,
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
                    club_id: this.$route.query.clubViewId,
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
                    club_id: this.$route.query.clubViewId,
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
                    club_id: this.$route.query.clubViewId,
                    title: "",
                    status: "",
                    club_gallery_image: "",
                }),

                // Slider code start
                clubSliders: [],
                deletedClubSliders: [],
                onSliderImagePreview:"",
                slider_form: new Form({
                    id: "",
                    club_id: this.$route.query.clubViewId,
                    title: "",
                    sub_title: "",
                    description: "",
                    url: "",
                    status: "",
                    club_slider_image: "",
                }),
                // Slider code end
            };
        },

        watch: {
            keyword: function () {
                this.getData();

                this.getMediaData();
                this.getModeratorData();
                this.getCommitteeData();
                this.getGalleryData();

                this.getMediaDeletedData();
                this.getModeratorDeletedData();
                this.getCommitteeDeletedData();

                this.getSliderData();
                this.getSliderDeletedData();
            }
        },

        mounted() {
            const route = useRoute();
            // console.log(route.params.shortName);
            this.getData();

            this.getMediaData();
            this.getModeratorData();
            this.getCommitteeData();
            this.getGalleryData();

            this.getMediaDeletedData();
            this.getModeratorDeletedData();
            this.getCommitteeDeletedData();
            this.getGalleryDeletedData();

            this.getSliderData();
            this.getSliderDeletedData();
        },

        methods:{
            getData(){

                /* get single club*/
                axios.get(`${this.backendUrl}club/view/`+this.$route.query.clubViewId)
                    .then((response) => {
                        this.clubData = response.data;
                        this.club_short_name =  response.data.short_name
                    }).catch((e) => { this.$Progress.fail();});
                /*axios.get(`${this.backendUrl}club/`+this.$route.params.shortName)
                    .then((response) => {
                        this.clubData = response.data;
                    }).catch((e) => { this.$Progress.fail();});*/

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

                    /* club-media deleted list club wise response*/
                /*axios.get(`${this.backendUrl}club-media/deleted-list/`+this.$route.query.clubViewId)
                    .then((response) => {
                        let clubId = this.$route.query.clubViewId;
                        let deletedList = [];
                        $(response.data).each(function(index, element) {
                            if (element.club_id == clubId){
                                deletedList[index] = element;
                            }
                        });
                        this.deletedClubMedias = deletedList;
                    }).catch((e) => { this.$Progress.fail();});*/
            },

            getMediaData(){
                /* get club-media data list club wise*/
                axios.get(`${this.backendUrl}club-media/list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.clubMedias = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getMediaDeletedData(){
                /* get deleted club-media data list club wise*/
                axios.get(`${this.backendUrl}club-media/deleted-list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.deletedClubMedias = response.data.data;
                        this.paginationDel = response.data.meta;
                        this.linksDel = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getModeratorData(){
                /* get club-moderator data list club wise*/
                axios.get(`${this.backendUrl}club-moderator/list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.clubModerators = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getModeratorDeletedData(){
                /* get deleted club-moderator data list club wise*/
                axios.get(`${this.backendUrl}club-moderator/deleted-list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.deletedClubModerators = response.data.data;
                        this.paginationDel = response.data.meta;
                        this.linksDel = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getCommitteeData(){
                /* get club-committee data list club wise*/
                axios.get(`${this.backendUrl}club-committee/list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.clubCommittees = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getCommitteeDeletedData(){
                /* get deleted club-committee data list club wise*/
                axios.get(`${this.backendUrl}club-committee/deleted-list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldName,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.deletedClubCommittees = response.data.data;
                        this.paginationDel = response.data.meta;
                        this.linksDel = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getGalleryData(){
                /* get club-committee data list club wise*/
                axios.get(`${this.backendUrl}club-gallery/list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldNameGallery,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.clubGalleries = response.data.data;
                        this.pagination = response.data.meta;
                        this.links = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getGalleryDeletedData(){
                /* get deleted club-committee data list club wise*/
                axios.get(`${this.backendUrl}club-gallery/deleted-list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldNameGallery,
                        keyword: this.keyword,
                    }
                })
                    .then((response) => {
                        this.deletedClubGalleries = response.data.data;
                        this.paginationDel = response.data.meta;
                        this.linksDel = response.data.meta.links;
                        this.$Progress.finish();
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            getSliderData(){
                axios.get(`${this.backendUrl}club-slider/list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldNameSlider,
                        keyword: this.keyword,
                    }
                })
                .then((response) => {
                    this.clubSliders = response.data.data;
                    // console.log(this.clubSliders);
                    this.pagination = response.data.meta;
                    this.links = response.data.meta.links;
                    this.$Progress.finish();
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
            },

            getSliderDeletedData(){
                axios.get(`${this.backendUrl}club-slider/deleted-list/`+this.$route.query.clubViewId, {
                    params: {
                        per_page: this.perPage,
                        field_name: this.fieldNameSlider,
                        keyword: this.keyword,
                    }
                })
                .then((response) => {
                    this.deletedClubSliders = response.data.data;
                    // console.log(this.deletedClubSliders);
                    this.paginationDel = response.data.meta;
                    this.linksDel = response.data.meta.links;
                    this.$Progress.finish();
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
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

            onImageChangeMainLogo(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.imagePreviewMainLogo = reader.result;
                    this.form.main_logo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            onImageChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.onloadend = (file) => {
                    this.imagePreview = reader.result;
                    this.form.header_logo = reader.result;
                }
                reader.readAsDataURL(file);
            },

            /* ----- Media Method start ----- */
            mediaCreate() {
                this.editMode = false
                this.showMode = false
                this.onImageMediaPreview = "";
                this.media_form.reset()
                this.media_form.clear()
                $("#exampleModal").modal("show");
            },

            mediaShow(item) {
                if (item.type == 'news'){
                    this.newsMode = true;
                    this.eventsMode = false;
                    this.noticeMode = false;
                } else if(item.type == 'events'){
                    this.eventsMode = true;
                    this.newsMode = false;
                    this.noticeMode = false;
                } else if(item.type == 'notice'){
                    this.noticeMode = true;
                    this.noticeMode = false;
                    this.eventsMode = false;
                }
                this.showMode = true
                this.editMode = false
                this.onImageMediaPreview = item.media_main_image;
                this.media_form.reset()
                this.media_form.clear()
                this.media_form.fill(item)
                $("#exampleModal").modal("show");
            },

            mediaEdit(item) {
                if (item.type == 'news'){
                    this.newsMode = true;
                    this.eventsMode = false;
                    this.noticeMode = false;
                } else if(item.type == 'events'){
                    this.eventsMode = true;
                    this.newsMode = false;
                    this.noticeMode = false;
                } else if(item.type == 'notice'){
                    this.noticeMode = true;
                    this.noticeMode = false;
                    this.eventsMode = false;
                }
                this.editMode = true
                this.showMode = false
                this.onImageMediaPreview = item.media_main_image;
                this.media_form.reset()
                this.media_form.clear()
                this.media_form.fill(item)
                this.media_form.media_main_image = ""
                $("#exampleModal").modal("show");
            },

            mediaStore() {
                let generate_seo_url = this.getEventPath(this.media_form.title, this.club_short_name);
                this.$Progress.start()
                this.media_form.busy = true
                this.media_form.post(`${this.backendUrl}club-media`, {
                    params: {
                        seo_url : generate_seo_url
                    }
                })
                .then(response => {
                    this.getMediaData()
                    $('#exampleModal').modal('hide')
                    if(this.media_form.successful){
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: "Club Media Added Successfully" });
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

            mediaUpdate() {
                let generate_seo_url = this.getEventPath(this.media_form.title, this.club_short_name);
                this.$Progress.start()
                this.media_form.busy = true
                this.media_form.put(`${this.backendUrl}club-media/`+this.media_form.id, {
                    params: {
                        seo_url : generate_seo_url
                    }
                })
                .then(response => {
                    this.getMediaData()
                    $('#exampleModal').modal('hide')
                    if(this.media_form.successful){
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: "Club Media Updated Successfully" });
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

            mediaDestroy(id){
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
                        axios.delete(`${this.backendUrl}club-media/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getMediaData()
                                this.getMediaDeletedData()
                            });
                    }
                })
            },

            mediaRestore(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Revert it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.get(`${this.backendUrl}club-media/restore/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Restored!',
                                    response.data.message,
                                    'success'
                                )
                                this.getMediaDeletedData()
                                this.getMediaData()
                            });
                    }
                })
            },

            mediaPermanentDelete(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-media/force-delete/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getMediaDeletedData()
                                this.getMediaData()
                            });
                    }
                })
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

            /* ------ Moderator Method start ------ */
            moderatorCreate() {
                this.editMode = false
                this.showMode = false
                this.onImageModeratorPreview = ""
                this.moderator_form.reset()
                this.moderator_form.clear()
                $("#moderatorModal").modal("show");
            },

            moderatorShow(item) {
                this.showMode = true
                this.editMode = false
                this.onImageModeratorPreview = item.moderator_image
                this.moderator_form.reset()
                this.moderator_form.clear()
                this.moderator_form.fill(item)
                $("#moderatorModal").modal("show");
            },

            moderatorEdit(item) {
                console.log(item)
                this.editMode = true
                this.showMode = false
                this.onImageModeratorPreview = item.moderator_image
                this.moderator_form.reset()
                this.moderator_form.fill(item)
                this.moderator_form.moderator_image = ""
                $("#moderatorModal").modal("show");
            },

            moderatorStore() {
                this.$Progress.start()
                this.moderator_form.busy = true
                this.moderator_form.post(`${this.backendUrl}club-moderator`)
                    .then(response => {
                        this.getModeratorData()
                        $('#moderatorModal').modal('hide')
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

            moderatorUpdate() {
                this.$Progress.start()
                this.moderator_form.busy = true
                this.moderator_form.put(`${this.backendUrl}club-moderator/`+this.moderator_form.id)
                    .then(response => {
                        this.getModeratorData()
                        $('#moderatorModal').modal('hide')
                        if(this.moderator_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Moderator Updated Successfully" });
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

            moderatorDestroy(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You will be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-moderator/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getModeratorData()
                                this.getModeratorDeletedData()
                            });
                    }
                })
            },

            moderatorRestore(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Revert it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.get(`${this.backendUrl}club-moderator/restore/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Restored!',
                                    response.data.message,
                                    'success'
                                )
                                this.getModeratorDeletedData()
                                this.getModeratorData()
                            });
                    }
                })
            },

            moderatorPermanentDelete(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-moderator/force-delete/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getModeratorDeletedData()
                                this.getModeratorData()
                            });
                    }
                })
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

            /* ------ Committee Method start ------ */
            committeeCreate() {
                this.editMode = false
                this.showMode = false
                this.onImageCommitteePreview = ""
                this.committee_form.reset()
                this.committee_form.clear()
                $("#committeeModal").modal("show");
            },

            committeeShow(item) {
                console.log(item)
                this.showMode = true
                this.editMode = false
                this.onImageCommitteePreview = item.committee_image
                this.committee_form.reset()
                this.committee_form.clear()
                this.committee_form.fill(item)
                $("#committeeModal").modal("show");
            },

            committeeEdit(item) {
                this.editMode = true
                this.showMode = false
                this.onImageCommitteePreview = item.committee_image
                this.committee_form.reset()
                this.committee_form.clear()
                this.committee_form.fill(item)
                this.committee_form.committee_image = ""
                $("#committeeModal").modal("show");
            },

            committeeStore() {
                this.$Progress.start()
                this.committee_form.busy = true
                this.committee_form.post(`${this.backendUrl}club-committee`)
                    .then(response => {
                        this.getCommitteeData()
                        $('#committeeModal').modal('hide')
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

            committeeUpdate() {
                this.$Progress.start()
                this.committee_form.busy = true
                this.committee_form.put(`${this.backendUrl}club-committee/`+this.committee_form.id)
                    .then(response => {
                        this.getCommitteeData()
                        $('#committeeModal').modal('hide')
                        if(this.committee_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Committee Updated Successfully" });
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

            committeeDestroy(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You will be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-committee/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getCommitteeData()
                                this.getCommitteeDeletedData()
                            });
                    }
                })
            },

            committeeRestore(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Revert it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.get(`${this.backendUrl}club-committee/restore/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Restored!',
                                    response.data.message,
                                    'success'
                                )
                                this.getCommitteeDeletedData()
                                this.getCommitteeData()
                            });
                    }
                })
            },

            committeePermanentDelete(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-committee/force-delete/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getCommitteeDeletedData()
                                this.getCommitteeData()
                            });
                    }
                })
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

            /* ------ Gallery Method start ------ */
            galleryCreate() {
                this.editMode = false
                this.showMode = false
                this.onImageGalleryPreview = ""
                this.gallery_form.reset()
                this.gallery_form.clear()
                $("#galleryModal").modal("show");
            },

            galleryShow(item) {
                this.showMode = true
                this.editMode = false
                this.onImageGalleryPreview = item.club_gallery_image
                this.gallery_form.reset()
                this.gallery_form.clear()
                this.gallery_form.fill(item)
                $("#galleryModal").modal("show");
            },

            galleryEdit(item) {
                this.editMode = true
                this.showMode = false
                this.onImageGalleryPreview = item.club_gallery_image
                this.gallery_form.reset()
                this.gallery_form.clear()
                this.gallery_form.fill(item)
                this.gallery_form.club_gallery_image = ""
                $("#galleryModal").modal("show");
            },

            galleryStore() {
                this.$Progress.start()
                this.gallery_form.busy = true
                this.gallery_form.post(`${this.backendUrl}club-gallery`)
                    .then(response => {
                        this.getGalleryData()
                        $('#galleryModal').modal('hide')
                        if(this.gallery_form.successful){
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

            galleryUpdate() {
                this.$Progress.start()
                this.gallery_form.busy = true
                this.gallery_form.put(`${this.backendUrl}club-gallery/`+this.gallery_form.id)
                    .then(response => {
                        this.getGalleryData()
                        $('#galleryModal').modal('hide')
                        if(this.gallery_form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Club Committee Updated Successfully" });
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

            galleryDestroy(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You will be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-gallery/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getGalleryData()
                                this.getGalleryDeletedData()
                            });
                    }
                })
            },

            galleryRestore(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Revert it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.get(`${this.backendUrl}club-gallery/restore/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Restored!',
                                    response.data.message,
                                    'success'
                                )
                                this.getGalleryData()
                                this.getGalleryDeletedData()
                            });
                    }
                })
            },

            galleryPermanentDelete(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-gallery/force-delete/`+id)
                            .then(response => {
                                this.$swal.fire(
                                    'Deleted!',
                                    response.data.message,
                                    'success'
                                )
                                this.getGalleryData()
                                this.getGalleryDeletedData()
                            });
                    }
                })
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

            /* ------ Slider Method start ------ */
            sliderCreate() {
                this.editMode = false;
                this.showMode = false;
                this.onSliderImagePreview = "";
                this.slider_form.reset();
                this.slider_form.clear();
                $("#sliderModal").modal("show");
            },

            sliderShow(item) {
                this.showMode = true
                this.editMode = false
                this.onSliderImagePreview = item.image
                this.slider_form.reset()
                this.slider_form.clear()
                this.slider_form.fill(item)
                $("#sliderModal").modal("show");
            },

            sliderEdit(item) {
                this.editMode = true
                this.showMode = false
                this.onSliderImagePreview = item.image
                this.slider_form.reset()
                this.slider_form.clear()
                this.slider_form.fill(item)
                this.slider_form.club_slider_image = ""
                $("#sliderModal").modal("show");
            },

            onSliderImageChange(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    this.onSliderImagePreview = reader.result;
                    this.slider_form.club_slider_image = reader.result;
                }
                reader.readAsDataURL(file);
            },

            sliderStore() {
                this.$Progress.start()
                this.slider_form.busy = true
                this.slider_form.post(`${this.backendUrl}club-slider`)
                .then(response => {
                    this.getSliderData()
                    $('#sliderModal').modal('hide')
                    if(this.slider_form.successful){
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: "Club Slider Added Successfully" });
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

            sliderUpdate() {
                this.$Progress.start()
                this.slider_form.busy = true
                this.slider_form.put(`${this.backendUrl}club-slider/`+this.slider_form.id)
                .then(response => {
                    this.getSliderData()
                    $('#sliderModal').modal('hide')
                    if(this.slider_form.successful){
                        this.$Progress.finish()
                        this.$notify({ type: "success", title: "Success", text: "Club Slider Updated Successfully" });
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

            sliderDestroy(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "This slider will be soft-deleted. You can restore it later.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, soft-delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-slider/`+id)
                        .then(response => {
                            this.$swal.fire( 'Deleted!', response.data.message, 'success'
                            )
                            this.getSliderData()
                            this.getSliderDeletedData()
                        });
                    }
                })
            },

            sliderRestore(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to restore this slider?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Restore it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.get(`${this.backendUrl}club-slider/restore/`+id)
                        .then(response => {
                            this.$swal.fire( 'Restored!', response.data.message, 'success' )
                            this.getSliderData()
                            this.getSliderDeletedData()
                        });
                    }
                })
            },

            sliderPermanentDelete(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`${this.backendUrl}club-slider/force-delete/`+id)
                        .then(response => {
                            this.$swal.fire( 'Deleted!', response.data.message, 'success' )
                            this.getSliderData()
                            this.getSliderDeletedData()
                        });
                    }
                })
            },
            /* ------ Slider Method end ------ */

            generateSlug(title) {
                return slugify(title, {
                    replacement: '-',  // Replace spaces with '-'
                    lower: true        // Convert to lowercase
                });
            },

            getEventPath(title, club_short_name) {
                const slug = this.generateSlug(title);
                return `/clubs/${club_short_name}/single-media/${slug}`;
            },
        }
    }
</script>

<style scoped>
    p[readonly] {
        background-color: #f5f5f5;
        height: 100px;
        border: none;
        resize: none;
        overflow: auto;
        outline: none;
    }
</style>