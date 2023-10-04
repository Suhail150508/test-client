import { createStore } from "vuex";

const store = createStore({
  state: {
    // define global variables
    admin: {},
    image: "/cccAssets/assets/images/news/news-1.jpg",
    admin_avatar: "/cccAssets/assets/images/admin_avatar.png",
    alt: "Image",
    cccLogo: "/cccAssets/assets/images/ewu-logo-header-white.png",
    clubLogo: "/cccAssets/assets/images/ewu-logo-header-blue.png",
    notice_event: "/cccAssets/assets/images/notice_event.png",
    cccMap: "/cccAssets/assets/images/map.png",
    cccFooterBg: "/cccAssets/assets/images/shape-1.png",
    ewuMapImage: "/cccAssets/assets/images/ewuMap.PNG",
    alumniHeaderImage: "/cccAssets/assets/images/alumni/alumni-1.jpg",
    alumniImage: "/cccAssets/assets/images/alumni/alumni-1.jpg",
    alumniLogo: "/cccAssets/assets/images/alumni/alumni-1.jpg",
    avatar: "/assets/images/avatar.png",
    frontendUrl: "http://127.0.0.1:5173/loginprofile/",

    // backendUrl: "http://localhost:8000/",
    // backendUrl: "https://ccc-server.ewubd.edu/",
    // backendUrl: "https://server.fscd.xyz/",

    // backendUrl: "https://server-live.fscd.xyz/",
  },

  getters: {
    // get state variables value
    getAdmin: function (state) {
      return state.admin;
    },
  },

  actions: {
    //action to be performed
    setAdmin(context, payload) {
      context.commit("updateAdmin", payload);
    },

    removeAdmin(context) {
      context.commit("updateAdmin", null);
    },
  },

  mutations: {
    // update state variables value
    updateAdmin(state, admin) {
      state.admin = admin;
    },
  },
});

export default store;
