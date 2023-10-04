// Import Vue and other dependencies
import { createSSRApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import {createRouter} from './router';
import store from './store';
import { createHead } from '@vueuse/head';
import '@/registerServiceWorker';
import VueSocialSharing from 'vue-social-sharing';

// vue sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// notification start
import Notifications from '@kyvg/vue3-notification';

// progressbar start
import VueProgressBar from '@aacassandra/vue3-progressbar';
const options = {
  color: "#50d38a",
  failedColor: "#874b4b",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

// Service Worker for PWA start
// if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const serviceWorkerPath = '/service-worker.js';

//     navigator.serviceWorker
//       .register(serviceWorkerPath)
//       .then((registration) => {
//         console.log('Service worker registered:', registration);
//       })
//       .catch((error) => {
//         console.error('Service worker registration failed:', error);
//       });
//   });
// }

// add global function start
const backendUrl = import.meta.env.VITE_API_BASE_URL;
const $setting = async (key) => {
  try {
    const response = await axios.get(`${backendUrl}setting/fetch`, {
      params: { keysArray: key },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching setting:', error);
    return false;
  }
};

export function createApp() {
    const app = createSSRApp(App);
    const router = createRouter();
    app.use(router);
    app.use(store);
    const head = createHead();
    app.use(head);
    app.use(VueSocialSharing);
    app.use(VueSweetalert2);
    app.use(Notifications);
    app.use(VueProgressBar, options);

    // add global function to app config
    app.config.globalProperties.$setting = $setting;

    return { app, router, head };
}





// Import Vue and other dependencies
// import { createSSRApp } from 'vue';
// import App from './App.vue';
// import {createRouter} from './router';
// import store from './store';
// import axios from 'axios';
// import VueSocialSharing from 'vue-social-sharing'
// import { createHead } from '@vueuse/head'
// const head = createHead();

// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import VueProgressBar from '@aacassandra/vue3-progressbar';
// import Notifications from '@kyvg/vue3-notification';
// // import VueGoogleMaps from '@fawmi/vue-google-maps';
// // import * as serviceWorker from '/src/service-worker.js';

// // Import the root component, router, and store



// /*if ('serviceWorker' in navigator) {
//     // window.addEventListener('load', () => {
//         navigator.serviceWorker.register(serviceWorker)
//             .then(registration => {
//                 console.log('Service worker registered: ', registration)
//             })
//             .catch(registrationError => {
//                 console.log('Service worker registration failed: ', registrationError)
//             })
//     // })
// }*/

// // new code
// if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         const serviceWorkerPath = '/service-worker.js';

//         navigator.serviceWorker
//             .register(serviceWorkerPath)
//             .then((registration) => {
//                 console.log('Service worker registered:', registration);
//             })
//             .catch((error) => {
//                 console.error('Service worker registration failed:', error);
//             });
//     });
// }
// // new code

// // Configure Vue plugins
// export function createApp() {
//     const app = createSSRApp(App);
//     const router = createRouter();
//         app.use(router)
//         app.use(store)
//         app.use(VueSweetalert2)
//         app.use(VueProgressBar, {
//             color: '#50d38a',
//             failedColor: '#874b4b',
//             thickness: '5px',
//             transition: {
//                 speed: '0.2s',
//                 opacity: '0.6s',
//                 termination: 300,
//             },
//             autoRevert: true,
//             location: 'top',
//             inverse: false,
//         })
//         app.use(Notifications)
//         app.use(VueSocialSharing)
//         app.use(head)
//         /*app.use(VueGoogleMaps, {
//             load: {
//                 key: 'YOUR_API_KEY',
//                 libraries: 'places',
//             },
//         });*/

//         // add global function start
//         let backendUrl = import.meta.env.VITE_API_BASE_URL;
//         app.config.globalProperties.$setting = function(key) {
//             return axios.get(`${backendUrl}setting/fetch`, {params: { keysArray: key }})
//                 .then((response) => {return response.data})
//                 .catch(error => false);
//         }

//     return { app, head, router };
// }



// global function start for site setting
/*import axios from 'axios';
let backendUrl = import.meta.env.VITE_API_BASE_URL;
app.config.globalProperties.$setting = function (key) {
  // return axios.get(`${backendUrl}setting/${key}`)
  // .then((response) => {
  //   return response.data.message;
  // })
  // .catch(error => false);
  
  return axios.get(`${backendUrl}setting/fetch`, {params: { keysArray: key }})
  .then((response) => {return response.data})
  .catch(error => false);
}*/

// Mount the app
// app.mount('#app');
