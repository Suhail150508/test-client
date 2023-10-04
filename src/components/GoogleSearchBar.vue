<template>
    <div id="google-search-bar">
        <!-- <input type="text" v-model="query" @keyup.enter="navigateToSearchResults" placeholder="Search Google"> -->

        <div class="row mb-3">
            <div class="col-sm-7 m-auto">
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                <input type="text" name="googleSearch" v-model="query" @keyup.enter="navigateToSearchResults" class="form-control shadow-lg bg-white rounded" placeholder="Search Google" />
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                query: '',
            };
        },
        methods: {
            navigateToSearchResults() {
                this.$router.push({ name: 'SearchResults', query: { q: this.query } });
            },
        },
    };
</script>

<style>
    /* input[type="text"] {
        margin: 10px;
        padding: 10px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    } */
</style>
