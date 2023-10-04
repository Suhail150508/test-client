import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import Cookies from 'js-cookie'

// ccc component import
import CccLayout from "../components/Ccc/CccLayout.vue";
import ClubLayout from "../components/Club/Layout.vue";

import CccHome from "../views/Ccc/CccHome.vue";
import SearchResults from "../views/Ccc/SearchResults.vue";
import CccAbout from "../views/Ccc/CccAbout.vue";
import CccFaq from "../views/Ccc/Faq.vue";
import NoticeEvent from "../views/Ccc/NoticeEvent.vue";
import NoticeEventSingle from "../views/Ccc/NoticeEventSingle.vue";
import CccUpdates from "../views/Ccc/CccUpdates/CccUpdates.vue";
import SingleUpdates from "../views/Ccc/CccUpdates/Single.vue";
import CccGuideline from "../views/Ccc/Guideline/Internship/AllGuideline.vue";
import GuidelineSingle from "../views/Ccc/Guideline/Internship/SingleGuideline.vue";
import TalkToOurTeam from "../views/Ccc/TalkToOurTeam.vue";
import AllCareerTips from "../views/Ccc/CareerTips/AllCareerTips.vue";
import SingleCareerTips from "../views/Ccc/CareerTips/SingleCareerTips.vue";
import AllResources from "../views/Ccc/Resource/AllResource.vue";
import SingleResource from "../views/Ccc/Resource/SingleResource.vue";
import AllWorkshopSeminar from "../views/Ccc/Workshop_Seminar/index.vue";
import AllTraining from "../views/Ccc/AllTraining/Index.vue";
import AllInternships from "../views/Ccc/AllInternship/Index.vue";
import SingleTraining from "../views/Ccc/AllTraining/SingleTraining.vue";
import SingleInternship from "../views/Ccc/AllInternship/SingleInternship.vue";

import WorkshopSeminarDetails from "../views/Ccc/Workshop_Seminar_detail/Index.vue";

import CccViewAll from "../views/Ccc/CccViewAll.vue";
import NewsLayout from "../views/Ccc/News/Layout.vue";
import AllNews from "../views/Ccc/News/All.vue";
import SpecialNews from "../views/Ccc/News/Single.vue";
import AllClubs from "../views/Ccc/Clubs/index.vue";
import CCCContactUs from "../views/Ccc/ContactUs.vue";
import ClubMain from "../views/Ccc/Clubs/Layout.vue";
import SingleClub from "../views/Ccc/Clubs/Single.vue";
import AboutClub from "../views/Ccc/Clubs/About.vue";
import ContactsClub from "../views/Ccc/Clubs/Contacts.vue";
import MediaClub from "../views/Ccc/Clubs/Media.vue";
import SingleMedia from "../views/Ccc/Clubs/SingleMedia.vue";
import leadersClub from "../views/Ccc/Clubs/Moderator.vue";
import CommitteeClub from "../views/Ccc/Clubs/Committee.vue";
import GalleryClub from "../views/Ccc/Clubs/Gallery.vue";

