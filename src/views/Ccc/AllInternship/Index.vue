<template>
  <div id="all-internship">
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
      <div class="container">
        <div class="page-banner-content">
          <h1>Internships</h1>
  
          <ul>
            <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
            <li>Pages</li>
            <li>internship</li>
          </ul>
        </div>
      </div>
    </div>
    <!--End Page Banner-->
  
    <!--Start News Details Area-->
    <div class="alumni-area pt-100 pb-70">
      <div class="container">
        <h2>{{ guideline.title }}</h2>
        <p v-html="guideline.description"></p>
        <div class="row">
          <div class="col-lg-6 mt-4">
            <div class="alumni-right-content">
              <div class="single-alumoni-updates-card" v-for="internship in internship_f3">
                <div class="row align-items-center" >
                  <div class="col-lg-12 col-md-12">
                    <div class="updates-content">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="time mb-2">
                            <p>start date   <i class="flaticon-time"></i>{{moment(internship.start_date).format('ll')}}</p>
                          </div>
                        </div>
                        <div class="col-md-6 event">
                          <div class="time mb-2 float-end">
                            <p>End date    <i class="flaticon-time"></i>{{moment(internship.end_date).format('ll')}}</p>
                          </div>
                        </div>
                      </div>
                      <h3 style="margin-bottom: 6px">
                        {{internship.title}}
                      </h3>
                      <!-- <router-link :to="{ path: 'single-internship', query:{internshipId:internship.id} }" class="default-btn btn float-end">
                        Read More<i class="flaticon-next">
                      </i></router-link> -->

                      <router-link class="default-btn btn float-end" :to="`/internships/${internship.slug}`">
                        Read More<i class="flaticon-next"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div v-show="!internships.length" class=" text-danger text-center">
          <div class="card-body">
              <h5 class="text-danger">No Content Available</h5>
             
          </div>
          </div>
          <div class="col-lg-6 mt-4">
            <div class="alumni-right-content">
              <div class="single-alumoni-updates-card" v-for="item in internship_l3">
                <div class="row align-items-center">
                  <div class="col-lg-12 col-md-12">
                    <div class="updates-content">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="time mb-2">
                            <p><i class="flaticon-time"></i>{{ moment(item.time,["HH.mm"]).format('hh:mm A') }}</p>
                          </div>
                        </div>
                        <div class="col-md-6 event">
                          <div class="time mb-2 float-end">
                            <p><i class="flaticon-time"></i>{{moment(item.date).format('ll')}}</p>
                          </div>
                        </div>
                      </div>
                      <h3 style="margin-bottom: 6px">
                        {{item.title}}
                      </h3>
                      <!-- <router-link :to="{ path: 'single-internship', query:{internshipId:internship.id} }" class="default-btn btn float-end">
                        Read More<i class="flaticon-next"></i>
                      </router-link> -->

                      <router-link class="default-btn btn float-end" :to="`/internships/${item.slug}`">
                        Read More<i class="flaticon-next"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <PaginationCCC
            :links = 'links'
            @get-data="getData"
    />
  </div>
</template>
  
  <style>
    .default-btn {
      background-color: #008000;
      color: #ffffff;
      font-size: 12px;
      padding: 2px 10px;
      border-radius: 0;
      position: relative;
      -webkit-transition: all ease 0.5s;
      transition: all ease 0.5s;
      border: 1px solid #008000;
      border-radius: 4px;
      z-index: 1;
    }
    .time p i{
      margin-bottom: 6px;
      color: #008000;
      position: relative;
      top: 2px;
      margin-right: 5px;
    }
  
    .paginations ul li a {
      text-align: center;
      height: 40px;
      width: 40px;
      line-height: 40px;
      border-radius: 100%;
      border: 1px solid #eeeeee;
      display: inline-block;
      -webkit-transition: all ease 0.5s;
      transition: all ease 0.5s;
      color: #111D5D;
      font-size: 13px;
      -webkit-box-shadow: 0 0 20px 3px rgb(0 0 0 / 5%);
      box-shadow: 0 0 20px 3px rgb(0 0 0 / 5%);
    }
    .paginations ul li a.active {
      background-color: #008000;
      color: #ffffff;
      border: 1px solid #008000;
    }
  </style>
  
  <script>
  import Cookies from 'js-cookie'
  import axios from "axios";
  import { useHead } from '@vueuse/head';
  import moment from 'moment';
  import PaginationCCC from "../../../components/Ccc/PaginationCCC.vue";
  export default {
    name: "CCCAbout",
    components: { PaginationCCC },
    data() {
      return {
        backendUrl: import.meta.env.VITE_API_BASE_URL,
        
        internships: [],
        internship_f3: [],
        internship_l3: [],
        guideline: [],
        moment: moment,
        links: []
      };
    },
  
    watch: {
      keyword: function () {
        this.getData();
        this.getGuideline();
      },
    },
  
    mounted() {
      this.getData();
      this.getGuideline();
    },

    beforeCreate() {
      useHead({title: 'Internship | EWU'});
    },
  
    methods: {
     
      getData(url) {
        let linkUrl = url ? url : `${this.backendUrl}internships`;
        axios
          .get(linkUrl)
          .then((response) => {

          this.links = response.data.data.links
          this.internships = response.data.data;

          this.internship_f3 = response.data.data.slice(0,3);
          this.internship_l3 = response.data.data.slice(3,6);

          // console.log(response.data.data)
  
        })
        .catch((e) => {
          console.log(e);
          this.$Progress.fail();
        });

      },
      getGuideline(url) {

      let guidelineUrl = url ? url : `${this.backendUrl}guideline/internship`;
        axios
        .get(guidelineUrl)
        .then((response) => {
          // console.log(response.data)
          this.guideline = response.data;
        })
        .catch((e) => {
          console.log(e);
          this.$Progress.fail();
        });
      },
    },
  };
  </script>
  