<template>
    <div id="ccc-header">
        <header>
             <!--Start Preloader Area
            <div class="preloader-area">
                <div class="spinner">
                    <div class="inner">
                        <div class="disc"></div>
                        <div class="disc"></div>
                        <div class="disc"></div>
                    </div>
                </div>
            </div>
             End Preloader Area-->

            <!--Strat Top Header Area-->
            <!--<div class="top-header-area">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-6"></div>
                        <div class="col-lg-6 col-md-6">
                            <div class="header-right-content">
                                <div class="list">
                                    <ul>
                                        <li><a href="#">Students</a></li>
                                        <li><a href="#">Faculty & Staff</a></li>
                                        <li>
                                            <a href="http://alumni.fscd.xyz">Alumni</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            <!--End Top Header Area-->
          
            <!-- Start Navbar Area -->
        
            <div class="navbar-area nav-bg-1">
                <div class="mobile-responsive-nav">
                    <div class="container">
                        <div class="mobile-responsive-menu">
                            <div class="logo">
                                <router-link :to="{ name: 'Ccc' }" class="navbar-brand">
                                    <img :src="settingKeyAndValueArray.cccHeaderLogo" alt="logo" style="height: 45px;">
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
             
                <div class="desktop-nav">
                    <div class="container-fluid">
                        <nav class="navbar navbar-expand-md navbar-light">
                            <router-link :to="{ name: 'Ccc' }" class="navbar-brand float-left">
                                <img class="header-logo" :src="settingKeyAndValueArray.cccHeaderLogo" alt="logo" style="height: 45px;">
                            </router-link>

                            <!-- <div class="col-md-4">
                                <div>
                                    <MarqueeText
                                    v-if="marqueeItems.length > 0"
                                    :repeat="4"
                                    :paused="isPaused"
                                    :scrollamount="20"
                                    :duration="10"
                                    @mouseenter="isPaused = !isPaused"
                                    @mouseleave="isPaused = false"
                                    >
                                        <template v-for="item in marqueeItems">
                                            <i class="fa-solid fa-star text-danger" style="margin-left: 20px"></i> <a class="text-warning" :href="item.url">{{ item.title }}</a>
                                        </template>
                                    </MarqueeText>
                                </div>

                                <marquee width="100%"  direction="left" scrollamount="8" class="text-primary text-bold" onmouseover="this.stop();" onmouseout="this.start();">
                                    <a v-for="item in marqueeItems" :key="item.id" :href="item.url">{{ item.title }}</a>
                                </marquee>
                            </div> -->

                            <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <router-link :to="{ name: 'Ccc' }" class="nav-link active">
                                            Home
                                        </router-link>
                                        <ul class="dropdown-menu">
                                            <li class="nav-item">
                                                <router-link
                                                    :to="{ name: 'Ccc-about' }"
                                                    class="nav-link"
                                                >
                                                About CCC
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'noticeEvent' }"
                                                    class="nav-link"
                                                >
                                                    Notice-Events
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'Ccc-updates' }"
                                                    class="nav-link"
                                                >
                                                    CCC Updates
                                                </router-link>
                                                <!--<router-link :to="{ name: 'Ccc' }" class="nav-link">
                                                    Recent Placement
                                                </router-link>-->
                                                <!--<router-link :to="{ name: 'Ccc' }" class="nav-link">
                                                    Audio-Video
                                                </router-link>-->
                                                <router-link :to="{ name: 'Ccc-faq' }" class="nav-link">
                                                    FAQ
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a href="#" class="nav-link"> Introduction </a>

                                        <ul class="dropdown-menu">
                                            <li class="nav-item">
                                                <router-link :to="{ name: 'what_to_expect' }" class="nav-link">
                                                    What to expect?
                                                </router-link>

                                                <router-link :to="{ name: 'are_you_in_crisis' }" class="nav-link">
                                                    Are You in a crisis?
                                                </router-link>

                                                <router-link :to="{ name: 'who_should_you_meet' }" class="nav-link">
                                                    Who should you meet?
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a href="#" class="nav-link"> Function & Service </a>

                                        <ul class="dropdown-menu">
                                            <li class="nav-item">
                                                <!-- <a href="http://127.0.0.1:5173/internships" class="nav-link">
                                                    Internship
                                                </a> -->
                                                <router-link :to="{ name: 'AllInternships' }" class="nav-link">
                                                    Internship
                                                </router-link>

                                                <!-- <ul class="dropdown-menu">
                                                    <li class="nav-item">
                                                        <a href="#" @click="create" class="nav-link">Registration</a>
                                                    </li>

                                                    <li class="nav-item">
                                                        <router-link :to="{ name: 'Ccc-guideline' }" class="nav-link">
                                                            Guideline
                                                        </router-link>
                                                    </li>
                                                </ul> -->
                                            </li>

                                            <li class="nav-item">
                                                <!-- <a href="#" class="nav-link"> Training </a> -->
                                                <router-link :to="{ name: 'AllTrainings' }" class="nav-link">
                                                    Training/Workshop/Seminar
                                                </router-link>

                                                <!-- <ul class="dropdown-menu">
                                                    <li class="nav-item">
                                                        <a href="#" class="nav-link">Registration</a>
                                                    </li>

                                                    <li class="nav-item">
                                                        <a href="#" class="nav-link">Notice</a>
                                                    </li>
                                                </ul> -->
                                            </li>

                                            <li class="nav-item">
                                                <router-link :to="{ name: 'AllWorkshopSeminar' }" class="nav-link">
                                                  Socio-Psyche Counseling
                                                </router-link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a href="https://jobs1.ewubd.edu/" class="nav-link">Job Portal</a>
                                    </li>

                                    <li class="nav-item">
                                        <a href="https://alumni.ewubd.edu/" class="nav-link">Graduate Profile</a>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{ name: 'AllClubs' }" class="nav-link">
                                            Clubs
                                        </router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{ name: 'CCCContactUs' }" class="nav-link">
                                            Contact Us
                                        </router-link>
                                    </li>

                                    <li class="nav-item">
                                        <router-link :to="{ name: 'student_feedback' }" class="nav-link">
                                            Feedback
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

                <!--<div class="others-option-for-responsive">
                    <div class="container">
                        <div class="dot-menu">
                            <div class="inner">
                                <div class="icon">
                                    <i
                                            class="ri-menu-3-fill"
                                            data-bs-toggle="modal"
                                            data-bs-target="#sidebarModal"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div>

            <div class="row bg-1E446F">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <marquee width="100%" direction="left" scrollamount="8" class="text-primary text-bold" onmouseover="this.stop();" onmouseout="this.start();">
                        <a v-for="(item, index) in marqueeItems" :key="item.id" :href="item.url">
                            <i class="fa fa-star" style="font-size: 12px; margin-right: 3px; color: white;"></i>
                            <span style="color: #FFEB3B;">{{ item.title }}</span>
                            <span class="separator" v-if="index < marqueeItems.length - 1"></span>
                        </a>
                    </marquee>

                    <!--<MarqueeText
                    v-if="marqueeItems.length > 0"
                    :repeat="4"
                    :paused="isPaused"
                    :scrollamount="20"
                    :duration="10"
                    @mouseenter="isPaused = !isPaused"
                    @mouseleave="isPaused = false"
                    >
                        <template v-for="item in marqueeItems">
                            <i class="fa-solid fa-star text-danger" style="margin-left: 20px"></i> <a class="text-white" :href="item.url">{{ item.title }}</a>
                        </template>
                    </MarqueeText>-->
                </div>
                <div class="col-md-2"></div>
            </div>
            <!-- End Navbar Area -->
        </header>
    </div>

    <!--Start Register Area-->
    <div class="modal fade" id="exampleModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="register-area">
                    <div class="container">
                        <div class="register">
                            <h3>Internship Registration</h3>
                            <!--<form>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <input type="email" id="email" class="form-control" placeholder="Phone Or Email Address*">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                            <input type="text" id="name" class="form-control" placeholder="First Name*">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                            <input type="text" id="lname" class="form-control" placeholder="Last Name*">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <input type="password" id="password2" class="form-control" placeholder="Password*">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <input type="password" id="password3" class="form-control" placeholder="Confirm Password*">
                                        </div>
                                    </div>
                                </div>
