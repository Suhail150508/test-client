<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
      >
        <h4 class="mb-sm-0 font-size-18">Dashboard</h4>

        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <a href="javascript: void(0);">Dashboards</a>
            </li>
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->

  <div class="row">
    <div class="col-xl-4">
      <div class="card overflow-hidden">
        <div class="bg-primary bg-soft">
          <div class="row">
            <div class="col-7">
              <div class="text-primary p-3">
                <h5 class="text-primary">Welcome Back !</h5>
                <p>Admin Dashboard</p>
              </div>
            </div>
            <!--<div class="col-5 align-self-end">
              <img :src="$store.state.image" :alt="Image" class="img-fluid"/>
            </div>-->
          </div>
        </div>
        <!--<div class="card-body pt-0">
          <div class="row">
            <div class="col-sm-4">
              <div class="avatar-md profile-user-wid mb-4">
                <img :src="$store.state.image" :alt="Image" class="img-thumbnail rounded-circle"/>
              </div>
              <h5 class="font-size-15 text-truncate">{{Admin}}</h5>
              <p class="text-muted mb-0 text-truncate">Admin</p>
            </div>

            <div class="col-sm-8">
              <div class="pt-4">
                <div class="row">
                  <div class="col-6">
                    <h5 class="font-size-15">{{departments}}</h5>
                    <p class="text-muted mb-0">Departments</p>
                  </div>
                  <div class="col-6">
                    <h5 class="font-size-15">{{students}}</h5>
                    <p class="text-muted mb-0">Students</p>
                  </div>
                </div>
                <div class="mt-4">
                  <a
                    href="javascript: void(0);"
                    class="btn btn-primary waves-effect waves-light btn-sm"
                    >View Profile <i class="mdi mdi-arrow-right ms-1"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-3">Popular Candidate</h4>
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div v-for="(items,index) in popularCandidates" :class="'carousel-item ' + (index===0 ? 'active' : '')" data-bs-interval="3000">
                <div v-for="(candidate,index) in items"  class="bg-light p-3 d-flex mb-3 rounded">
                  <img v-if="candidate.alumni" :src="candidate.alumni.source" alt="" class="avatar-sm rounded me-3">
                  <img v-else :src="$store.state.image" alt="" class="avatar-sm rounded me-3">
                  <div class="flex-grow-1">
                    <h5 class="font-size-15 mb-1">
                      <router-link :to="{ name: 'app.alumni_show', query: { id: candidate.id } }" class="text-body">
                        {{candidate.first_name}} {{candidate.middle_name}} {{candidate.last_name}}
                      </router-link>
                      <!--<span class="badge badge-soft-info">Freelance</span>-->
                    </h5>
                    <p class="mb-0 fs-6"><i class="bx bxs-school text-body align-middle"></i> {{candidate.organization}}</p>
                    <p class="mb-0 text-muted" v-if="candidate.country">
                      <i class="bx bx-map text-body align-middle"></i> {{ candidate.country.name }}
                    </p>
                  </div>
                  <div>
                    <div class="dropdown">
                      <button class="btn btn-soft-primary" type="button" id="dropdownMenuButton11" data-bs-toggle="dropdown">
                        <i class='bx bx-dots-vertical-rounded'></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton11">
                        <li>
                          <router-link :to="{ name: 'app.alumni_show', query: { id: candidate.id } }" class="dropdown-item">
                            View Details
                          </router-link>
                        </li>
                        <!--  <li><a class="dropdown-item" href="#">Download CV</a></li>-->
                      </ul>
                    </div>
                  </div>
                </div>
                <!--<div class="bg-light p-3 d-flex mb-3">
                  <img src="assets/images/users/avatar-2.jpg" alt="" class="avatar-sm rounded me-3">
                  <div class="flex-grow-1">
                    <h5 class="font-size-15 mb-2"><a href="candidate-overview.html" class="text-body">Charles Brown</a> <span class="badge badge-soft-success">Full Time</span></h5>
                    <p class="mb-0 text-muted"><i class="bx bx-map text-body align-middle"></i> Cambodia</p>
                  </div>
                  <div>
                    <div class="dropdown">
                      <button class="btn btn-soft-primary" type="button" id="dropdownMenuButton12" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class='bx bx-dots-vertical-rounded'></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton12">
                        <li><a class="dropdown-item" href="candidate-overview.html">View Details</a></li>
                        <li><a class="dropdown-item" href="#">Download CV</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="bg-light p-3 d-flex mb-3">
                  <img src="assets/images/users/avatar-2.jpg" alt="" class="avatar-sm rounded me-3">
                  <div class="flex-grow-1">
                    <h5 class="font-size-15 mb-2"><a href="candidate-overview.html" class="text-body">Charles Brown</a> <span class="badge badge-soft-success">Full Time</span></h5>
                    <p class="mb-0 text-muted"><i class="bx bx-map text-body align-middle"></i> Cambodia</p>
                  </div>
                  <div>
                    <div class="dropdown">
                      <button class="btn btn-soft-primary" type="button" id="dropdownMenuButton12" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class='bx bx-dots-vertical-rounded'></i>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton12">
                        <li><a class="dropdown-item" href="candidate-overview.html">View Details</a></li>
                        <li><a class="dropdown-item" href="#">Download CV</a></li>
                      </ul>
                    </div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-8">
      <div class="row">
        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Admin</p>
                  <h4 class="mb-0">{{admins}}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div
                    class="mini-stat-icon avatar-sm rounded-circle bg-primary"
                  >
                    <span class="avatar-title">
                      <i class="fas fa-user-lock font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Alumni</p>
                  <h4 class="mb-0">{{alumnus}}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div
                    class="avatar-sm rounded-circle bg-primary mini-stat-icon"
                  >
                    <span class="avatar-title rounded-circle bg-primary">
                      <i class="fas fa-user-graduate font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Student</p>
                  <h4 class="mb-0">{{students}}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div
                    class="avatar-sm rounded-circle bg-primary mini-stat-icon"
                  >
                    <span class="avatar-title rounded-circle bg-primary">
                      <i class="fas fa-user-edit font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Company</p>
                  <h4 class="mb-0">{{companies}}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div
                    class="avatar-sm rounded-circle bg-primary mini-stat-icon"
                  >
                    <span class="avatar-title rounded-circle bg-primary">
                      <i class="fas fa-warehouse font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Active users</p>
                  <h4 class="mb-0">{{ activeUserCount }}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div
                    class="mini-stat-icon avatar-sm rounded-circle bg-primary"
                  >
                    <span class="avatar-title">
                      <i class="fas fa-university font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Today's visitors</p>
                  <h4 class="mb-0">{{ todayTotalVisitorsCount }}</h4>
                </div>

                <div class="flex-shrink-0 align-self-center">
                  <div
                    class="avatar-sm rounded-circle bg-primary mini-stat-icon"
                  >
                    <span class="avatar-title rounded-circle bg-primary">
                      <i class="fas fa-laptop-house font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
      <div class="card">
        <div class="card-body">
          <div class="d-sm-flex flex-wrap">
            <h4 class="card-title mb-4">Statistics Jobs</h4>
          </div>

          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
      </div>

    </div>
  </div>

  <div class="row">
    <div class="col-xl-4">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4">Top Companies Posting Job</h4>

          <div class="text-center">
            <div class="mb-4">
              <i class="bx bx-briefcase-alt text-primary display-4"></i>
            </div>
            <h3>{{totalJobs}}</h3>
            <p>Total Jobs</p>
          </div>

          <div class="table-responsive mt-4">
            <table class="table align-middle table-nowrap">
              <tbody>
              <tr v-for="(latestJob,index) in maxCompanies">
                <td style="width: 30%">
                  <p class="mb-0">{{latestJob.company_name}}</p>
                </td>
                <td style="width: 25%">
                  <h5 class="mb-0">{{latestJob.count}}</h5></td>
                <td>
                  <div class="progress bg-transparent progress-sm">
                    <div v-if="index === 0" class="progress-bar bg-primary rounded" role="progressbar" :style="{ width: getWidth(latestJob.count) }" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                    <div v-if="index === 1" class="progress-bar bg-success rounded" role="progressbar" :style="{ width: getWidth(latestJob.count) }" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                    <div v-if="index === 2" class="progress-bar bg-warning rounded" role="progressbar" :style="{ width: getWidth(latestJob.count) }" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                    <div v-if="index === 3" class="progress-bar bg-danger rounded" role="progressbar" :style="{ width: getWidth(latestJob.count) }" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                    <div v-if="index === 4" class="progress-bar bg-info rounded" role="progressbar" :style="{ width: getWidth(latestJob.count) }" aria-valuenow="94" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-8">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-5">Activity</h4>
          <ul class="verti-timeline list-unstyled">
            <li class="event-list">
              <div class="event-timeline-dot">
                <i class="bx bx-right-arrow-circle font-size-18"></i>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-3">
                  <h5 class="font-size-14">{{moment(lastNewsFeed.created_at).format('DD MMM')}} <i class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                </div>
                <div class="flex-grow-1">
                  <div>
                    {{newsFeedCreator}} posted to “Alumni Portal“
                  </div>
                </div>
              </div>
            </li>
            <li class="event-list">
              <div class="event-timeline-dot">
                <i class="bx bx-right-arrow-circle font-size-18"></i>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-3">
                  <h5 class="font-size-14">{{moment(latestJobPost.created_at).format('DD MMM')}} <i class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                </div>
                <div class="flex-grow-1">
                  <div>
                    “{{latestJobPost.company_name}}“ created a <strong>{{latestJobPost.employment_status}}</strong> job for... <a href="javascript: void(0);">Read more</a>
                  </div>
                </div>
              </div>
            </li>
            <li class="event-list active">
              <div class="event-timeline-dot">
                <i class="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-3">
                  <h5 class="font-size-14">{{moment(groupMember.updated_at).format('DD MMM')}} <i class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                </div>
                <div class="flex-grow-1">
                  <div>
                    {{groupMemberDetails.username}} Joined the group “{{group.name}}”
                  </div>
                </div>
              </div>
            </li>
            <li class="event-list">
              <div class="event-timeline-dot">
                <i class="bx bx-right-arrow-circle font-size-18"></i>
              </div>
              <div class="d-flex">
                <div class="flex-shrink-0 me-3">
                  <h5 class="font-size-14">{{moment(eventActivities.updated_at).format('DD MMM')}} <i class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ms-2"></i></h5>
                </div>
                <div class="flex-grow-1">
                  <div>
                    {{eventAlumni.username}} <strong class="badge bg-primary">{{eventActivities.status}}</strong> Responded to the Event “{{event.name}}”
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!--<div class="text-center mt-4">
            <a href="javascript: void(0);" class="btn btn-primary waves-effect waves-light btn-sm">
              View More
              <i class="mdi mdi-arrow-right ms-1"></i>
            </a>
          </div>-->
        </div>
      </div>
    </div>

  </div>
  <!-- end row -->

  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4">Latest Jobs</h4>
          <div class="table-responsive">
            <table class="table align-middle table-nowrap mb-0">
              <thead class="table-light">
                <tr>
                  <th style="width: 20px">
                    <div class="form-check font-size-16 align-middle">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="transactionCheck01"
                      />
                      <label
                        class="form-check-label"
                        for="transactionCheck01"
                      ></label>
                    </div>
                  </th>
                  <th class="align-middle">ID</th>
                  <th class="align-middle">Title</th>
                  <th class="align-middle">Deadline</th>
                  <th class="align-middle">Vacancy</th>
                  <th class="align-middle">Salary</th>
                  <th class="align-middle">View Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(job, index) in latestJobs">
                  <td>
                    <div class="form-check font-size-16">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="transactionCheck02"
                      />
                      <label
                        class="form-check-label"
                        for="transactionCheck02"
                      ></label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript: void(0);" class="text-body fw-bold">{{index+1}}</a>
                  </td>
                  <td>{{job.job_title}}</td>
                  <td>{{job.job_deadline}}</td>
                  <td>{{job.no_of_vacancies}}</td>
                  <td>({{job.min_salary}} - {{job.max_salary}}) ৳</td>
                  <td>
                    <!-- Button trigger modal -->
                    <button
                      type="button"
                      class="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                      data-bs-toggle="modal"
                      data-bs-target=".transaction-detailModal"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- end table-responsive -->
        </div>
      </div>
    </div>
  </div>
  <!-- end row -->

  <!-- active user list -->
  <div class="card">
    <div class="row card-header bg-transparent border-bottom">
      <div class="col-md-8">
        <h3>Active user</h3>
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
                  <div class="col-md-2">
                      <strong>Search By :</strong>
                  </div>

                  <div class="col-md-3">
                      <select v-model="fieldName" id="fields" class="form-select form-select-sm">
                          <option value="name">Name</option>
                          <option value="Status">Status</option>
                      </select>
                  </div>

                  <div class="col-md-7">
                      <input v-model="keyword" type="text" placeholder="Search" style="margin: 0px; height: 27px; width: 100%" />
                  </div>
              </div>
          </div>
      </div>

      <table class="table table-bordered dt-responsive  nowrap w-100">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(user, index) of activeUsers">
            <tr v-if="user.active == true">
              <td>{{ index+1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.mobile }}</td>
              <td>
                <span class="badge badge-soft-primary" v-if="user.active == true">Active</span>
              </td>
            </tr>
          </template>

          <tr v-show="!activeUsers.length">
            <td colspan="6">
              <div class="alert alert-danger text-danger text-center" role="alert">
                No data available in table :(
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="activeUsers.length" class="d-flex">
        <div class="col-md-4 pl-0" style="margin: auto;" v-if="activeUsers.length">
            Showing {{ pagination.from }} to {{ pagination.to }} from {{ pagination.total  }} entiries
        </div>

        <PaginationComponent :links = 'links' @get-data="getData" />
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import PaginationComponent from "../../components/PaginationComponent.vue";
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { useHead } from '@vueuse/head';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
    name: 'dashboard',
    components: { PaginationComponent, Bar },

    data() {
      const today = new Date();
      const labels = [];
      const monthNumber = [];
      for (let i = 11; i >= 0; i--) {
        const monthName = new Date(today.getFullYear(), today.getMonth() - i, 1).toLocaleString('default', { month: 'long' });
        const month = new Date(today.getFullYear(), today.getMonth() - i, 1).getMonth() + 1;
        labels.push(monthName);
        monthNumber.push(month);
      }
      return {
        backendUrl: import.meta.env.VITE_API_BASE_URL,
        
        moment: moment,
        lastCompanies: [],
        newJobs: [],
        gotJobs: [],
        gotAlumnus: [],
        labels:labels,
        monthNumber:monthNumber,
        admins: '',
        alumnus: '',
        students: '',
        companies: '',
        departments: '',
        clubs: '',
        popularCandidates: '',
        totalJobs: '',
        latestJobs: '',
        maxCompanies: [],
        lastNewsFeed: [],
        newsFeedCreator: '',
        groupMember: '',
        group: '',
        groupMemberDetails: '',
        latestJobPost: [],
        eventActivities: [],
        event: '',
        eventAlumni: '',

        keyword: "",
        fieldName: "name",
        perPage: 10,
        pagination: [],
        links: [],
        activeUsers: [],
        todayTotalVisitorsCount: 0,

        chartOptions: {
          responsive: true,
          // Adjust the bar width here
          barPercentage: 0.8,
          categoryPercentage: 0.6
        }

      };
    },

    computed:{
      chartData() {
        return {
          labels: this.labels,
          // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','Sept','Oct','Nov','Dec'],
          datasets: [
            {
              label: 'Company',
              data: this.lastCompanies,
              fill: false,
              borderColor: '#3366CC',
              backgroundColor: '#3366CC',
              borderWidth: 1, // set the border width of the bars
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)', // set the background color when hovering over the bars
              hoverBorderColor: 'rgba(54, 162, 235, 1)', // set the border color when hovering over the bars
            },
            {
              label: 'New Jobs',
              data: this.newJobs,
              fill: false,
              borderColor: '#f1b44c',
              backgroundColor: '#f1b44c',
              borderWidth: 1, // set the border width of the bars
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)', // set the background color when hovering over the bars
              hoverBorderColor: 'rgba(54, 162, 235, 1)', // set the border color when hovering over the bars
            },
            /*{
              label: 'Hired',
              data: this.gotJobs,
              fill: false,
              borderColor: '#34c38f',
              backgroundColor: '#34c38f',
              borderWidth: 1, // set the border width of the bars
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)', // set the background color when hovering over the bars
              hoverBorderColor: 'rgba(54, 162, 235, 1)', // set the border color when hovering over the bars
            }*/
            {
              label: 'Alumni',
              data: this.gotAlumnus,
              fill: false,
              borderColor: '#34c38f',
              backgroundColor: '#34c38f',
              borderWidth: 1, // set the border width of the bars
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)', // set the background color when hovering over the bars
              hoverBorderColor: 'rgba(54, 162, 235, 1)', // set the border color when hovering over the bars
            }
          ]
        }
      },

      activeUserCount() {
        return this.activeUsers.filter(user => user.active).length;
      }
    },

    watch: {
      keyword: function () {
          this.getData();
      }
    },

    mounted() {
      useHead({title: 'Dashboard | EWU'});
      this.getData()
    },

    methods: {
      getData(url) {
        this.$Progress.start();
        axios.get(`${this.backendUrl}dashboard`)
                  .then((response) => {
              this.admins = response.data.admins;
              this.alumnus = response.data.alumnus;
              this.students = response.data.students;
              this.companies = response.data.companies;
              this.departments = response.data.departments;
              this.clubs = response.data.clubs;
                const sliced = [];
                for (let i = 0; i < response.data.popularCandidates.length; i += 3) {
                  sliced.push(response.data.popularCandidates.slice(i, i + 3));
                }
              this.popularCandidates = sliced;
              this.totalJobs = response.data.totalJobs;
              this.latestJobs = response.data.latestJobs;
              this.latestJobPost = response.data.latestJobs.slice(-1)[0];
              this.maxCompanies = response.data.maxCompanies;
              this.lastNewsFeed = response.data.lastNewsFeed;
              this.newsFeedCreator = response.data.newsFeedCreator;
              this.groupMember = response.data.groupMember;
              this.group = response.data.groupMember.group;
              this.groupMemberDetails = response.data.groupMember.alumni;
              this.eventActivities = response.data.eventActivities;
              this.event = response.data.eventActivities.event;
              this.eventAlumni = response.data.eventActivities.alumni;

              //show Last-companies
                const monthArray = new Array(12).fill(0);
                if (Array.isArray(response.data.lastCompanies)) {
                  response.data.lastCompanies.map((value, index) => {
                    const index2 = this.monthNumber.indexOf(parseInt(value.month));
                    if (index2 !== -1) {
                      const month = parseInt(index2);
                      monthArray[month] = value.count;
                    }
                  });
                }
                this.lastCompanies = monthArray;

              //show new jobs
                const monthsForNewJobs = new Array(12).fill(0);
                if (Array.isArray(response.data.newJobs)) {
                  response.data.newJobs.map((value, index) => {
                    const index2 = this.monthNumber.indexOf(parseInt(value.month));
                    if (index2 !== -1) {
                      const month = parseInt(index2);
                      monthsForNewJobs[month] = value.count;
                    }
                  });
                }
                this.newJobs = monthsForNewJobs;

              //show recent hiring
                const monthsForNewHiring = new Array(12).fill(0);
                if (Array.isArray(response.data.gotJobs)) {
                  response.data.gotJobs.map((value, index) => {
                    const index2 = this.monthNumber.indexOf(parseInt(value.month));
                    if (index2 !== -1) {
                      const month = parseInt(index2);
                      monthsForNewHiring[month] = value.count;
                    }
                  });
                }
                this.gotJobs = monthsForNewHiring;

                //show alumnus
                const monthsForAlumnus = new Array(12).fill(0);
                if (Array.isArray(response.data.gotAlumnus)) {
                  response.data.gotAlumnus.map((value, index) => {
                    const index2 = this.monthNumber.indexOf(parseInt(value.month));
                    if (index2 !== -1) {
                      const month = parseInt(index2);
                      monthsForAlumnus[month] = value.count;
                    }
                  });
                }
                this.gotAlumnus = monthsForAlumnus;
              })
            .catch((e) => {
              console.log(e);
              this.$Progress.fail();
            });

        // active user response start
        let linkUrl = url ? url :  `${this.backendUrl}active-users`;
        axios.get(linkUrl, {
          params: {
            per_page: this.perPage,
            field_name: this.fieldName,
            keyword: this.keyword,
          }
        })
        .then((response) => {
            this.activeUsers = response.data.data;
            // console.log(this.activeUsers);
            this.pagination = response.data.meta;
            this.links = response.data.meta.links;
        })
        .catch((e) => {
            console.log(e);
        });
        // active user response end

        // today total visitor start
        axios.get(`${this.backendUrl}today-user-logins`)
        .then((response) => {
          this.todayTotalVisitorsCount = response.data.count;
          // console.log(response.data.count);
        })
        .catch((e) => {
          console.log(e);
        })
        // today total visitor end
      },

      getWidth(count) {
        const total = this.maxCompanies.reduce((acc, item) => parseInt(acc) + parseInt(item.count), 0);
        return `${(count / total) * 100}%`;
      },    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#carouselExampleControls');
  });

  /*$(document).ready(function() {
    $('#carouselExampleControls').carousel();
  });*/
</script>

<style>

</style>
