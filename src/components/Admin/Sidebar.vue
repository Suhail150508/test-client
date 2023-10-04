<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu">
          <li class="menu-title" key="t-menu">Menu</li>

          <li v-show="givenPermission.canDashboard === true">
            <router-link :to="{ name: 'app.dashboard' }" class="waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Dashboards</span>
            </router-link>
          </li>

          <li v-show="givenPermission.canAlumniModule === true">
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Alumni</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li v-show="givenPermission.canAlumni === true">
                <router-link :to="{ name: 'app.alumni_all' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Alumni</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canAlumni === true">
                <router-link :to="{ name: 'app.pending_registrations' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Pending registrations</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canWelcome === true">
                <router-link :to="{ name: 'app.welcome' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Welcome</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canOffensiveWords === true">
                <router-link :to="{ name: 'app.offensive_words' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Offensive Words</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canAchievement === true">
                <router-link :to="{ name: 'app.achievement' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Achievement</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canSkill === true">
                <router-link :to="{ name: 'app.skill' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Skill</span>
                </router-link>
              </li>


              <!--<li v-if="can('user.index')">
                <router-link :to="{ name: 'app.alumni_all' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Alumni</span>
                </router-link>
              </li>
              <li v-if="can('delete-post')">
                <router-link :to="{ name: 'app.offensive_words' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Offensive Words</span>
                </router-link>
              </li>-->
              <li v-show="givenPermission.canNewsletterModule === true">
                <a href="javascript: void(0);" class="has-arrow waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Newsletter</span>
                </a>
                <ul class="sub-menu" aria-expanded="false">
                  <li v-show="givenPermission.canNewsletterCreateList === true">
                    <router-link :to="{ name: 'app.newsletter_create_list' }" class="waves-effect">
                      <i class="bx bx-home-circle"></i>
                      <span key="t-dashboards">Create List</span>
                    </router-link>
                  </li>
                  <li v-show="givenPermission.canNewsletterMail === true">
                    <router-link :to="{ name: 'app.newsletter_mail_list' }" class="waves-effect">
                      <span key="t-dashboards">Mail</span>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li v-show="givenPermission.canFundEvent === true">
                <router-link :to="{ name: 'app.fund_event' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Fund Event</span>
                </router-link>
              </li>
            </ul>
          </li>


          <li v-show="givenPermission.canSettingsModule === true">
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="fas fa-atom"></i>
              <span key="t-dashboards">Settings</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li v-show="givenPermission.canAdminList === true">
                <router-link :to="{ name: 'app.admin' }" class="waves-effect">
                  <i class="fas fa-user-astronaut"></i>
                  <span key="t-dashboards">Admin</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canRoleList === true">
                <router-link :to="{ name: 'app.role' }" class="waves-effect">
                  <i class="fas fa-user-astronaut"></i>
                  <span key="t-dashboards">Role</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canUserList === true">
                <router-link :to="{ name: 'app.user' }" class="waves-effect">
                  <i class="fas fa-user-astronaut"></i>
                  <span key="t-dashboards">User</span>
                </router-link>
              </li>
              <!--<li>
                <router-link :to="{ name: 'app.menu' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Menus</span>
                </router-link>
              </li>-->
              <li v-show="givenPermission.canAlumniHome === true">
                <router-link :to="{ name: 'app.alumniHomeSetting' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Alumni Home</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canAlumniDashboard === true">
                <router-link :to="{ name: 'app.alumniDashboardSetting' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Alumni Dashboard</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canCCCHome === true">
                <router-link :to="{ name: 'app.cccHomeSetting' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">CCC Home</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canJobPortalHome === true">
                <router-link :to="{ name: 'app.jobPortalHomeSetting' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Job Portal Home</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canJobPortalDashboard === true">
                <router-link :to="{ name: 'app.jobPortalDashboardSetting' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Job Portal Dashboard</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canSectionHideShow === true">
                <router-link :to="{ name: 'app.SectionHideShow' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Section Hide/Show</span>
                </router-link>
              </li>
              <!-- <li>
                <a role="button" class="waves-effect" @click="runBackup">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Run Backup</span>
                </a>
              </li> -->
              <li>
                <router-link :to="{ name: 'app.BackupRestore' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Run Backup</span>
                </router-link>
              </li>
            </ul>
          </li>


          <li v-show="givenPermission.canCccModule === true">
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">CCC</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li>
                <router-link :to="{ name: 'app.introduction' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Introduction</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canAbout === true">
                <router-link :to="{ name: 'app.about_ccc' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">About</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canContactUs === true">
                <router-link :to="{ name: 'app.contact_us' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Contact-Us</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canClubList === true">
                <router-link :to="{ name: 'app.club' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Club List</span>
                </router-link>
              </li>
              <!--<li>
                <router-link :to="{ name: 'app.cccnews' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">CCC News</span>
                </router-link>
              </li>-->
              <li v-show="givenPermission.canCareerTipsTricks === true">
                <router-link :to="{ name: 'app.career_tips' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Career Tips & Tricks</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canCompanyPartner === true">
                <router-link :to="{ name: 'app.partner' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Company Partner</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canCCCUpdates === true">
                <router-link :to="{ name: 'app.cccUpdates' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">CCC Updates</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canGuideline === true">
                <router-link :to="{ name: 'app.guideline' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Guideline</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canNoticeEvent === true">
                <router-link :to="{ name: 'app.notice-event' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Notice Events</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canNews === true">
                <router-link :to="{ name: 'app.news' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">News</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canResource === true">
                <router-link :to="{ name: 'app.resource' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Resource</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canStudentWelfare === true">
                <router-link :to="{ name: 'app.student-welfare' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Student Welfare</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canWhoWeAre === true">
                <router-link :to="{ name: 'app.whoWeAre' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">WhoWeAre</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canCccFaq === true">
                <router-link :to="{ name: 'app.cccfaq' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Faq</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'dashboard_student_feedback' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Student Feedback</span>
                </router-link>
              </li>
            </ul>
          </li>

        <!--          <li>
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Club</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li>
                <router-link :to="{ name: 'app.club' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Club List</span>
                </router-link>
              </li>
            </ul>
          </li>-->

          <li v-show="givenPermission.canJobPortalModule === true">
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Job Portal</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li v-show="givenPermission.canJobPost === true">
                <router-link :to="{ name: 'app.jobpost' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Job Post</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canJobApplication === true">
                <router-link :to="{ name: 'app.job_applicants' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Job Applicants</span>
                </router-link>
              </li>

              <li>
                <router-link :to="{ name: 'app.job_companies' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Job Companies</span>
                </router-link>
              </li>

              <li v-show="givenPermission.canWorkshop === true">

                <router-link :to="{ name: 'app.workshop' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Socio-Psyche</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canTraining === true">
                <router-link :to="{ name: 'app.training' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Training-Workshop-Seminar</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canInterest === true">
                <router-link :to="{ name: 'app.interest' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Interest</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canProfessionalCertification === true">
                <router-link :to="{ name: 'app.professional-certification' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">professional certification</span>
                </router-link>
              </li>

               <li v-show="givenPermission.canInternship === true">
                <router-link :to="{ name: 'app.internship' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Internship</span>
                </router-link>
              </li>
            
              <li v-show="givenPermission.canCoCurricularActivity === true">
                <router-link :to="{ name: 'app.co-curricular-activity' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Co-curricular Activity</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canJobCategory === true">
                <router-link :to="{ name: 'app.job_categories' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Job Category</span>
                </router-link>
              </li>
              <!-- <li>
                <router-link :to="{ name: 'app.jobcategory' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Job Category</span>
                </router-link>
              </li> -->
              <li v-show="givenPermission.canJobSubCategory === true">
                <router-link :to="{ name: 'app.jobsubcategory' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Job Sub-Category</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!--<li>
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Admin</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              &lt;!&ndash;<li>
                <router-link :to="{ name: 'app.blog-list' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Blog</span>
                </router-link>
              </li>&ndash;&gt;

            
              &lt;!&ndash;<li>
                <router-link :to="{ name: 'app.major-minor' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">MajorMinor</span>
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link :to="{ name: 'app.banner' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Banner</span>
                </router-link>
              </li>&ndash;&gt;
              &lt;!&ndash;<li>
                <router-link
                        :to="{ name: 'app.site-setting' }"
                        class="waves-effect"
                >
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">SiteSetting</span>
                </router-link>
              </li>&ndash;&gt;
            </ul>
          </li>-->

          <li v-show="givenPermission.canCoreDataModule === true">
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="bx bx-home-circle"></i>
              <span key="t-dashboards">Core Data</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li v-show="givenPermission.canPermission === true">
                <router-link :to="{ name: 'app.marquee_text' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Merquee Text</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canPermission === true">
                <router-link :to="{ name: 'app.permission' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Permission</span>
                </router-link>
              </li>
             
              <li v-show="givenPermission.canDesignation === true">
                <router-link :to="{ name: 'app.designation' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Designation</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canCategory === true">
                <router-link :to="{ name: 'app.category' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Category</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canSubCategory === true">
                <router-link :to="{ name: 'app.sub_category' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Sub Category</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canDivision === true">
                <router-link :to="{ name: 'app.division' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Division</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canDistrict === true">
                <router-link :to="{ name: 'app.district' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">District</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canCountry === true">
                <router-link :to="{ name: 'app.country' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Country</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canDepartment === true">
                <router-link :to="{ name: 'app.department' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Department</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canSubject === true">
                <router-link :to="{ name: 'app.subject' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Subject</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canInstitute === true">
                <router-link :to="{ name: 'app.institute' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Institute</span>
                </router-link>
              </li>

              <li v-show="givenPermission.canMagazine === true">
                <router-link :to="{ name: 'app.magazine' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Magazine</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canSlider === true">
                <router-link :to="{ name: 'app.slider' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">Slider</span>
                </router-link>
              </li>
              <li v-show="givenPermission.canSEO === true">
                <router-link :to="{ name: 'app.seo' }" class="waves-effect">
                  <i class="bx bx-home-circle"></i>
                  <span key="t-dashboards">SEO</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!--<li v-if="canSettingsModule">
            <a href="javascript: void(0);" class="has-arrow waves-effect">
              <i class="fas fa-atom"></i>
              <span key="t-dashboards">Settings</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
              <li>
                <router-link :to="{ name: 'app.role' }" class="waves-effect">
                  <i class="fas fa-user-astronaut"></i>
                  <span key="t-dashboards">Role</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'app.menu' }" class="waves-effect">
                  <i class="fas fa-vector-square"></i>
                  <span key="t-dashboards">Menus</span>
                </router-link>
              </li>
            </ul>
          </li>-->


        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from 'js-cookie';