const routes = [
  // CCC Routes
  {
    path: "/",
    component: CccLayout,

    children: [
      {
        path: "/",
        name: "Ccc",
        component: CccHome,
      },
      {
        path: "/search-results",
        name: "SearchResults",
        component: SearchResults,
      },
      {
        path: "ccc-about",
        name: "Ccc-about",
        component: CccAbout,
      },
      {
        path: "notice-event",
        name: "noticeEvent",
        component: NoticeEvent,
      },
      {
        // path: '/notice-event/:noticeEventId',
        path: '/notice-event/:slug',
        component: NoticeEventSingle
      },
      {
        path: "ccc-updates",
        name: "Ccc-updates",
        component: CccUpdates,
      },

      {
        // path: '/ccc-updates/:cccSingleUpdatesId',
        path: '/ccc-updates/:slug',
        component: SingleUpdates
      },
      {
        path: "ccc-faq",
        name: "Ccc-faq",
        component: CccFaq,
      },
      {
        path: "ccc-guideline",
        name: "Ccc-guideline",
        component: CccGuideline,
      },
      {
        path: "single-guideline",
        name: "GuidelineSingle",
        component: GuidelineSingle,
      },
      {
        path: "/ccc-student-welfare",
        name: "TalkToOurTeam",
        component: TalkToOurTeam,
      },

      {
        path: "career-tips-all",
        name: "allCareerTips",
        component: AllCareerTips,
      },

      {
        path: "resource-all",
        name: "AllResources",
        component: AllResources,
      },

      // {
      //   path: "resource-single",
      //   name: "SingleResource",
      //   component: SingleResource,
      // },

      {
        // path: '/resource-all/:resourceId',
        path: '/resource-all/:slug',
        component: SingleResource
      },

      {
        path: "socio-psyche-counseling",
        name: "AllWorkshopSeminar",
        component: AllWorkshopSeminar,
      },

      // {
      //   path: "workshop-seminar-details",
      //   name: "workshopSeminarDetails",
      //   component: WorkshopSeminarDetails,
      // },

      {
        // path: '/socio-psyche-counseling/:socioPsycheCounselingId',
        path: '/socio-psyche-counseling/:slug',
        component: WorkshopSeminarDetails
      },

      {
        path: "training-workshop-seminars",
        name: "AllTrainings",
        component: AllTraining,
      },


      // {
      //   path: "single-training",
      //   name: "single_training",
      //   component: SingleTraining,
      // },

      {
        // path: '/single-training/:trainingId',
        path: '/single-training/:slug',
        component: SingleTraining
      },

      {
        path: "internships",
        name: "AllInternships",
        component: AllInternships,
      },

      // {
      //   path: "single-internship",
      //   name: "single_internship",
      //   component: SingleInternship,
      // },
      
      {
        // path: '/internships/:internshipId',
        path: '/internships/:slug',
        component: SingleInternship
      },

      {
        path: "/career-counseling-center/all",
        name: "CccViewAll",
        component: CccViewAll,
      },
      {
        path: "/newsSingle",
        component: NewsLayout,

        children: [
          {
            // path: '/special-news/:newsId',
            path: '/special-news/:slug',
            component: SpecialNews
          },

          // {
          //   path: "/special-news",
          //   name: "SpecialNews",
          //   component: SpecialNews,
          // },

          // {
          //   path: "/single-career-tips",
          //   name: "singleCareerTips",
          //   component: SingleCareerTips,
          // },

          {
            // path: '/single-career-tips/:careerTipsId',
            path: '/single-career-tips/:slug',
            component: SingleCareerTips
          },
        ],
      },
      {
        path: "/news-all",
        name: "AllNews",
        component: AllNews,
      },
      /*{
        path: "/clubMain",
        component: ClubLayout,

        children:[
          {
            path: "/single-club",
            name: "SingleClub",
            component: SingleClub,
          },
        ],
      },
      {
        path: "/clubs-all",
        name: "AllClubs",
        component: AllClubs,
      },*/
      {
        path: "/clubs-all",
        name: "AllClubs",
        component: AllClubs,
      },
      {
        path: "/ccc_contact_us",
        name: "CCCContactUs",
        component: CCCContactUs,
      },
    ],
  },

  // Club Routes
  {
    path: "/ClubMaster",
    component: ClubLayout,

    children: [
      {
        path: "/clubMain",
        component: ClubMain,

        children:[
          {
            path: "/clubs/:shortName",
            name: "SingleClub",
            component: SingleClub,
          },
          {
            path: "/clubs/:shortName/about-us",
            name: "AboutClub",
            component: AboutClub,
          },
          {
            path: "/clubs/:shortName/:type",
            name: "MediaClubNews",
            component: MediaClub,
          },
          {
            path: "/clubs/:shortName/single-media/:sluggableTitle",
            name: "singleMedia",
            component: SingleMedia,
          },
        ],
      },
      {
        path: "/clubs/:shortName/contact",
        name: "ContactsClub",
        component: ContactsClub,
      },
      {
        path: "/clubs/:shortName/leaders",
        name: "leadersClub",
        component: leadersClub,
      },
      {
        path: "/clubs/:shortName/committee",
        name: "committeeClub",
        component: CommitteeClub,
      },
      {
        path: "/clubs/:shortName/photo-gallery",
        name: "galleryClub",
        component: GalleryClub,
      },
    ]
  },

  // auth route
  {
    path: "/",
    component: () => import("../components/Auth/AuthLayout.vue"),

    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("../views/Auth/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../views/Auth/Register.vue"),
      },
      //Admin auth
      {
        path: "/admin-login",
        name: "AdminLogin",
        component: () => import("../views/Auth/Admin/Login.vue"),
        meta: {
          requiresGuest: true
        }
      },
    ],
  },

  // Dashboard route
  {
    path: "/app",
    name: "app",
    component: () => import("../components/Admin/Layout.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard",
        name: "app.dashboard",
        component: () => import("../views/Admin/Dashboard.vue"),
      },
      {
        path: "/blog-add",
        name: "app.blog-add",
        component: () => import("../views/Admin/Blog/Add.vue"),
      },
      {
        path: "/job-categories",
        name: "app.job_categories",
        component: () => import("../views/Admin/JobCategories/Index.vue"),
      },
      {
        path: "/blog-list",
        name: "app.blog-list",
        component: () => import("../views/Admin/Blog/Index.vue"),
      },
      {
        path: "/club-list",
        name: "app.club",
        component: () => import("../views/Admin/Club/Index.vue"),
      },
      {
        path: "/club-add",
        name: "app.club_add",
        component: () => import("../views/Admin/Club/Form.vue"),
      },
      {
        path: "/club-view",
        name: "app.club_view",
        component: () => import("../views/Admin/Club/View.vue"),
      },
      /*{
        path: "/club-view/:shortName",
        name: "app.club_view",
        component: () => import("../views/Admin/Club/View.vue"),
      },*/
      {
        path: "/club-media",
        name: "app.club_media",
        component: () => import("../views/Admin/Club/Media.vue"),
      },
      {
        path: "/club-add-details",
        name: "app.club_add_details",
        component: () => import("../views/Admin/Club/AddDetails.vue"),
      },
      {
        path: "/alumni-all",
        name: "app.alumni_all",
        component: () => import("../views/Admin/Alumni/Index.vue"),
      },
      {
        path: "/pending-registrations",
        name: "app.pending_registrations",
        component: () => import("../views/Admin/Alumni/PendingRegistrations.vue"),
      },
      {
        path: "/alumni-add",
        name: "app.alumni_add",
        component: () => import("../views/Admin/Alumni/Form.vue"),
      },
      {
        path: "/alumni-edit",
        name: "app.alumni_edit",
        component: () => import("../views/Admin/Alumni/Form.vue"),
      },
      {
        path: "/alumni-show",
        name: "app.alumni_show",
        component: () => import("../views/Admin/Alumni/View.vue"),
      },

      {
        path: "/welcome",
        name: "app.welcome",
        component: () => import("../views/Admin/Welcome/Index.vue"),
      },

      {
        path: "/offensive-words",
        name: "app.offensive_words",
        component: () => import("../views/Admin/OffensiveWords/Index.vue"),
      },
      {
        path: "/newsletter_create_list",
        name: "app.newsletter_create_list",
        component: () => import("../views/Admin/Newsletter/CreateList.vue"),
      },
      {
        path: "/all_mail_list",
        name: "app.all_mail_list",
        component: () => import("../views/Admin/Newsletter/AllmailList.vue"),
      },
      {
        path: "/newsletter-mail-list",
        name: "app.newsletter_mail_list",
        component: () => import("../views/Admin/Newsletter/NewsletterMailIndex.vue"),
      },
      {
        path: "/newsletter-mail",
        name: "app.newsletter_mail",
        component: () => import("../views/Admin/Newsletter/NewsletterMail.vue"),
      },
      {
        path: "/fund-event",
        name: "app.fund_event",
        component: () => import("../views/Admin/FundEvent/index.vue"),
      },
      {
        path: "/fund-payment-details",
        name: "app.fund_payment_details",
        component: () => import("../views/Admin/FundEvent/FundPaymentDetails.vue"),
      },
      {
        path: "/cccnews",
        name: "app.cccnews",
        component: () => import("../views/Admin/CccNews/Index.vue"),
      },
      {
        path: "/cccnews-add",
        name: "app.cccnews.add",
        component: () => import("../views/Admin/CccNews/Form.vue"),
      },
      {
        path: "/career-tips",
        name: "app.career_tips",
        component: () => import("../views/Admin/CareerTips/Index.vue"),
      },
      {
        path: "/career-tips-add",
        name: "app.career_tips.add",
        component: () => import("../views/Admin/CareerTips/Form.vue"),
      },
      {
        path: "/skill",
        name: "app.skill",
        component: () => import("../views/Admin/Skill/Index.vue"),
      },
      {
        path: "/student-welfare",
        name: "app.student-welfare",
        component: () => import("../views/Admin/StudentWelfare/Index.vue"),
      },
      {
        path: "/major-minor",
        name: "app.major-minor",
        component: () => import("../views/Admin/MajorMinor/Index.vue"),
      },
      {
        path: "/banner",
        name: "app.banner",
        component: () => import("../views/Admin/Banner/Index.vue"),
      },
      {
        path: "/site-settings",
        name: "app.site-setting",
        component: () => import("../views/Admin/SiteSetting/Index.vue"),
      },
      {
        //path: "/workshop",
        path: "/socio-phyche-counseling",
        name: "app.workshop",
        component: () => import("../views/Admin/Workshop/Index.vue"),
      },
      {
        path: "/internship",
        name: "app.internship",
        component: () => import("../views/Admin/Internship/Index.vue"),
      },
      {
        //path: "/workshop-application",
        path: "/socio-phyche-application",
        name: "app.workshop_application",
        component: () => import("../views/Admin/WorkshopApplication/Index.vue"),
      },
      {
        path: "/division",
        name: "app.division",
        component: () => import("../views/Admin/Division/Index.vue"),
      },
      {
        path: "/training",
        name: "app.training",
        component: () => import("../views/Admin/Training/Index.vue"),
      },
      {
        // path: "/training",
        path: "/training-workshop-seminar",
        name: "app.training",
        component: () => import("../views/Admin/Training/Index.vue"),
      },
      {
        // path: "/training-application",
        path: "/training-workshop-seminar-application",
        name: "app.training_application",
        component: () => import("../views/Admin/TrainingApplication/Index.vue"),
      },
      {
        path: "/interest",
        name: "app.interest",
        component: () => import("../views/Admin/JobInterests/Index.vue"),
      },
      {
        path: "/about-ccc",
        name: "app.about_ccc",
        component: () => import("../views/Admin/AboutCcc/Index.vue"),
      },
      {
        path: "/about-ccc-form",
        name: "app.about_ccc_form",
        component: () => import("../views/Admin/AboutCcc/Form.vue"),
      },
      {
        path: "/contact-us",
        name: "app.contact_us",
        component: () => import("../views/Admin/ContactUs/Index.vue"),
      },
      {
        path: "/co-curricular-activity",
        name: "app.co-curricular-activity",
        component: () =>
          import("../views/Admin/Co_CurriCular_Activity/Index.vue"),
      },
      {
        path: "/marquee-text",
        name: "app.marquee_text",
        component: () => import("../views/Admin/MarqueeText/Index.vue"),
      },
      {
        path: "/permission",
        name: "app.permission",
        component: () => import("../views/Admin/Permission/Index.vue"),
      },
      {
        path: "/designation",
        name: "app.designation",
        component: () => import("../views/Admin/Designation/Index.vue"),
      },
      {
        path: "/district",
        name: "app.district",
        component: () => import("../views/Admin/District/Index.vue"),
      },
      {
        path: "/job-interested-area",
        name: "app.job-interested-area",
        component: () => import("../views/Admin/JobInterestedArea/Index.vue"),
      },
      {
        path: "/cccfaq",
        name: "app.cccfaq",
        component: () => import("../views/Admin/CCCFaq/Index.vue"),
      },
      {
        path: "/cccUpdates",
        name: "app.cccUpdates",
        component: () => import("../views/Admin/CCCUpdates/Index.vue"),
      },
      {
        path: "/achievement",
        name: "app.achievement",
        component: () => import("../views/Admin/Achievement/Index.vue"),
      },
      {
        path: "/magazine",
        name: "app.magazine",
        component: () => import("../views/Admin/Magazine/Index.vue"),
      },
      {
        path: "/news",
        name: "app.news",
        component: () => import("../views/Admin/News/Index.vue"),
      },
      {
        path: "/professional-certification",
        name: "app.professional-certification",
        component: () => import("../views/Admin/ProCertification/Index.vue"),
      },
      {
        path: "/thana",
        name: "app.thana",
        component: () => import("../views/Admin/Thana/Index.vue"),
      },
      {
        path: "/country",
        name: "app.country",
        component: () => import("../views/Admin/Country/Index.vue"),
      },
      {
        path: "/department",
        name: "app.department",
        component: () => import("../views/Admin/Department/Index.vue"),
      },
      {
        path: "/subject",
        name: "app.subject",
        component: () => import("../views/Admin/Subject/Index.vue"),
      },
      {
        path: "/institute",
        name: "app.institute",
        component: () => import("../views/Admin/Institute/Index.vue"),
      },
      {
        path: "/user",
        name: "app.user",
        component: () => import("../views/User/Index.vue"),
      },
      // {
      //   path: "/jobcategory",
      //   name: "app.jobcategory",
      //   component: () => import("../views/Admin/JobCategory/Index.vue"),
      // },
      {
        path: "/jobsubcategory",
        name: "app.jobsubcategory",
        component: () => import("../views/Admin/JobSubCategory/Index.vue"),
      },
      {
        path: "/jobpost",
        name: "app.jobpost",
        component: () => import("../views/Admin/JobPost/Index.vue"),
      },
      {
        path: "/companies",
        name: "app.job_companies",
        component: () => import("../views/Admin/JobCompany/Index.vue"),
      },
      {
        path: "/companies-view",
        name: "app.job_companies_view",
        component: () => import("../views/Admin/JobCompany/View.vue"),
      },

      {
        path: "/dashboard-createjob",
        name: "dashboard_createjob",
        component: () => import("../views/Admin/JobPost/Create.vue"),
      },
      {
        path: "/dashboard-editjob",
        name: "dashboard_editjob",
        component: () => import("../views/Admin/JobPost/Edit.vue"),
      },
      {
        path: "/dashboard-viewjob",
        name: "dashboard_viewjob",
        component: () => import("../views/Admin/JobPost/View.vue"),
      },
      {
        path: "/dashboard-jobapplicants",
        name: "app.job_applicants",
        component: () => import("../views/Admin/JobApplicant/Index.vue"),
      },
      {
        path: "/dashboard-resumeview",
        name: "app.resume_view",
        component: () => import("../views/Admin/JobApplicant/View.vue"),
      },
      {
        path: "/audio-video",
        name: "app.audio-video",
        component: () => import("../views/Admin/AudioVideo/Index.vue"),
      },
      {
        path: "/notice-event",
        name: "app.notice-event",
        component: () => import("../views/Admin/NoticeEvent/Index.vue"),
      },
      {
        path: "/category",
        name: "app.category",
        component: () => import("../views/Admin/Category/Index.vue"),
      },
      {
        path: "/sub-category",
        name: "app.sub_category",
        component: () => import("../views/Admin/SubCategory/Index.vue"),
      },
      {
        path: "/who-we-are",
        name: "app.whoWeAre",
        component: () => import("../views/Admin/WhoWeAre/Index.vue"),
      },
      {
        path: "/partner",
        name: "app.partner",
        component: () => import("../views/Admin/Partner/Index.vue"),
      },
      {
        path: "/resource",
        name: "app.resource",
        component: () => import("../views/Admin/Resource/Index.vue"),
      },
      {
        path: "/guideline",
        name: "app.guideline",
        component: () => import("../views/Admin/Guideline/Internship/Index.vue"),
      },
      {
        path: "/slider",
        name: "app.slider",
        component: () => import("../views/Admin/Slider/index.vue"),
      },
      {
        path: "/slider-add",
        name: "app.slider_add",
        component: () => import("../views/Admin/Slider/Form.vue"),
      },
      {
        path: "/admin",
        name: "app.admin",
        component: () => import("../views/Admin/Admin/Index.vue"),
      },
      {
        path: "/role",
        name: "app.role",
        component: () => import("../views/Admin/Role/Index.vue"),
      },
      {
        path: "/menu",
        name: "app.menu",
        component: () => import("../views/Admin/Menu/Index.vue"),
      },
      {
        path: "/role-permission",
        name: "app.role-permission",
        component: () => import("../views/Admin/Role/Permission.vue"),
      },
      {
        path: "/alumni-home-setting",
        name: "app.alumniHomeSetting",
        component: () => import("../views/Admin/Setting/Alumni/AlumniHome.vue"),
      },
      {
        path: "/alumni-dashboard-setting",
        name: "app.alumniDashboardSetting",
        component: () => import("../views/Admin/Setting/Alumni/AlumniDashboard.vue"),
      },
      {
        path: "/ccc-home-setting",
        name: "app.cccHomeSetting",
        component: () => import("../views/Admin/Setting/Ccc/Home.vue"),
      },
      {
        path: "/job-portal-home-setting",
        name: "app.jobPortalHomeSetting",
        component: () => import("../views/Admin/Setting/JobPortal/Home.vue"),
      },
      {
        path: "/job-portal-dashboard-setting",
        name: "app.jobPortalDashboardSetting",
        component: () => import("../views/Admin/Setting/JobPortal/Dashboard.vue"),
      },
      {
        path: "/section-hide-show",
        name: "app.SectionHideShow",
        component: () => import("../views/Admin/Setting/SectionHideShow/Index.vue"),
      },
      {
        path: "/backup-restore",
        name: "app.BackupRestore",
        component: () => import("../views/Admin/Setting/BackupRestore/Index.vue"),
      },
      {
        path: "/seo",
        name: "app.seo",
        component: () => import("../views/Admin/Seo/index.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)",
    name: "unauthorized",
    component: () => import("../views/Error/Unauthorized.vue"),
  },

];

export const createRouter = () => {
  const router = _createRouter({
    history: import.meta.env.SSR
        ? createMemoryHistory("/")
        : createWebHistory("/"),
    routes,
  });

  router.beforeEach((to, from, next) => {
    const isAuthenticated = !!Cookies.get('adminLoggedInTokenCookie')
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

    if (requiresAuth && !isAuthenticated) {
      next({ name: 'AdminLogin' })
    } else if (requiresGuest && isAuthenticated) {
      next('/dashboard')
    } else if (isAuthenticated && to.name === 'AdminLogin') {
      next({ name: 'AdminLogin' })
    } else {
      next()
    }
  });

  return router;
};
