<template>
  <div class="container">
    <div class="card">
      <div class="card-header bg-green text-white">Liste des fenêtres</div>
      <div class="card-body">
        <ul class="form-group">
          <li v-for="window in windows" :key="window.id">
            {{ window.name }} -
            <span :style="{ color: stateColor(window) }">{{ window.state }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    windows(){
      return this.$store.state.windows;
    }
  },
  methods: {
    stateColor(window) {
      if (window.state == "opened") {
        return "#27ae60";
      } else if (window.state == "closed") {
        return "#e74c3c";
      }
    }
  }
};
</script>

<style scoped>
.bg-green {
  background-color: #27ae60;
}
</style>
