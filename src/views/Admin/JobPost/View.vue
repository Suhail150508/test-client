<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Job Details</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Jobs</a></li>
                        <li class="breadcrumb-item active">Job Details</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
                     
    <div class="row">
        <div class="col-xl-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="fw-semibold">Overview</h5>
                    <div class="table-responsive">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="col">Headline</th>
                                    <td scope="col">{{jobposts.headline}}</td>
                                </tr>

                                <tr>
                                    <th scope="col">Created By</th>
                                    <td scope="col" v-if="jobposts.user">{{jobposts.user.name}}</td>
                                    <td scope="col" v-else>...</td>
                                </tr>

                                <tr>
                                    <th scope="row">Application publish date</th>
                                    <td><span class="badge badge-soft-success">{{moment(jobposts.created_at).format("DD-MM-YYYY")}}</span></td>
                                </tr>

                                <tr>
                                    <th scope="row">Application deadline</th>
                                    <td><span class="badge badge-soft-danger">{{moment(jobposts.job_deadline).format("DD-MM-YYYY")}}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- <div class="hstack gap-2">
                        <button class="btn btn-soft-primary w-100">Apply Now</button>
                        <button class="btn btn-soft-danger w-100">Contact Us</button>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="col-xl-9">
            <div class="card">
                <div class="card-body border-bottom">
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <h5 class="fw-semibold">{{jobposts.job_title}}</h5>
                            <ul class="list-unstyled hstack gap-2 mb-0">
                                <li>
                                    <i class="bx bx-building-house"></i> <span class="text-muted">{{jobposts.company_name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <h5 class="fw-semibold mb-3">Job Context</h5>
                    <p v-html="jobposts.job_details"></p>
                </div>
            </div>
        </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
    <notifications />
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "job_post_view",

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      moment: moment,
      jobposts: [],
    };
  },

  watch: {
    keyword: function () {
      this.getData();
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
        axios.get(`${this.backendUrl}job-post/` + this.$route.query.jobId)
        .then((response) => {
            this.jobposts = response.data;
        })
        .catch((e) => {
            console.log(e);
        });
    },
  },
};
</script>