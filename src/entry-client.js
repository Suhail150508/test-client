import { createApp } from "./main";

const { app, router } = createApp();

router.isReady().then(() => {
  app.mount("#app");

  console.log("hydrated");
});





/*import { createApp } from './main';
const { app, router } = createApp();
// Check if we are running on the client-side (browser)
const isClient = typeof window !== 'undefined';
// Mount the app only after jQuery and other client-side dependencies are loaded
if (isClient) {
    (async () => {
        await Promise.all([
            import('./cccAssets/assets/js/jquery.min.js'),
            import('./cccAssets/assets/js/font-awesome.min.js'),
            import('./cccAssets/assets/js/bootstrap.bundle.min.js'),
            import('./cccAssets/assets/js/jquery.meanmenu.js'),
            import('./cccAssets/assets/js/owl.carousel.min.js'),
            import('./cccAssets/assets/js/odometer.min.js'),
            import('./cccAssets/assets/js/appear.min.js'),
            import('./cccAssets/assets/js/form-validator.min.js'),
            import('./cccAssets/assets/js/contact-form-script.js'),
            import('./cccAssets/assets/js/ajaxchimp.min.js'),
            // import('./assets/js/carousel-thumbs.min.js'),
            // Import other client-side dependencies here
        ]);
        // All client-side dependencies are now available, you can use them here if needed
        app.mount('#app');
    })();
} else {
    app.mount('#app');
}*/
