<template>
    <div id="view">      
        <div class="row">
            <div class="col-lg-12">
                <div class="card mx-n4 mt-n4 bg-info bg-soft">
                    <div class="card-header bg-transparent">
                        <router-link :to="{ name: 'app.alumni_all' }" type="button" class="btn btn-sm btn-info float-end">
                            <i class="fas fa-left-arrow"></i> All Alumni
                        </router-link>
                    </div>
                    <div class="card-body">
                        <div class="text-center mb-4">
                            <img v-if="alumni.profile_image" :src="alumni.profile_image" :alt="alumni.id" class="avatar-md rounded-circle mx-auto d-block" />
                            <img v-else :src="$store.state.alumniImage" :alt="$store.state.alt" class="avatar-md rounded-circle mx-auto d-block" />

                            <h5 class="mt-3">{{ alumni.ewu_id_no }}</h5>
                            <h5 class="mb-1">{{ alumni.first_name }} {{ alumni.middle_name }} {{ alumni.last_name }} ({{ alumni.blood_group }})</h5>
                            <p class="text-muted mb-3">{{ alumni.designation_department }} at {{ alumni.organization }}</p>

                            <div class="mx-auto">
                                <span class="badge text-bg-info">{{alumni.occupation}}</span>
                            </div>
                        </div>

                        <div class="d-flex align-items-center">
                            <ul class="list-unstyled hstack gap-3 mb-0 flex-grow-1">
                                <li>
                                    <i class="bx bx-map align-middle"></i> 
                                    <template v-if="!alumni.district && !alumni.country">
                                        N/A
                                    </template>
                                    <template v-else>
                                        <span v-if="alumni.district">{{ alumni.district.bn_name }}</span>
                                        <span v-if="alumni.district && alumni.country">, </span>
                                        <span v-if="alumni.country"> {{ alumni.country.bn_name }}</span>
                                    </template>
                                </li>
                                <li>
                                    <i class="bx bx-mobile align-middle"></i> {{ alumni.personal_contact_number }}
                                </li>

                                <li>
                                    <i class="bx bx-mail-send align-middle"></i> {{ alumni.university_email }}
                                </li>
                                <!-- <li>
                                    <i class="bx bx-money align-middle"></i> $87 / hrs
                                </li>
                                <li>
                                    <i class="bx bx-time align-middle"></i> 5 days working
                                </li> -->
                            </ul>
                            <!-- <div class="hstack gap-2">
                                <button type="button" class="btn btn-primary">Download CV <i class='bx bx-download align-baseline ms-1'></i></button>
                                <button type="button" class="btn btn-light"><i class='bx bx-bookmark align-baseline'></i></button>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-3">
                <div class="card">
                    <div class="card-body">
                        <ul class="list-unstyled vstack gap-3 mb-0">
                            <li>
                                <div class="d-flex">
                                    <i class='bx bx-calendar font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Experience:</h6>
                                        <span class="text-muted">{{this.years}}+ Years</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex">
                                    <i class='bx bx-user font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Gender:</h6>
                                        {{ alumni.gender }}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex">
                                    <i class='mdi mdi-book-education font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Qualification:</h6>
                                        <span class="text-muted">{{alumni.occupation}}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex">
                                    <i class='mdi mdi-album font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Department:</h6>
                                        <span class="text-muted" v-if="alumni.department">{{alumni.department.title}}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex">
                                    <i class='mdi mdi-calendar font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Passing Year:</h6>
                                        <span class="text-muted">{{alumni.passing_year}}</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex">
                                    <i class='mdi mdi-calendar font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Convocation Year:</h6>
                                        <span class="text-muted">{{alumni.convocation_year}}</span>
                                    </div>
                                </div>
                            </li>
                            <!-- <li>
                                <div class="d-flex">
                                    <i class='bx bx-money font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Current Salary:</h6>
                                        <span class="text-muted">$ 3451</span>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li>
                                <div class="d-flex">
                                    <i class='bx bx-money font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Expected Salary:</h6>
                                        <span class="text-muted">$ 4000+</span>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li>
                                <div class="d-flex">
                                    <i class='mdi mdi-google-translate font-size-18 text-primary'></i>
                                    <div class="ms-3">
                                        <h6 class="mb-1 fw-semibold">Languages:</h6>
                                        <span class="text-muted">English, France</span>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li class="hstack gap-2 mt-3">
                                <a href="#!" class="btn btn-soft-primary w-100">Hire Now</a>
                                <a href="#!" class="btn btn-soft-danger w-100">Contact Us</a>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-lg-9">
                <div class="card">
                    <div class="card-body">
                        <h5 class="mb-2">About</h5>
                        <p class="text-muted" v-html="alumni.about"></p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="mb-2 mt-4">Education</h5>
                        <ul class="verti-timeline list-unstyled">
                            <li class="event-list" v-for="education in alumni.educations">
                                <div class="event-timeline-dot">
                                    <i class="bx bx-right-arrow-circle"></i>
                                </div>
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <div>
                                            <h6 class="font-size-16 mb-1">{{ education.field_of_study }}</h6>
                                            <h6 class="text-muted font-size-16">{{ education.school }}</h6>
                                            <h6 class="text-muted font-size-16">
                                                <span>{{education.start_date}}</span> - <span v-if="education.end_date">{{education.end_date}}</span><span v-else>Present</span>
                                            </h6>
                                            
                                            <p class="text-muted mb-0">{{education.description}}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card" v-if="alumni.experiences">
                    <div class="card-body">
                        <h5 class="mb-2 mt-4">Experience</h5>
                        <ul class="verti-timeline list-unstyled">
                            <li class="event-list" v-for="experience in alumni.experiences.data">
                                <div class="event-timeline-dot">
                                    <i class="bx bx-right-arrow-circle"></i>
                                </div>
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <div>
                                            <h6 class="font-size-16 mb-1">{{ experience.title }} at {{experience.company_name}}</h6>
                                            <h6 class="text-muted font-size-16">{{ experience.employment_type }} | {{experience.location_type}}</h6>
                                            <h6 class="text-muted font-size-16">
                                                <span>{{experience.start_date}}</span> - <span v-if="experience.end_date">{{experience.end_date}}</span><span v-else>Present</span>
                                            </h6>
                                            <h6 class="text-muted font-size-16">{{experience.experience}}</h6>
                                            
                                            <p class="text-muted mb-0">{{experience.description}}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="mb-2">Skills</h5>
                        <span v-for="(skill,index) in alumni.skills" class="text-muted font-size-15">{{skill.title}}{{ (index+1 < alumni.skills.length) ? ', ' : '' }}</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="mb-2">Achievements</h5>
                        <ul v-for="(achievement,index) in alumni.achievements">
                            <li>{{achievement.title}}</li>
                        </ul>
                    </div>
                </div>

                <!-- <div class="row">
                    <div class="col-lg-12">
                        <h5 class="mb-3">Projects</h5>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-4">
                                        <div class="avatar-md">
                                            <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                <img src="assets/images/companies/img-1.png" alt="" height="30">
                                            </span>
                                        </div>
                                    </div>
                
                
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">New admin Design</a></h5>
                                        <p class="text-muted mb-4">It will be as simple as Occidental</p>
                                        <div class="avatar-group">
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <img src="assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs">
                                                </a>
                                            </div>
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <img src="assets/images/users/avatar-5.jpg" alt="" class="rounded-circle avatar-xs">
                                                </a>
                                            </div>
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <div class="avatar-xs">
                                                        <span class="avatar-title rounded-circle bg-success text-white font-size-16">
                                                            A
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 border-top">
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item me-3">
                                        <span class="badge bg-success">Completed</span>
                                    </li>
                                    <li class="list-inline-item me-3">
                                        <i class="bx bx-calendar me-1"></i> 15 Oct, 22
                                    </li>
                                    <li class="list-inline-item me-3">
                                        <i class="bx bx-comment-dots me-1"></i> 214
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-4">
                                        <div class="avatar-md">
                                            <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                <img src="assets/images/companies/img-4.png" alt="" height="30">
                                            </span>
                                        </div>
                                    </div>
                        
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">App Landing UI</a></h5>
                                        <p class="text-muted mb-4">To achieve it would be necessary</p>
                                        <div class="avatar-group">
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <div class="avatar-xs">
                                                        <span class="avatar-title rounded-circle bg-pink text-white font-size-16">
                                                            L
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <img src="assets/images/users/avatar-2.jpg" alt="" class="rounded-circle avatar-xs">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 border-top">
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item me-3">
                                        <span class="badge bg-success">Completed</span>
                                    </li>
                                    <li class="list-inline-item me-3">
                                        <i class="bx bx-calendar me-1"></i> 11 Oct, 22
                                    </li>
                                    <li class="list-inline-item me-3">
                                        <i class="bx bx-comment-dots me-1"></i> 185
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-4">
                                        <div class="avatar-md">
                                            <span class="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                <img src="assets/images/companies/img-5.png" alt="" height="30">
                                            </span>
                                        </div>
                                    </div>
                        
                                    <div class="flex-grow-1 overflow-hidden">
                                        <h5 class="text-truncate font-size-15"><a href="javascript: void(0);" class="text-dark">Skote Dashboard UI</a></h5>
                                        <p class="text-muted mb-4">Separate existence is a myth</p>
                                        <div class="avatar-group">
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <img src="assets/images/users/avatar-1.jpg" alt="" class="rounded-circle avatar-xs">
                                                </a>
                                            </div>
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <img src="assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xs">
                                                </a>
                                            </div>
                                            <div class="avatar-group-item">
                                                <a href="javascript: void(0);" class="d-inline-block">
                                                    <div class="avatar-xs">
                                                        <span class="avatar-title rounded-circle bg-danger text-white font-size-16">
                                                            3+
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 border-top">
                                <ul class="list-inline mb-0">
                                    <li class="list-inline-item me-3">
                                        <span class="badge bg-success">Completed</span>
                                    </li>
                                    <li class="list-inline-item me-3">
                                        <i class="bx bx-calendar me-1"></i> 13 Oct, 22
                                    </li>
                                    <li class="list-inline-item me-3">
                                        <i class="bx bx-comment-dots me-1"></i> 194
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> -->
                
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body border-bottom">
                                <h5 class="mb-3">Social Media</h5>
                                <div class="hstack gap-2">
                                    <a v-if="alumni.facebook_profile_link" :href="alumni.facebook_profile_link" class="btn btn-soft-primary"><i class="bx bxl-facebook align-middle me-1"></i> Facebook </a>
                                    <a v-if="alumni.linkedin_profile_link" :href="alumni.linkedin_profile_link" class="btn btn-soft-pink"><i class="bx bxl-linkedin align-middle me-1"></i> Linkedin </a>
                                    <!-- <a href="#!" class="btn btn-soft-info"><i class="bx bxl-twitter align-middle me-1"></i> Twitter</a>
                                    <a href="#!" class="btn btn-soft-pink"><i class="bx bxl-instagram align-middle me-1"></i> Instagram</a>
                                    <a href="#!" class="btn btn-soft-success"><i class="bx bxl-whatsapp align-middle me-1"></i> Whatsapp</a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>










        <!-- <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="row card-header bg-transparent">
                        <div class="col-md-8">
                            <h4 class="card-title mb-4">Alumni Show</h4>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'app.alumni_all' }" type="button" class="btn btn-sm btn-success float-end">
                            <i class="fas fa-left-arrow"></i> All Alumni
                            </router-link>
                        </div>
                    </div>

                    <div class="card-body">
                        <table class="table table-bordered ">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{{ alumni.first_name }}{{ alumni.middle_name }}{{ alumni.last_name }}</td>
                                    <th scope="row">ewu_id_no</th>
                                    <td>{{ alumni.ewu_id_no }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">E-mail Address</th>
                                    <td>
                                        <tbody>
                                            <tr><b>Personal Email: </b>{{ alumni.personal_email }}</tr>
                                            <tr><b>University Email: </b>{{ alumni.university_email }}</tr>
                                            <tr><b>Company Email: </b>{{ alumni.company_email }}</tr>
                                        </tbody> 
                                    </td>
                                    <th scope="row">Contact Number</th>
                                    <td>{{ alumni.contact_number }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">NID</th>
                                    <td>{{ alumni.nid }}</td>
                                    <th scope="row">Date of Birth</th>
                                    <td>{{ alumni.dob }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Gender</th>
                                    <td>{{ alumni.gender }}</td>
                                    <th scope="row">Blood Group</th>
                                    <td>{{ alumni.blood_group }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Date of Join</th>
                                    <td>{{ alumni.doj }}</td>
                                    <th scope="row">Department</th>
                                    <td>{{ department.title }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Program</th>
                                    <td>{{ alumni.program_id }}</td>
                                    <th scope="row">Passing Year</th>
                                    <td>{{ alumni.passing_year }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Convocation Year</th>
                                    <td>{{ alumni.convocation_year }}</td>
                                    <th scope="row">Achievements</th>
                                    <td>
                                        <ol>
                                            <li v-for="item in achievements">{{ item.title }}</li>
                                        </ol>
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Skills</th>
                                    <td>
                                        <ol>
                                            <li v-for="item in skills">{{ item.title }}</li>
                                        </ol>
                                    </td>
                                    <th scope="row">Organization</th>
                                    <td>{{ alumni.organization }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Designation/Department</th>
                                    <td>{{ alumni.designation_department }}</td>
                                    <th scope="row">Occupation</th>
                                    <td>{{ alumni.occupation }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Facebook Profile Link</th>
                                    <td>{{ alumni.facebook_profile_link }}</td>
                                    <th scope="row">Linkedin Profile Link</th>
                                    <td>{{ alumni.linkedin_profile_link }}</td>
                                </tr>

                                <tr>
                                    <th scope="row">Usernaem</th>
                                    <td>{{ alumni.username }}</td>
                                    <th scope="row">Login Email</th>
                                    <td>{{ alumni.email }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Status</th>
                                    <td>{{ alumni.status }}</td>
                                    <th scope="row">Image</th>
                                    <td>
                                        <img width="100" :src="image_url" :alt="alumni.id">
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div> -->



        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'View',
    components: { },

    data() {
      return {
        backendUrl: import.meta.env.VITE_API_BASE_URL,

        alumni: '',
        years: 0,
        months: 0,
        days: 0,

        // image_url: '',
        // department: '',
        // achievements: [],
        // skills: [],
      };
    },

    created() {
        axios.get(`${this.backendUrl}alumni/${this.$route.query.id}`)
        .then((response) => {
            this.alumni = response.data.data.alumni
            let numberOfDays = 0;
            $(this.alumni.experiences.data).each(function(index, item){
                let dateArray = item.experience.split(' ');
                numberOfDays += Number(dateArray[0])*365;
                numberOfDays += Number(dateArray[2]*30);
                numberOfDays += Number(dateArray[4]);
            })

            this.years = Math.floor(numberOfDays / 365);
            this.months = Math.floor(numberOfDays % 365 / 30);
            this.days = Math.floor(numberOfDays % 365 % 30);

            // this.alumni = response.data.alumni
            // this.image_url = response.data.image_url
            // this.department = response.data.department
            // this.achievements = response.data.achievements
            // this.skills = response.data.skills
        });
    },
}
</script>










