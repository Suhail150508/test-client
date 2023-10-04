<template>
    <!--Start Page Banner-->
    <div class="page-banner-area bg-2">
        <div class="container">
            <div class="page-banner-content">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li>Search Results</li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Page Banner-->

    <!--Start Faq Area-->
    <div class="faq-area ptb-50">
        <div class="container">
            <div class="row align-items-center">
                <h2>Search Results for "{{ $route.query.q ? $route.query.q : query }}"</h2>
                <div class="container mt-3 pb-5">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="input-group">
                                <input type="text" v-model="query" placeholder="Search Google" class="form-control">
                                <div class="input-group-append">
                                    <button @click="clearSearch" class="btn btn-outline-warning">&#x2715;</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <button @click="searchButton" class="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>

                <ul class="search-results">
                    <li v-for="result in results" :key="result.title" class="result-item">
                        <div class="result-content">
                            <h5 class="result-title"><a :href="result.link" target="_blank">{{ result.title }}</a></h5>
                            <a :href="result.link" class="result-url" target="_blank">{{ result.displayLink }}</a>
                            <div class="row">
                                <img v-if="result.image" :src="result.image" alt="" style="height:40px;width:80px;">
                                <p class="result-snippet col-md-10">{{ result.snippet }}</p>
                            </div>
                            <hr>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--End Faq Area-->
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                query: this.$route.query.q,
                results: [],
            };
        },
        mounted() {
            this.search();
        },
        methods: {
            search() {
                const apiKey = 'AIzaSyBfUCOIfhwpdJ92OIiyAc9DbKbOt8ocefM'; // Replace with your Google Custom Search API key
                const searchEngineId = '23a6fc89da2e1434e'; // Replace with your Google Custom Search Engine ID
                const query = this.$route.query.q;

                const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

                axios.get(url)
                    .then(response => {
                        this.results = response.data.items.map(item => ({
                            title: item.title,
                            link: item.link,
                            snippet: item.snippet,
                            displayLink: item.displayLink,
                            image: item.pagemap?.cse_thumbnail?.[0]?.src || 'default-thumbnail.jpg',
                        }));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            searchButton() {
                const apiKey = 'AIzaSyBfUCOIfhwpdJ92OIiyAc9DbKbOt8ocefM'; // Replace with your Google Custom Search API key
                const searchEngineId = '23a6fc89da2e1434e'; // Replace with your Google Custom Search Engine ID
                const query = this.query;

                const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

                axios.get(url)
                    .then(response => {
                        this.results = response.data.items.map(item => ({
                            title: item.title,
                            link: item.link,
                            snippet: item.snippet,
                            displayLink: item.displayLink,
                            image: item.pagemap?.cse_thumbnail?.[0]?.src || 'default-thumbnail.jpg',
                        }));
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            clearSearch(){
                this.query = '';
                this.results = []; // Clear the search results
                history.replaceState(null, '', window.location.pathname);
            },
        },
    };
</script>

<style scoped>
    .search-results {
        list-style: none;
        padding: 0;
    }

    .result-item {
        margin-bottom: 20px;
    }

    .result-title {
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 5px;
    }

    .result-url {
        color: #1a0dab;
        text-decoration: none;
    }

    .result-snippet {
        color: #545454;
        margin: 0;
    }

    /* Optional styling for the input field */
    input[type="text"] {
        margin: 0px;
    }
</style>