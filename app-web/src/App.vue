<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";

export default {
  name: "app",
  components: {
    TheHeader
  }
};
</script>

<style>
</style>
