<template>
    <div id="ccc-footer">
        <footer>
            <!--Start Footer Area-->
            <div class="footer-area pt-30 pb-2">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-sm-6">
                            <div class="footer-logo-area">
                                <a href="#">
                                    <img :src="settingKeyAndValueArray.cccFooterLogo" alt="logo" style="height: 45px;">
                                </a>
                                <p> {{ settingKeyAndValueArray.cccSiteAddress }} </p>
                                <div class="contact-list">
                                    <ul>
                                        <li><a href="#"> {{ settingKeyAndValueArray.cccFooterContactOne }}, {{ settingKeyAndValueArray.cccFooterContactTwo }}, {{ settingKeyAndValueArray.cccFooterContactThree }} </a></li>
                                        <li><a href="#"> {{ settingKeyAndValueArray.cccFooterSiteEmail }} </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="footer-widjet">
                                <h3> {{ settingKeyAndValueArray.cccFooterSecoundColTitle }} </h3>
                                <div class="list">
                                    <ul>
                                        <li><a :href="settingKeyAndValueArray.cccFooterSecoundColLinkOne">{{ settingKeyAndValueArray.cccFooterSecoundColLinkOneTitle }}</a></li>
                                        <li><a :href="settingKeyAndValueArray.cccFooterSecoundColLinkTwo">{{ settingKeyAndValueArray.cccFooterSecoundColLinkTwoTitle }}</a></li>
                                        <li><a :href="settingKeyAndValueArray.cccFooterSecoundColLinkThree">{{ settingKeyAndValueArray.cccFooterSecoundColLinkThreeTitle }}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="footer-widjet">
                                <h3> {{ settingKeyAndValueArray.cccFooterThirdColTitle }} </h3>
                                <div class="list">
                                    <ul>
                                        <li><a :href="settingKeyAndValueArray.cccFooterThirdColLinkOne">{{ settingKeyAndValueArray.cccFooterThirdColLinkOneTitle }}</a></li>
                                        <li><a :href="settingKeyAndValueArray.cccFooterThirdColLinkTwo">{{ settingKeyAndValueArray.cccFooterThirdColLinkTwoTitle }}</a></li>
                                        <li><a :href="settingKeyAndValueArray.cccFooterThirdColLinkThree">{{ settingKeyAndValueArray.cccFooterThirdColLinkThreeTitle }}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-sm-6">
                            <div class="footer-widjet">
                                <h3> {{ settingKeyAndValueArray.cccFooterFourthColTitle }} </h3>
                                <div class="list">
                                    <div class="border-outline">
                                        <a href="https://goo.gl/maps/QnYrTZHGPYMzSQfK7">
                                            <img style="width: 99%;" :src="$store.state.ewuMapImage" :alt="$store.state.ewuMapImage">
                                        </a>
                                        <!--<a href="index.html"><img :src="$store.state.cccMap"
                                                                   :alt="$store.state.alt" /></a>-->
                                    </div>

                                    <p class="text-white" style="margin-top: 10px">
                                        Follow US:
                                        <ShareNetwork
                                            network="facebook"
                                            url="https://www.facebook.com/myewu"
                                            title="Location map"
                                            description="Location map"
                                            quote="Thank you"
                                            hashtags="Location"
                                        >
                                            <i class="ri-facebook-fill circular-icon"></i>
                                        </ShareNetwork>

                                        <ShareNetwork
                                            network="linkedin"
                                            url="https://www.linkedin.com/school/ewubd/"
                                            title="Location map"
                                            description="Location map"
                                            quote="Thank you"
                                            hashtags="Location"
                                        >
                                            <i class="ri-linkedin-fill circular-icon"></i>
                                        </ShareNetwork>

                                        <ShareNetwork
                                            network="twitter"
                                            url="https://twitter.com/myewubd"
                                            title="Location map"
                                            description="Location map"
                                            quote="Thank you"
                                            hashtags="Location"
                                        >
                                            <i class="ri-twitter-fill circular-icon"></i>
                                        </ShareNetwork>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="shape">
                        <img :src="$store.state.cccFooterBg" :alt="$store.state.cccFooterBg"  style="height: 325px; width: 100%;"/>
                    </div>
                </div>
            </div>
            <!--End Footer Area-->
            <div style="margin-top: 2px"></div>

            <!--Start Copyright Area-->
            <div class="copyright-area">
                <div class="container">
                    <div class="copyright">
                        <div class="row">
                            <div class="col-lg-10 col-md-4">
                                <div class="social-content">
                                    <ul>
                                        <li><span>Quick Links</span></li>
                                        <li>
                                            <a :href='settingKeyAndValueArray.cccFooterQuickLinksOne' type="button" class="btn btn-secondary btn-sm btn-responsive btn-block" style="border-radius: 20%">
                                                {{ settingKeyAndValueArray.cccFooterQuickLinksOneTitle }}
                                            </a>
                                        </li>
                                        <li>
                                            <a :href='settingKeyAndValueArray.cccFooterQuickLinksTwo' type="button" class="btn btn-secondary btn-sm btn-responsive btn-block" style="border-radius: 20%">
                                                {{ settingKeyAndValueArray.cccFooterQuickLinksTwoTitle }}
                                            </a>
                                        </li>
                                        <li>
                                            <a :href='settingKeyAndValueArray.cccFooterQuickLinksThree' type="button" class="btn btn-secondary btn-sm btn-responsive btn-block" style="border-radius: 20%">
                                                {{ settingKeyAndValueArray.cccFooterQuickLinksThreeTitle }}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Copyright Area-->

            <!-- Start Go Top Area -->
            <div class="go-top">
                <i class="ri-arrow-up-s-line"></i>
                <i class="ri-arrow-up-s-line"></i>
            </div>
            <!-- End Go Top Area -->
        </footer>
    </div>
</template>

<script>
export default {
    name: "CccFooter",

    data() {
        return {
            backendUrl: import.meta.env.VITE_API_BASE_URL,
            
            settingKeyAndValueArray: [
                'cccFooterLogo',
                'cccSiteAddress',
                'cccFooterContactOne',
                'cccFooterContactTwo',
                'cccFooterContactThree',
                'cccFooterSiteEmail',

                'cccFooterSecoundColTitle',
                'cccFooterSecoundColLinkOneTitle',
                'cccFooterSecoundColLinkOne',
                'cccFooterSecoundColLinkTwoTitle',
                'cccFooterSecoundColLinkTwo',
                'cccFooterSecoundColLinkThreeTitle',
                'cccFooterSecoundColLinkThree',

                'cccFooterThirdColTitle',
                'cccFooterThirdColLinkOneTitle',
                'cccFooterThirdColLinkOne',
                'cccFooterThirdColLinkTwoTitle',
                'cccFooterThirdColLinkTwo',
                'cccFooterThirdColLinkThreeTitle',
                'cccFooterThirdColLinkThree',

                'cccFooterFourthColTitle',
                
                'cccFooterQuickLinksOneTitle',
                'cccFooterQuickLinksOne',
                'cccFooterQuickLinksTwoTitle',
                'cccFooterQuickLinksTwo',
                'cccFooterQuickLinksThreeTitle',
                'cccFooterQuickLinksThree',
            ]
        };
    },

    mounted() {
        this.$setting(this.settingKeyAndValueArray).then(value => {
            this.settingKeyAndValueArray = value;
        })
    },
};
</script>
<style>
    .circular-icon {
        background-color: white;
        border-radius: 50%;
        color: red;
        padding: 10px;
        margin:5px;
        transition: background-color 0.6s ease;
    }

    .circular-icon:hover {
        background-color: red;
        color: white;
    }
</style>
