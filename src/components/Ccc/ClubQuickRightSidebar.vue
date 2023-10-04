<template>
    <div class="col-lg-4">

        <div class="tranding">
            <h3>Trending</h3>
            <div class="tranding-box" v-for="(event) in events">
                <div class="tranding-content">
                    <!--<router-link
                            :to="{path: '/clubs/'+clubShortname+'/single-events/'+event.title}"
                    >
                        &lt;!&ndash;                            :to="{ name: 'singleMedia', query: { clubId:event.club_id, mediaId: event.id }}"&ndash;&gt;

                        <img :src="event.club_media_photo.source" :alt="event.id">
                        <h4>{{event.title}}</h4>
                        <button type="button" class="btn btn-warning btn-sm">{{ moment(event.date_from).format("MMM Do YY") }}</button>
                    </router-link>-->

                    <router-link :to="getEventPath(event)">
                        <img :src="event.club_media_photo.source" :alt="event.id">
                        <h4>{{ event.title }}</h4>
                        <button type="button" class="btn btn-warning btn-sm">{{ moment(event.date_from).format("MMM Do YY") }}</button>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import slugify from 'slugify';
    export default {
        name: 'ClubQuickRightSidebar',
        data() {
            return {
                backendUrl: import.meta.env.VITE_API_BASE_URL,
                
                events: [],
                clubShortname: this.$route.params.shortName,
                moment: moment
            };
        },

        created() {
            this.getData();
        },

        watch: {
            $route (to, from){
                this.clubShortname=to.params.shortName;
            }
        },

        methods: {

            getData() {
                //get  3 events
                axios.get(`${this.backendUrl}club-media/`+this.clubShortname+`/`+'events')
                    .then((response) => {
                        this.events = response.data.slice(Math.max(response.data.length - 5, 0));
                    })
                    .catch((e) => {
                        console.log(e);
                        this.$Progress.fail();
                    });
            },

            generateSlug(title) {
                return slugify(title, {
                    replacement: '-',  // Replace spaces with '-'
                    lower: true        // Convert to lowercase
                });
            },
            getEventPath(event) {
                const slug = this.generateSlug(event.title);
                return `/clubs/${this.clubShortname}/single-media/${slug}`;
            },
        }
    }
</script>