<template>
  <div class="page-header hide-on-screen">
    <!-- <h1>{{ title }}</h1> -->
    <img
      :src="$store.state.cccLogo"
      :alt="$store.state.alt"
      class="main-logo"
    />
    <hr />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
/* .page-header {
  text-align: center;
  margin-bottom: 20px;
} */

.hide-on-screen {
  display: none;
}

@media print {
  .hide-on-screen {
    display: block;
  }
}
</style>

