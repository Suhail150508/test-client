<template>
    <div class="unauthorized-page">
        <div class="background-image"></div>
        <div class="content">
            <h1 class="title">Unauthorized Access</h1>
            <p class="message">Sorry, but you are not authorized to access this page.</p>
            <button class="back-button" @click="goBack">Go Back</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            goBack() {
                // Redirect the user back to the previous page or another appropriate location
                this.$router.go(-1); // Example: Go back one step in the browser history
            },
        },
    };
</script>

<style scoped>
    .unauthorized-page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f8f8f8;
    }

    .background-image {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('../../../public/icons/unauthorized.png');
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.5; /* Adjust the opacity as desired */
        z-index: -1;
    }

    .content {
        text-align: center;
        z-index: 1;
    }

    .title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .message {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }

    .back-button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: #007bff;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
    }
</style>
