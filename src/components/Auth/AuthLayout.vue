<template>
   <!-- Header Start -->
   <CccHeader></CccHeader>
   <!-- Header End -->

   <!-- main content start -->
   <router-view></router-view>
   <!-- main content end -->

   <!-- Footer Start -->
   <CccFooter></CccFooter>
   <!-- Footer End -->
</template>

<script>
import CccHeader from "../Ccc/CccHeader.vue";
import CccFooter from "../Ccc/CccFooter.vue";

export default {
   name: 'AuthLayout',
   components: { CccHeader, CccFooter },
   beforeCreate() {
      if (typeof window !== 'undefined') {
         // CSS
         let bodyStyle1 = document.createElement('link')
         bodyStyle1.setAttribute('href', 'cccAssets/assets/css/bootstrap.min.css')
         bodyStyle1.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle1)

         let bodyStyle2 = document.createElement('link')
         bodyStyle2.setAttribute('href', 'cccAssets/assets/css/meanmenu.css')
         bodyStyle2.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle2)

         let bodyStyle3 = document.createElement('link')
         bodyStyle3.setAttribute('href', 'cccAssets/assets/css/owl.carousel.min.css')
         bodyStyle3.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle3)

         let bodyStyle4 = document.createElement('link')
         bodyStyle4.setAttribute('href', 'cccAssets/assets/css/owl.theme.default.min.css')
         bodyStyle4.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle4)

         let bodyStyle5 = document.createElement('link')
         bodyStyle5.setAttribute('href', 'cccAssets/assets/css/magnific-popup.css')
         bodyStyle5.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle5)

         let bodyStyle6 = document.createElement('link')
         bodyStyle6.setAttribute('href', 'cccAssets/assets/css/flaticon.css')
         bodyStyle6.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle6)

         let bodyStyle7 = document.createElement('link')
         bodyStyle7.setAttribute('href', 'cccAssets/assets/css/remixicon.css')
         bodyStyle7.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle7)

         let bodyStyle8 = document.createElement('link')
         bodyStyle8.setAttribute('href', 'cccAssets/assets/css/odometer.min.css')
         bodyStyle8.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle8)

         let bodyStyle9 = document.createElement('link')
         bodyStyle9.setAttribute('href', 'cccAssets/assets/css/aos.css')
         bodyStyle9.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle9)

         let bodyStyle10 = document.createElement('link')
         bodyStyle10.setAttribute('href', 'cccAssets/assets/css/style.css')
         bodyStyle10.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle10)

         let bodyStyle11 = document.createElement('link')
         bodyStyle11.setAttribute('href', 'cccAssets/assets/css/dark.css')
         bodyStyle11.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle11)

         let bodyStyle12 = document.createElement('link')
         bodyStyle12.setAttribute('href', 'cccAssets/assets/css/responsive.css')
         bodyStyle12.setAttribute('rel', 'stylesheet')
         document.head.appendChild(bodyStyle12)

         //script
         let bodyScript1 = document.createElement('script')
         bodyScript1.setAttribute('src', 'cccAssets/assets/js/jquery.min.js')
         document.body.appendChild(bodyScript1)

         let bodyScript2 = document.createElement('script')
         bodyScript2.setAttribute('src', 'cccAssets/assets/js/bootstrap.bundle.min.js')
         document.body.appendChild(bodyScript2)

         let bodyScript3 = document.createElement('script')
         bodyScript3.setAttribute('src', 'cccAssets/assets/js/jquery.meanmenu.js')
         document.body.appendChild(bodyScript3)

         let bodyScript4 = document.createElement('script')
         bodyScript4.setAttribute('src', 'cccAssets/assets/js/owl.carousel.min.js')
         document.body.appendChild(bodyScript4)

         let bodyScript5 = document.createElement('script')
         bodyScript5.setAttribute('src', 'cccAssets/assets/js/carousel-thumbs.min.js')
         document.body.appendChild(bodyScript5)

         let bodyScript6 = document.createElement('script')
         bodyScript6.setAttribute('src', 'cccAssets/assets/js/jquery.magnific-popup.js')
         document.body.appendChild(bodyScript6)

         let bodyScript7 = document.createElement('script')
         bodyScript7.setAttribute('src', 'cccAssets/assets/js/aos.js')
         document.body.appendChild(bodyScript7)

         let bodyScript8 = document.createElement('script')
         bodyScript8.setAttribute('src', 'cccAssets/assets/js/odometer.min.js')
         document.body.appendChild(bodyScript8)

         let bodyScript9 = document.createElement('script')
         bodyScript9.setAttribute('src', 'cccAssets/assets/js/appear.min.js')
         document.body.appendChild(bodyScript9)

         let bodyScript10 = document.createElement('script')
         bodyScript10.setAttribute('src', 'cccAssets/assets/js/form-validator.min.js')
         document.body.appendChild(bodyScript10)

         let bodyScript11 = document.createElement('script')
         bodyScript11.setAttribute('src', 'cccAssets/assets/js/contact-form-script.js')
         document.body.appendChild(bodyScript11)

         let bodyScript12 = document.createElement('script')
         bodyScript12.setAttribute('src', 'cccAssets/assets/js/ajaxchimp.min.js')
         document.body.appendChild(bodyScript12)

         let bodyScript13 = document.createElement('script')
         bodyScript13.setAttribute('src', 'cccAssets/assets/js/custom.js')
         document.body.appendChild(bodyScript13)

         /*let bodyScript14 = document.createElement('script')
         bodyScript14.setAttribute('src', 'cccAssets/asset/sw.js')
         document.body.appendChild(bodyScript14)*/
      }
   }
}
</script>

<style scoped>

</style>