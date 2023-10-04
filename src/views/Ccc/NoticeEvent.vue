<template>
  <!--Start Page Banner-->
  <div class="page-banner-area bg-2">
    <div class="container">
      <div class="page-banner-content">
        <h1>Notice-Events</h1>

        <ul>
          <li><router-link :to="{ name: 'Ccc' }">Home</router-link></li>
          <li>Pages</li>
          <li>Notice-Events</li>
        </ul>
      </div>
    </div>
  </div>
  <!--End Page Banner-->

  <!--Start News Details Area-->
  <div class="alumni-area pt-100 pb-70">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="alumni-right-content">
            <div class="single-alumoni-updates-card" v-for="notice_event in notice_event_f3">
              <div class="row align-items-center" >
                <div class="col-lg-12 col-md-12">
                  <div class="updates-content">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="time mb-2">
                          <p><i class="flaticon-time"></i>{{ moment(notice_event.time,["HH.mm"]).format('hh:mm A') }}</p>
                        </div>
                      </div>
                      <div class="col-md-6 event">
                        <div class="time mb-2 float-end">
                          <p><i class="flaticon-time"></i>{{moment(notice_event.date).format('ll')}}</p>
                        </div>
                      </div>
                    </div>
                    <h3 style="margin-bottom: 6px">
                      {{notice_event.title}}
                    </h3>

                    <!-- <router-link :to="{ name: 'SinglecCccNoticeEvent', query:{id:notice_event.id} }" class="default-btn btn float-end">
                      Read More<i class="flaticon-next"></i>
                    </router-link> -->

                    <router-link class="default-btn btn float-end" :to="`/notice-event/${notice_event.slug}`">
                      Read More<i class="flaticon-next"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!notice_events.length" class=" text-danger text-center">
          <div class="card-body">
            <h5 class="text-danger">No Content Available</h5>
            <!-- <p class="card-text">There is no data available to display.</p> -->
          </div>
        </div>
        <div class="col-lg-6">
          <div class="alumni-right-content">
            <div class="single-alumoni-updates-card" v-for="item in notice_event_l3">
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

                    <!-- <router-link :to="{ name: 'SinglecCccNoticeEvent', query:{id:item.id} }" class="default-btn btn float-end">
                      Read More<i class="flaticon-next"></i>
                    </router-link> -->

                    <router-link class="default-btn btn float-end" :to="`/notice-event/${item.slug}`">
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
import axios from "axios";
import moment from 'moment';
import { useHead } from '@vueuse/head';
import PaginationCCC from "../../components/Ccc/PaginationCCC.vue";
export default {
  name: "CCCAbout",
  components: { PaginationCCC },
  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      notice_events: [],
      notice_event_f3: [],
      notice_event_l3: [],
      moment: moment,
      links: []
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

  beforeCreate() {
    useHead({title: 'Notice Events | EWU'});
  },

  created() {
    axios.get(`${this.backendUrl}get-seo-data`, { params: { site: 'ccc', module: 'home', page: 'noticeEvent' } })
    .then(response => {
      useHead({
        // title: response.data.data ? response.data.data.title : '',
        meta: [
          {name: 'keywords', content: response.data.data ? response.data.data.keywords : ''},
          {name: 'description', content: response.data.data ? response.data.data.description : ''}
        ],
      })
    })
    .catch(error => {
      console.error(error)
    })
  },

  methods: {
    getData(url) {
      let linkUrl = url ? url : `${this.backendUrl}notice-event`;
      axios
        .get(linkUrl)
        .then((response) => {
          this.links = response.data.links
          this.notice_events = response.data.data;
          this.notice_event_f3 = response.data.data.slice(0,3);
          this.notice_event_l3 = response.data.data.slice(3,6);
        })
        .catch((e) => {
          console.log(e);
          this.$Progress.fail();
        });
    },
  },
};
</script>
