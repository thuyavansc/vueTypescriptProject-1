<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import RefVsReactive1 from "./views/exercise/RefVsReactive1.vue";
import Test2 from "@/views/exercise/Test2.vue";
// import Login from "../views/Auth/Login.vue";
import GlobalLoader from "vue-global-loader/GlobalLoader.vue";
import CircleSpinner from "vue-global-loader/CircleSpinner.vue";
</script>

<template>
  <!-- <RefVsReactive1 /> -->
  <!-- <Test2 /> -->

  <GlobalLoader>
    <CircleSpinner />
  </GlobalLoader>

  <RouterView />
</template>

<style scoped></style>
