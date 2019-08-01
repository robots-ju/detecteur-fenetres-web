<template>
  <div>
    <the-menu></the-menu>
    <div class="container d-flex flex-row">
      <div class="w-50 mt-4">
        <windows-list></windows-list>
      </div>
    </div>
  </div>
</template>

<script>
import TheMenu from "../components/features/user/TheMenu";
import WindowsList from "../components/features/user/windows/WindowsList";
export default {
  name: "User",
  components: {
    WindowsList,
    TheMenu
  },
  beforeCreate() {
    this.$store.dispatch('firstFetchData');
  }
};
</script>

<style scoped>
</style>


