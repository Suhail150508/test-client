<template>
  <div id="ccc-home">
    <!--Start Banner Area-->
    <div v-if="sectionSetup.sec_ccc_home_sliders === 'show'" class="banner-area">
      <!-- <div class="hero-slider2 style2">
        <div style="overflow: hidden">
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button v-for="(slider, index) in sliders" :key="index" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="`${index}`" :class="index == 0 ? 'active' : ''" aria-current="true" aria-label="Slide 1">--</button>

              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" v-for="(slider) in sliders">
                <img :src="slider.image" class="d-block w-100" :alt="slider.id">
                <div class="carousel-caption d-none d-md-block">
                  <h5 class="text-light">{{slider.title}}</h5>
                  <p class="text-light">{{slider.short_description}}</p>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

      </div> -->

      <Carousel :autoplay="3000" :itemsToShow="1" :wrapAround="true" :transition="1000">
        <Slide v-for="(slider, index) in sliders" :key="index">
          <div class="carousel__item custom_carousel_item">
            <img style="height:100%" class="d-block w-100"  :src="slider.image" :alt="slider.id" />
            <div v-if="slider.title" class="overlay"  style="background-color: rgba(0,0,0,.5);color:#fff;margin-top:8px;margin-buttom:8px;">
              <h4 class="text-white slider-title"><b>{{ slider.title }}</b></h4>
              <p class="text-white slider-desc">{{slider.short_description}}</p>
              <a v-if="slider.url" :href="slider.url" class="btn btn-danger rounded-6">View Details</a>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <!-- <Pagination /> -->
        </template>
      </Carousel>
        <google-search-bar class="text-center m-3"></google-search-bar>
    </div>
    <!--End Banner Area-->

    <!--Start Education Area-->
    <div class="eduction-area">
        <div class="container-fluid p-0">
            <div class="row g-0">
                <div class="col-lg-3 col-md-6">
                    <div class="single-education-card bg-1">
                        <div class="edication-content">
                            <div class="icon">
                                <i class="flaticon-college"></i>
                            </div>
                            <router-link :to="{name: 'AllInternships'}"><h3>Internship</h3></router-link>
                            <router-link :to="{name: 'AllInternships'}" class="read-more-btn white-color">Show more<i class="flaticon-next"></i></router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="single-education-card bg-2">
                        <div class="edication-content">
                            <div class="icon">
                                <i class="flaticon-student-with-graduation-cap"></i>
                            </div>
                            <router-link :to="{name: 'AllTrainings'}"><h3>Training</h3></router-link>
                            <router-link :to="{name: 'AllTrainings'}" class="read-more-btn white-color">Show more<i class="flaticon-next"></i></router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="single-education-card bg-3">
                        <div class="edication-content">
                            <div class="icon">
                                <i class="flaticon-college-graduation"></i>
                            </div>
                            <router-link :to="{name: 'AllWorkshopSeminar'}"><h3>Workshop & Seminar</h3></router-link>
                            <router-link :to="{name: 'AllWorkshopSeminar'}" class="read-more-btn white-color">Show more<i class="flaticon-next"></i></router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="single-education-card bg-4">
                        <div class="edication-content">
                            <div class="icon">
                                <i class="flaticon-athletics"></i>
                            </div>
                            <router-link :to="{name: 'AllClubs'}"><h3>Clubs</h3></router-link>
                            <router-link :to="{name: 'AllClubs'}" class="read-more-btn white-color">Show more<i class="flaticon-next"></i></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End Education Area-->

    <!--Start who we are-->
    <div v-if="sectionSetup.sec_ccc_home_whoWeAre === 'show'"  v-show="Object.keys(whoWeAre).length != 0" class="campus-information-area pb-70">
      <div class="container">
        <div class="who-we-are-section-title">
          <h2> {{ settingKeyAndValueArray.whoWeAreTitle }} </h2>
        </div>
        <div class="row bg-1E446F">
          <div class="col-lg-4">
            <div class="campus-content m-4">
              <div class="campus-title">
                <p class="textColorWhite" style="text-align: justify" v-html="whoWeAre.description"></p>
              </div>
            </div>
          </div>

          <div
          v-if="whoWeAre.video_url !=null"
            class="col-lg-8">
            <div class="single-stories-card m-4">
            <iframe
                :src="whoWeAre.youtube_video_id"
                style="border: 2px solid white"
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> 

            </div>
          </div>

          <div 
          v-else class="col-lg-8">
            <div class="single-stories-card m-4">
            <iframe
                :src="whoWeAre.video"
                style="border: 2px solid white"
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> 

            </div>
          </div>

          <!--<div class="more-health-care text-center mb-4">
            <router-link
              :to="{ name: 'TalkToOurTeam' }"
              class="button-talk-to-team read-more-btn active"
            >
              Talk to our Team
            </router-link>
          </div>-->
        </div>
      </div>
    </div>
    <!--End who we are-->

    <!--Start Admisssion Area-->
    <!-- <div class="admisssion-area ptb-100 admission-bg">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                    <div class="admission-left-content">
                        <h2> {{ settingKeyAndValueArray.cccTalkToOurTeamTitle }} </h2>
                        <p> {{ settingKeyAndValueArray.cccTalkToOurTeamSubTitle }} </p>
                        <h2>You're Learning Free Started Today!</h2>
                        <p>"Education is not just about academics; it is about nurturing the holistic well-being of students. The Office of the Student's Welfare plays a vital role in creating an environment that supports and uplifts every student, fostering their growth, and enabling them to thrive."</p>
                        <router-link :to="{ name: 'TalkToOurTeam' }" class="default-btn btn" style="padding: 10px;">
                            Talk to our Team<i class="flaticon-next"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <div class="admisssion-area ptb-100 admission-bg" :style="{backgroundImage: 'url(' + settingKeyAndValueArray.cccTalkToOurTeamImage + ')'}">
      <div class="container">
          <div class="row align-items-center">
              <div class="col-lg-6 col-md-6">
                  <div class="admission-left-content">
                      <h2> {{ settingKeyAndValueArray.cccTalkToOurTeamTitle }} </h2>
                      <p> {{ settingKeyAndValueArray.cccTalkToOurTeamSubTitle }} </p>
                      <router-link :to="{ name: 'TalkToOurTeam' }" class="default-btn btn" style="padding: 10px;">
                          Talk to our Team<i class="flaticon-next"></i>
                      </router-link>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <!--End Admisssion Area-->

    <!--Start ccc news Area-->
    <div v-if="sectionSetup.sec_ccc_home_news === 'show'" class="campus-life-area ptb-50">
      <div class="container">
        <div class="section-title">
          <h2> {{ settingKeyAndValueArray.cccNewsTitle }} </h2>
          <p> {{ settingKeyAndValueArray.cccNewsSubTitle }} </p>
        </div>
       
        <div class="row justify-content-center">
          <div v-for="(item, index) in cccnews" class="col-lg-4 col-md-6">

            <div class="single-campus-card">
              <div class="img">
                <a href="#">
                  <img v-if="item['images'][0]" width="420" height="230" :src="item['images'][0].source" :alt="item.id" >
                  <img v-else width="420" height="230" :src="$store.state.avatar" :alt="$store.state.alt" />
                </a>
              </div>
              <div class="campus-content">
                  <!-- <router-link :to="{ path: 'special-news', query: { newsId: item.id }}">
                    <h6>{{ item.title.substring(0,62) }} {{item.title.length >= 62 ? `...` : ''}}</h6>
                  </router-link> -->

                  <router-link :to="`/special-news/${item.slug}`">
                    <h6>{{ item.title.substring(0,62) }} {{item.title.length >= 62 ? `...` : ''}}</h6>
                  </router-link>
                  
                 <span>Publish Date: {{ item.publish_date }}</span> 
              </div>
            </div>
          </div>
        </div>
        <div class="more-campus text-center">
          <p>
            View From Hundreds of Career Counseling News.
            <router-link class="read-more-btn active" :to="{ name: 'AllNews' }">More on Career Counseling Center News <i class="flaticon-next"></i></router-link>
          </p>
        </div>
      </div>
    </div>
    <!--END ccc news Area-->

    <!-- Notic part start -->
    <div v-if="sectionSetup.sec_ccc_home_notice_events === 'show'" class="podcasts-area ptb-50 bg-f4f6f9">
      <div class="col-lg-8 container">
        <div class="row justify-content-center notice-header">
          <div class="bg-f4f6f9 text-center" style="padding: 15px">
            <h2> {{ settingKeyAndValueArray.NoticeEventsTitle }} </h2>
          </div>
          <hr class="notice-header-hr" />
          <div v-for="notice_event of notice_events" class="bg-f4f6f9">
            <hr class="notice-body-hr" />
            <div class="row align-items-center">
              <div class="col-lg-2 col-md-2">
                <h4 class="text-center">{{ moment(notice_event.time,["HH.mm"]).format('hh:mm a') }}</h4>
                <h6 class="text-center">{{moment(notice_event.date).format('ll')}}</h6>
              </div>
              <div class="col-lg-9 col-md-9 text-center">
                <!-- <router-link :to="{ name: 'SinglecCccNoticeEvent', query:{id:notice_event.id} }" style="color: #0608a0; font-weight: 500">
                  {{ notice_event.title }}
                </router-link> -->

                <router-link style="color: #0608a0; font-weight: 500" :to="`/notice-event/${notice_event.slug}`">
                  {{ notice_event.title }}
                </router-link>
              </div>
              <div class="col-lg-1 col-md-1 text-center">
                <!-- <i class="flaticon-user"></i> -->
                <!-- <i class="fa-sharp fa-solid fa-calendar-days"></i> -->
                <!-- <i class="fa-sharp fa-solid fa-bell"></i> -->
                <img :src="$store.state.notice_event" :alt="Image" class="rounded-circle" height="34" />
                <!-- <i class="notice_event.icon"></i> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Notic part end -->

    <!--Start placement Area-->
    <div v-if="sectionSetup.sec_ccc_home_recent_placements === 'show'" class="eduction-area">
      <div class="container-fluid p-0">
        <div class="row g-0 bg-1E446F justify-content-center pb-3 pt-3">
          <div class="col-lg-8 col-md-8 text-center text-white">
            <h2 class="text-white"> {{ settingKeyAndValueArray.recentPlacementTitle }} </h2>
            <p class="text-white"> {{ settingKeyAndValueArray.recentPlacementSubTitle }} </p>
          </div>
        </div>
        <div class="d-flex justify-content-center pt-3 pb-3 bg-E2F0FF">
          <div class="row col-md-8">
            <div v-for="(item,index) in recentPlacementUsers" class="col-lg-2 col-md-3 mb-3">
              <img v-if="item.alumni.alumni" :src="item.alumni.alumni.source" :alt="item.alumni.id">
              <img v-else :src="$store.state.avatar" :alt="$store.state.alt" />
              <div class="image-details text-center">
                <div class="title">
                  <h5>{{ item.alumni.first_name }} {{ item.alumni.middle_name }} {{ item.alumni.last_name }}</h5>
                  <h6>{{ item.designation_department }}</h6>
                </div>
                <p style="line-height: 1; font-size: 12px">
                  {{ item.company_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--End placement Area-->

    <!--Start career tips and tricks Area-->
    <div v-if="sectionSetup.sec_ccc_home_career_tips_tricks === 'show'" class="campus-life-area mt-5">
      <div class="container">
        <div class="section-title">
          <h2> {{ settingKeyAndValueArray.careerTipsAndTricksTitle }} </h2>
          <p style="color: #111d5e;"> {{ settingKeyAndValueArray.careerTipsAndTricksSubTitle }} </p>
        </div>
        <div class="row justify-content-center">
          <div v-for="(item) in careerTips" class="col-lg-4 col-md-6">
            <div class="single-campus-card">
              <div class="img">
                <a href="#">
                  <img width="420" :src="item.image" :alt="item.id" />
                </a>
              </div>
              <div class="campus-content">
                <a href="#">
                  <!-- <router-link :to="{ path: 'single-career-tips', query: { tipsId: item.id }}">
                    <h6>{{ item.title.substring(0,42) }} {{item.title.length >= 42 ? `...` : ''}}</h6>
                  </router-link> -->

                  <router-link :to="`/single-career-tips/${item.slug}`">
                    <h6>{{ item.title.substring(0,42) }} {{item.title.length >= 42 ? `...` : ''}}</h6>
                  </router-link>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="more-campus text-center">
          <p>
            View From Hundreds of Tips and tricks.
            <router-link class="read-more-btn active" :to="{name: 'allCareerTips'}">
              More on CAREER TIPS AND TRICKS <i class="flaticon-next"></i>
            </router-link>
            <!--<a
              href="{{ url('career-tips-and-ticks') }}"
              class="read-more-btn active"
              >More on CAREER TIPS AND TRICKS <i class="flaticon-next"></i
            ></a>-->
          </p>
        </div>
      </div>
    </div>
    <!--End career tips and tricks Area-->

    <!-- Resources part start -->
    <div v-if="sectionSetup.sec_ccc_home_resources === 'show'" class="academics-area ptb-50 mt-5 bg-f4f6f9">
      <div class="container col-md-8">
        <div class="section-title">
          <h2> {{ settingKeyAndValueArray.resourcesTitle }} </h2>
          <p> {{ settingKeyAndValueArray.resourcesSubTitle }} </p>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="academics-left-content">
              <div class="row justify-content-center">

                <div class="col-lg-4 col-sm-6" v-for="(item) in resources">
                  <div class="single-academics-card3">
                    <div class="icon">
                      <i :class="item.icon_class"></i>
                    </div>
                    <h3>{{item.title.substring(0,32)}} {{item.title.length >= 32 ? `...` : ''}}</h3>
                    <p v-html="item.description.substring(0, 42) + (item.description.length >= 42 ? '...' : '')"></p>

                    <!-- <router-link :to="{ path: 'resource-single', query: { resourceId: item.id }}" class="read-more-btn">
                      Read More<i class="flaticon-next"></i>
                    </router-link> -->

                    <router-link class="read-more-btn" :to="`/resource-all/${item.slug}`">
                      Read More<i class="flaticon-next"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="more-health-care text-center">
          <router-link class="view-all-button read-more-btn active" :to="{name: 'AllResources'}">View All</router-link>
        </div>
      </div>
    </div>
    <!-- Resources part end -->

    <!--We successfully placed our student at part start-->
    <div v-if="sectionSetup.sec_ccc_home_company_partners === 'show'" class="health-care-area ptb-50 bg-white">
      <div class="container col-md-12">
        <div class="section-title">
          <h2> {{ settingKeyAndValueArray.successfullyPlacedStudentTitle }} </h2>
        </div>

          <Carousel :itemsToShow="carouselItemsToShow" :wrapAround="true" :transition="500">
              <Slide v-for="(item, index) in partners" :key="index">
                  <div class="container-fluid p-0">
                      <div class="row g-0 p-2">
                          <div class="col-lg-12">
                              <div class="single-news-card mb-0">
                                  <div class="row align-items-center">
                                      <div class="col-lg-12 col-md-12">
                                          <div class="card-container partner-image" style="height: 160px;">
                                              <img v-if="item.image" class="mt-3 mb-3 rounded-4" :src="item.image" :alt="item.id">
                                              <img v-else class="mt-3 mb-3 rounded-4" :src="$store.state.avatar" :alt="$store.state.alt" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Slide>

              <template #addons>
                  <Navigation />
                  <!-- <Pagination /> -->
              </template>
          </Carousel>

          <!--<div class="row justify-content-center">
            <div class="col-lg-2 col-md-4" v-for="(item, index) in partners">
              <div class="single-stories-card text-center" >
                <img class="logo-img img-fluid" :src="item.image" :alt="$store.state.alt"/>
              </div>
            </div>
          </div>-->
      </div>
    </div>
    <!--We successfully placed our student at part end-->
  </div>
</template>

<script>
import axios from "axios";
import { useHead } from '@vueuse/head';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import GoogleSearchBar from '../../Components/GoogleSearchBar.vue';
import moment from 'moment';

export default {
  name: "CccHome",

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    GoogleSearchBar,
  },

  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      moment: moment,
      recentPlacementUsers: [],
      test: "this is test mgs",
      cccnews: [],
      whoWeAre: [],
      careerTips: [],
      notice_events: [],
      partners: [],
      resources: [],
      sliders: [],
      carouselItemsToShow: 6, // Default number of partner carousel items to show
      sectionSetup: {
        sec_ccc_home_sliders: '',
        sec_ccc_home_whoWeAre: '',
        sec_ccc_home_news: '',
        sec_ccc_home_notice_events: '',
        sec_ccc_home_recent_placements: '',
        sec_ccc_home_career_tips_tricks: '',
        sec_ccc_home_resources: '',
        sec_ccc_home_company_partners: '',
      },

      // site settings
      settingKeyAndValueArray: [
        'whoWeAreTitle',
        'cccNewsTitle',
        'cccNewsSubTitle',
        'cccTalkToOurTeamTitle',
        'cccTalkToOurTeamSubTitle',
        'cccTalkToOurTeamImage',
        'NoticeEventsTitle',
        'NoticeEventsSubTitle',
        'recentPlacementTitle',
        'recentPlacementSubTitle',
        'careerTipsAndTricksTitle',
        'careerTipsAndTricksSubTitle',
        'resourcesTitle',
        'resourcesSubTitle',
        'successfullyPlacedStudentTitle',
        'successfullyPlacedStudentSubTitle'
      ]
    };
  },

  watch: {
    keyword: function () {
      this.getData();
    },
  },

  mounted() {
    this.getData();

    // site settings
    this.$setting(this.settingKeyAndValueArray).then(value => {
      this.settingKeyAndValueArray = value;
      console.log(this.settingKeyAndValueArray);
    })

      this.updateCarouselItemsToShow(); // Call the method on initial load
      window.addEventListener("resize", this.updateCarouselItemsToShow); // Listen for resize events

  },

  beforeCreate() {
    useHead({title: 'Home | EWU'});
  },

  created() {
    axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'index' } })
    .then(response => {
      useHead({
        // title: response.data.data ? response.data.data.title : '',
        meta: [
          {name: 'keywords', content: response.data.data ? response.data.data.keywords : ''},
          {name: 'description', content: response.data.data ? response.data.data.description : ''}
        ],
      })
    }).catch(error => {
      console.error(error)
    })

    axios.get(`${this.backendUrl}setting/section`,{params:{siteFrom:'ccc-home'}})
    .then((response)=>{
      this.sectionSetup = response.data;
      console.log(this.sectionSetup,response.data)
    }).catch(error => {
      console.error(error)
    })
  },

  methods: {
    getData() {
      // recent placement users response
      axios.get(`${this.backendUrl}recent-placement`)
      .then((response) => {
          this.recentPlacementUsers = response.data;
      }).catch((e) => {
          this.$Progress.fail();
          console.log(e);
      });

      let newsLinkUrl = `${this.backendUrl}news`;
      axios.get(newsLinkUrl,{params:
        {
          place:'ccc_home',
        }
      })
        .then((response) => {

          console.log(response.data.data)
          console.log('ccc news hello')
          this.cccnews = response.data.data.slice(0, 6);
          console.log(this.cccnews);
        })
        .catch((e) => {
          this.$Progress.fail();
        });

      // who-we-are response
      axios.get(`${this.backendUrl}whoWeAre`,{params:{type:'ccc'}}).then((response) => {
          this.whoWeAre = response.data;
          console.log(this.whoWeAre.video_url)
          console.log('this who we are')
        }).catch((e) => { this.$Progress.fail();});


      axios
        .get(`${this.backendUrl}career-tips`)
        .then((response) => {
          this.careerTips = response.data.data.slice(0,3);
        })
        .catch((e) => {
          this.$Progress.fail();
        });

      // ccc notice-event response
      let noticeEventlinkUrl = `${this.backendUrl}notice-event`;
      axios.get(noticeEventlinkUrl).then((response) => {
          this.notice_events = response.data.data;
        }).catch((e) => {
          this.$Progress.fail();
        });

      // partner companies response
      axios.get(`${this.backendUrl}partner`).then((response) => {
        this.partners = response.data.data;
      }).catch((e) => { this.$Progress.fail();});

      // partner companies response
      axios.get(`${this.backendUrl}resource`).then((response) => {
        this.resources = response.data.data.slice(0,6);
      }).catch((e) => { this.$Progress.fail();});

      // Slider companies response
      axios.get(`${this.backendUrl}slider`,{params:{place:'ccc_home'}}).then((response) => {
        this.sliders = response.data.data.slice(0,3);
      }).catch((e) => { this.$Progress.fail();});

    },

    updateCarouselItemsToShow() {
      if (window.innerWidth <= 768) {
          // Mobile view
          this.carouselItemsToShow = 3; // Set the number of items to show for mobile view
      } else {
          // Wider screens
          this.carouselItemsToShow = 6; // Set the number of items to show for wider screens
      }
    },

    beforeDestroy() {
        window.removeEventListener("resize", this.updateCarouselItemsToShow); // Remove the event listener on component destruction
    },
    

  },
};
</script>