&lt;!&ndash;                                <button type="button" class="btn btn-secondary float-end" data-bs-dismiss="modal">Close</button>&ndash;&gt;
                                <button type="button" class="default-btn btn btn-secondary active float-end" data-bs-dismiss="modal">close</button>
                                <button type="button" class="default-btn btn active">Register</button>
                            </form>-->

                            <form class="row g-3"  @submit.prevent="store()">
                                <div v-if="form.progress" class="text-center">Progress: {{ form.progress.percentage }}%</div>
                                <AlertError :form="form" message="There were some problems with your input" />

                                <div class="col-md-4">
                                    <label class="form-label">First Name<sup>*</sup></label>
                                    <input v-model="form.first_name" type="text" class="form-control" placeholder="Your First name" aria-label="First name"/>
                                    <HasError :form="form" field="first_name" />
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Middle Name<sup>*</sup></label>
                                    <input v-model="form.middle_name" type="text" class="form-control" placeholder="Your middle name" aria-label="middle name"/>
                                    <HasError :form="form" field="middle_name" />
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Last Name<sup>*</sup> </label>
                                    <input v-model="form.last_name" type="text" class="form-control" placeholder="Your Last name" aria-label="Last name"/>
                                    <HasError :form="form" field="last_name" />
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Blood Group<sup>*</sup></label>
                                    <input v-model="form.blood_group" type="text" class="form-control" placeholder="Type Your blood group" aria-label="First name"/>
                                    <HasError :form="form" field="blood_group" />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Date of Birth<sup>*</sup></label>
                                    <input v-model="form.date_of_birth" type="date" class="form-control" aria-label="Middle name"/>
                                    <HasError :form="form" field="date_of_birth" />
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Gender <sup>*</sup></label>
                                    <div class="btn-group">
                                        <input  type="radio" class="btn-check" value="Male" name="options" v-model="form.gender" id="option1" autocomplete="off" checked />
                                        <label class="btn btn-secondary" for="option1"> Male</label>

                                        <input type="radio" class="btn-check" value="Female" name="options" v-model="form.gender" id="option2" autocomplete="off" />
                                        <label class="btn btn-secondary" for="option2"> Female</label>

                                        <input type="radio" class="btn-check" value="Others" name="options" v-model="form.gender" id="option3" autocomplete="off" />
                                        <label class="btn btn-secondary" for="option3"> Others</label>

                                    </div>
                                    <HasError :form="form" field="gender" />
                                </div>

                                <div class="col-md-6">
                                    <label class="form-label">Phone number<sup>*</sup></label>
                                    <input v-model="form.phone_no" type="text" class="form-control" placeholder="Type Your phone number" aria-label="phone number"/>
                                    <HasError :form="form" field="phone_no" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label"
                                    >Employment Status <sup>*</sup></label
                                    >
                                    <select v-model="form.employment_status" name="employment_status" class="form-select form-control">
                                        <option value="">Choose One</option>
                                        <option value="General">General</option>
                                        <option value="Student">Student</option>
                                        <option value="Alumni">Alumni</option>
                                    </select>
                                    <HasError :form="form" field="employment_status" />
                                </div>

                                <div class="col-md-6">
                                    <label class="form-label">NID No: </label>
                                    <input type="number" class="form-control" v-model="form.nid" placeholder="Type Your NID Number"/>
                                    <HasError :form="form" field="nid" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">EWU ID No: </label>
                                    <input type="number" class="form-control" v-model="form.ewu_id_no" placeholder="Type Your EWU Id Number"/>
                                    <HasError :form="form" field="ewu_id_no" />
                                </div>

                                <div class="col-md-4">
                                    <label class="form-label">Email<sup>*</sup></label>
                                    <input v-model="form.email" type="email" class="form-control" placeholder="Type Your Email" aria-label="your email"/>
                                    <HasError :form="form" field="email" />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Password<sup>*</sup> </label>
                                    <input v-model="form.password" type="password" class="form-control" placeholder="Type Your password" aria-label="Last name"/>
                                    <HasError :form="form" field="password" />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label"> Username<sup>*</sup> </label>
                                    <input v-model="form.username" type="text" class="form-control" placeholder="Type Your Username" aria-label="Last name"/>
                                    <HasError :form="form" field="username" />
                                </div>

                                <div class="col-md-12">
                                    <label class="form-label">Address: </label>
                                    <input type="text" class="form-control" v-model="form.address" placeholder="Type Your Address" />
                                    <HasError :form="form" field="address" />
                                </div>

                                <div class="col-12">
                                    <button type="button" class="default-btn btn btn-secondary active float-end" data-bs-dismiss="modal">close</button>
                                    <button type="submit" class="default-btn btn active">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--End register Area-->