import emitter from "../../emitter/index.js";
export default {
  data() {
    return {
      backendUrl: import.meta.env.VITE_API_BASE_URL,
      
      token: Cookies.get('adminLoggedInTokenCookie'),
      authId: Cookies.get('authIdCookie'),

      permissionKeys: {
        canAlumni: 'List Alumni',
        canOffensiveWords: 'List Offensive',
        canFundEvent: 'List Fund Event',
        canAchievement: 'List Achievement',
        canDashboard: 'Dashboard',
        canAlumniModule: 'Alumni Module',
        canWelcome: 'List Welcome',
        canSkill: 'List Skill',
        canNewsletterModule: 'Newsletter Module',
        canNewsletterCreateList: 'Newsletter Create List',
        canNewsletterMail: 'Newsletter Mail',
        canSettingsModule: 'Settings Module',
        canAdminList: 'Admin List',
        canRoleList: 'Role List',
        canUserList: 'User List',
        canAlumniHome: 'Alumni Home',
        canAlumniDashboard: 'Alumni Dashboard',
        canCCCHome: 'CCC Home',
        canJobPortalHome: 'Job Portal Home',
        canJobPortalDashboard: 'Job Portal Dashboard',
        canSectionHideShow: 'Section Hide Show',
        canCccModule: 'Ccc Module',
        canAbout: 'About',
        canContactUs: 'Contact Us',
        canClubList: 'Club List',
        canCareerTipsTricks: 'Career Tips Tricks',
        canCompanyPartner: 'Company Partner',
        canCCCUpdates: 'CCC Updates',
        canGuideline: 'Guideline',
        canNoticeEvent: 'Notice Event',
        canNews: 'News',
        canResource: 'Resource',
        canStudentWelfare: 'Student Welfare',
        canWhoWeAre: 'Who We Are',
        canCccFaq: 'CCC FAQ',
        canJobPortalModule: 'Job Portal Module',
        canJobPost: 'Job Post',
        canJobApplication: 'Job Application',
        canWorkshop: 'Workshop',
        canTraining: 'Training',
        canInterest: 'Interest',
        canInternship: 'Internship',
        canProfessionalCertification: 'Professional Certification',
        canCoCurricularActivity: 'CoCurricular Activity',
        canJobCategory: 'Job Category',
        canJobSubCategory: 'Job SubCategory',
        canCoreDataModule: 'Core Data Module',
        canPermission: 'Permission',
        canDesignation: 'Designation',
        canCategory: 'Category',
        canSubCategory: 'SubCategory',
        canDivision: 'Division',
        canDistrict: 'District',
        canCountry: 'Country',
        canDepartment: 'Department',
        canSubject: 'Subject',
        canInstitute: 'Institute',
        canMagazine: 'Magazine',
        canSlider: 'Slider',
        canSEO: 'SEO',
      },
      givenPermission: {
        canAlumni:false,
        canOffensiveWords:false,
        canFundEvent:false,
        canAchievement:false,
        canDashboard:false,
        canAlumniModule:false,
        canWelcome:false,
        canSkill:false,
        canNewsletterModule:false,
        canNewsletterCreateList:false,
        canNewsletterMail:false,
        canSettingsModule:false,
        canAdminList:false,
        canRoleList:false,
        canUserList:false,
        canAlumniHome:false,
        canAlumniDashboard:false,
        canCCCHome:false,
        canJobPortalHome:false,
        canJobPortalDashboard:false,
        canSectionHideShow:false,
        canCccModule:false,
        canAbout:false,
        canContactUs:false,
        canClubList:false,
        canCareerTipsTricks:false,
        canCompanyPartner:false,
        canCCCUpdates:false,
        canGuideline:false,
        canNoticeEvent:false,
        canNews:false,
        canResource:false,
        canStudentWelfare:false,
        canWhoWeAre:false,
        canCccFaq:false,
        canJobPortalModule:false,
        canJobPost:false,
        canJobApplication:false,
        canWorkshop:false,
        canTraining:false,
        canInterest:false,
        canInternship:false,
        canProfessionalCertification:false,
        canCoCurricularActivity:false,
        canJobCategory:false,
        canJobSubCategory:false,
        canCoreDataModule:false,
        canPermission:false,
        canDesignation:false,
        canCategory:false,
        canSubCategory:false,
        canDivision:false,
        canDistrict:false,
        canCountry:false,
        canDepartment:false,
        canSubject:false,
        canInstitute:false,
        canMagazine:false,
        canSlider:false,
        canSEO:false,
      },
    };
  },

  methods: {
    can(permission) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      // Check if the current user has the given permission using Laravel's Gate
      return axios.get(`${this.backendUrl}check-permission`, { params: { permissionKeys: permission, authId: this.authId} })
            .then((response) => {
              return response.data;
            }).catch(error => false);
    },

    runBackup(){
      axios.post(`${this.backendUrl}run-backup`)
              .then(response => {
                console.log(response.data)
                // window.open(response.data, '_blank')
                /*const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download",'');
                document.body.appendChild(link);
                link.click();
                link.remove();*/

                /*const fileContents = atob(response.data.file);
                const blob = new Blob([fileContents], { type: 'application/zip' });

                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', response.data.name); // Set the desired file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);*/
              })
              .catch(error => {
                console.error(error);
                alert('An error occurred while creating the backup.');
              });
          },

      readFileAsBlob(filePath) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(new File([],''));

        return new Blob([fileReader.result], { type: 'application/octet-stream' });
      },
  },
  created() {

    // Shake the Admin Sidebar
    emitter.on("toggle-sidebar", () => {
      this.can(this.permissionKeys).then((can) => {
        this.givenPermission = can
      });
    /*this.can('List Alumni').then(can => {this.canAlumni = can;});
      this.can('List Offensive').then(can => {this.canOffensiveWords = can;});
      this.can('List Fund Event').then(can => {this.canFundEvent = can;});
      this.can('List Achievement').then(can => {this.canAchievement = can;});
      this.can('Dashboard').then(can => {this.canDashboard = can;});
      this.can('Alumni Module').then(can => {this.canAlumniModule = can;});
      this.can('List Welcome').then(can => {this.canWelcome = can;});
      this.can('List Skill').then(can => {this.canSkill = can;});
      this.can('Newsletter Module').then(can => {this.canNewsletterModule = can;});
      this.can('Newsletter Create List').then(can => {this.canNewsletterCreateList = can;});
      this.can('Newsletter Mail').then(can => {this.canNewsletterMail = can;});
      //settings
      this.can('Settings Module').then(can => {this.canSettingsModule = can;});
      this.can('Role List').then(can => {this.canRoleList = can;});
      this.can('Alumni Home').then(can => {this.canAlumniHome = can;});
      this.can('Alumni Dashboard').then(can => {this.canAlumniDashboard = can;});
      this.can('CCC Home').then(can => {this.canCCCHome = can;});
      this.can('Job Portal Dashboard').then(can => {this.canJobPortalDashboard = can;});
      //CCC
      this.can('Ccc Module').then(can => {this.canCccModule = can;});
      this.can('About').then(can => {this.canAbout = can;});
      this.can('Contact Us').then(can => {this.canContactUs = can;});
      this.can('Club List').then(can => {this.canClubList = can;});
      this.can('Career Tips Tricks').then(can => {this.canCareerTipsTricks = can;});
      this.can('Company Partner').then(can => {this.canCompanyPartner = can;});
      this.can('CCC Updates').then(can => {this.canCCCUpdates = can;});
      this.can('Guideline').then(can => {this.canGuideline = can;});
      this.can('Notice Event').then(can => {this.canNoticeEvent = can;});
      this.can('News').then(can => {this.canNews = can;});
      this.can('Resource').then(can => {this.canResource = can;});
      this.can('Student Welfare').then(can => {this.canStudentWelfare = can;});
      this.can('Who We Are').then(can => {this.canWhoWeAre = can;});
      //Job-portal
      this.can('Job Portal Module').then(can => {this.canJobPortalModule = can;});
      this.can('Job Post').then(can => {this.canJObPost = can;});
      this.can('Job Application').then(can => {this.canJObApplication = can;});
      this.can('Workshop').then(can => {this.canWorkshop = can;});
      this.can('Training').then(can => {this.canTraining = can;});
      this.can('Interest').then(can => {this.canInterest = can;});
      this.can('Internship').then(can => {this.canInternship = can;});
      this.can('Professional Certification').then(can => {this.canProfessionalCertification = can;});
      this.can('CoCurricular Activity').then(can => {this.canCoCurricularActivity = can;});
      this.can('Job Category').then(can => {this.canJobCategory = can;});
      this.can('Job SubCategory').then(can => {this.canJobSubCategory = can;});
      //Core Data
      this.can('Core Data Module').then(can => {this.canCoreDataModule = can;});
      this.can('Permission').then(can => {this.canPermission = can;});
      this.can('Designation').then(can => {this.canDesignation = can;});
      this.can('Category').then(can => {this.canCategory = can;});
      this.can('SubCategory').then(can => {this.canSubCategory = can;});
      this.can('Division').then(can => {this.canDivision = can;});
      this.can('District').then(can => {this.canDistrict = can;});
      this.can('Country').then(can => {this.canCountry = can;});
      this.can('Department').then(can => {this.canDepartment = can;});
      this.can('Magazine').then(can => {this.canMagazine = can;});
      this.can('Slider').then(can => {this.canSlider = can;});
      this.can('SEO').then(can => {this.canSEO = can;});*/

    });

    this.can(this.permissionKeys).then((can) => {
      this.givenPermission = can
    });
    /*this.can('List Alumni').then(can => {this.canAlumni = can;});
    this.can('List Offensive').then(can => {this.canOffensiveWords = can;});
    this.can('List Fund Event').then(can => {this.canFundEvent = can;});
    this.can('List Achievement').then(can => {this.canAchievement = can;});
    this.can('Dashboard').then(can => {this.canDashboard = can;});
    this.can('Alumni Module').then(can => {this.canAlumniModule = can;});
    this.can('List Welcome').then(can => {this.canWelcome = can;});
    this.can('List Skill').then(can => {this.canSkill = can;});
    this.can('Newsletter Module').then(can => {this.canNewsletterModule = can;});
    this.can('Newsletter Create List').then(can => {this.canNewsletterCreateList = can;});
    this.can('Newsletter Mail').then(can => {this.canNewsletterMail = can;});
    //settings
    this.can('Settings Module').then(can => {this.canSettingsModule = can;});
    this.can('Role List').then(can => {this.canRoleList = can;});
    this.can('Alumni Home').then(can => {this.canAlumniHome = can;});
    this.can('Alumni Dashboard').then(can => {this.canAlumniDashboard = can;});
    this.can('CCC Home').then(can => {this.canCCCHome = can;});
    this.can('Job Portal Dashboard').then(can => {this.canJobPortalDashboard = can;});
    //CCC
    this.can('Ccc Module').then(can => {this.canCccModule = can;});
    this.can('About').then(can => {this.canAbout = can;});
    this.can('Contact Us').then(can => {this.canContactUs = can;});
    this.can('Club List').then(can => {this.canClubList = can;});
    this.can('Career Tips Tricks').then(can => {this.canCareerTipsTricks = can;});
    this.can('Company Partner').then(can => {this.canCompanyPartner = can;});
    this.can('CCC Updates').then(can => {this.canCCCUpdates = can;});
    this.can('Guideline').then(can => {this.canGuideline = can;});
    this.can('Notice Event').then(can => {this.canNoticeEvent = can;});
    this.can('News').then(can => {this.canNews = can;});
    this.can('Resource').then(can => {this.canResource = can;});
    this.can('Student Welfare').then(can => {this.canStudentWelfare = can;});
    this.can('Who We Are').then(can => {this.canWhoWeAre = can;});
    //Job-portal
    this.can('Job Portal Module').then(can => {this.canJobPortalModule = can;});
    this.can('Job Post').then(can => {this.canJObPost = can;});
    this.can('Job Application').then(can => {this.canJObApplication = can;});
    this.can('Workshop').then(can => {this.canWorkshop = can;});
    this.can('Training').then(can => {this.canTraining = can;});
    this.can('Interest').then(can => {this.canInterest = can;});
    this.can('Internship').then(can => {this.canInternship = can;});
    this.can('Professional Certification').then(can => {this.canProfessionalCertification = can;});
    this.can('CoCurricular Activity').then(can => {this.canCoCurricularActivity = can;});
    this.can('Job Category').then(can => {this.canJobCategory = can;});
    this.can('Job SubCategory').then(can => {this.canJobSubCategory = can;});
    //Core Data
    this.can('Core Data Module').then(can => {this.canCoreDataModule = can;});
    this.can('Permission').then(can => {this.canPermission = can;});
    this.can('Designation').then(can => {this.canDesignation = can;});
    this.can('Category').then(can => {this.canCategory = can;});
    this.can('SubCategory').then(can => {this.canSubCategory = can;});
    this.can('Division').then(can => {this.canDivision = can;});
    this.can('District').then(can => {this.canDistrict = can;});
    this.can('Country').then(can => {this.canCountry = can;});
    this.can('Department').then(can => {this.canDepartment = can;});
    this.can('Magazine').then(can => {this.canMagazine = can;});
    this.can('Slider').then(can => {this.canSlider = can;});
    this.can('SEO').then(can => {this.canSEO = can;});*/
  },



  /*  methods: {
      can(permission) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        // Check if the current user has the given permission using Laravel's Gate
        return axios.get(`${this.backendUrl}check-permission`, { params: { permission, authId: this.authId} })
                .then((response) => {
                  console.log(response.data.can); // for debugging purposes only
                  return response.data.can; // Return the value from the promise
                })
                .catch(error => false);
      },
    },*/

};
</script>

<style></style>