<style >
.custom_carousel_item {
  min-height: 200px;
  width: 100%;
  height: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  text-align: center;
}

.admisssion-area.admission-bg::before {
  position: absolute;
  content: '';
  /* background: rgba(17, 29, 94, 0.75); */
  background: rgba(0, 0, 0, 0.13);
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.welcome {
  background-color: #558A2E;
}

.text-white-90 {
  color: rgba(255, 255, 255, 0.9);
}

.nopadding {
   padding: 0 !important;
   margin: 0 !important;
}

.img-custom-thumbnail {
  /* padding: 0.25rem; */
  background-color: #fff;
  border: 1px solid #ffffff;
  /* border-radius: 0.375rem; */
  max-width: 100%;
  height: auto;
}

.img__wrap {
  position: relative;
  height: 100%;
  width: 100%;
}

.img__description_layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(178, 184, 206, 0.6);
  color: #fff;
  visibility: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
}

.img__wrap:hover .img__description_layer {
  visibility: visible;
  opacity: 1;
}

.img__description {
  transition: .2s;
  transform: translateY(1em);
}

.img__wrap:hover .img__description {
  transform: translateY(0);
}
html, body {
    max-width: 100%;
    overflow-x: hidden;
}
.card-container.partner-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-container.partner-image img {
    height:135px;
    width:160px
}

/* Media query for screens up to 968 */
@media (max-width: 1168px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 13px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 8px;
  }
    .card-container.partner-image img {
        height:120px;
        width:130px
    }
}

/* Media query for screens up to 768px */
@media (max-width: 968px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 12px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 8px;
  }
  .card-container.partner-image img {
    height:120px;
    width:120px
  }
}

/* Media query for screens up to 768px */
@media (max-width: 968px) {
    .overlay {
        padding: 3px;
    }
    .slider-title {
        font-size: 12px;
    }
    .slider-desc {
        font-size: 7px;
        display: none;
    }
    .overlay a {
        font-size: 8px;
    }
}

/* Media query for screens up to 768px */
@media (max-width: 768px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 11px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 7px;
  }
  .card-container.partner-image img {
    height:120px;
    width:110px
  }
}

/* Media query for screens up to 576px */
@media (max-width: 576px) {
  .overlay {
    padding: 3px;
  }
  .slider-title {
    font-size: 10px;
  }
  .slider-desc {
    font-size: 7px;
    display: none;
  }
  .overlay a {
    font-size: 7px;
  }
  .card-container.partner-image img {
    height:100px;
    width:100px
  }
}

p.textColorWhite p{
  color:white !important;
}
</style>