</template>

<script>
    import axios from 'axios';
    import Form from "vform";
    // import {Button, HasError, AlertError, AlertErrors, AlertSuccess} from "vform/src/components/bootstrap5";
    // import MarqueeText from 'vue-marquee-text-component';

    export default {
        name: "CccHeader",
        // components: { Button, HasError, AlertError, AlertErrors, AlertSuccess},

        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                isPaused: false,
                marqueeItems: [],

                form: new Form({
                    first_name: "",
                    last_name: "",
                    phone_no: "",
                    email: "",
                    password: "",
                    blood_group: "",
                    date_of_birth: "",
                    nid: "",
                    employment_status: "",
                    ewu_id_no:"",
                    address: "",
                    username: "",
                    gender:"",
                }),

                settingKeyAndValueArray: [
                    'cccHeaderLogo',
                ]
            };
        },

        mounted() {
            this.getData();

            // site settings
            this.$setting(this.settingKeyAndValueArray).then(value => {
                this.settingKeyAndValueArray = value;
            })
        },

        methods:{
            getData() {
                axios.get(`${this.backendUrl}get-marquee-texts`)
                .then((response) => {
                    // console.log(response.data.data);
                    this.marqueeItems = response.data.data;
                })
                .catch((e) => {
                    console.log(e);
                    this.$Progress.fail();
                });
            },

            create() {
                $("#exampleModal").modal("show");
            },

            store() {
                this.$Progress.start()
                this.form.busy = true
                this.form.post(`${this.backendUrl}jobprofile`)
                    .then(response => {
                        $('#exampleModal').modal('hide')
                        if(this.form.successful){
                            this.$Progress.finish()
                            this.$notify({ type: "success", title: "Success", text: "Slider Added" });
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
        },
    };
</script>

<style>
    sup {
        color: red;
        font-size: smaller;
    }

    .separator {
        margin: 0 10px; /* Adjust the margin to your preference */
    }

    @media (max-width: 1200px) {
        .navbar-expand-md .header-logo {
            width: 200px;
        }
    }
</style>