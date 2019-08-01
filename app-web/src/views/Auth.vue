<template>
  <div class="container d-flex flex-column">
    <div class="card my-5 w-100">
      <div class="card-header bg-green text-white">Connection</div>
      <div class="card-body align-items-center justify-content-between d-flex flex-column">
        <form @submit.prevent="trySubmit">
          <div class="form-group">
            <label>Email:</label>
            <input v-model="form.email" type="text" placeholder="Email" class="form-control">
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="form-control"
            >
          </div>
          <button class="btn btn-success w-100 mt-3 mb-2">Se connecter</button>
          <div v-if="success" class="w-100 text-center align-items-center mt-2">
            <div class="spinner-border text-green" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-if="errors.length" class="alert alert-danger w-100">
      <li class="list-group pt-1">
        <ul v-for="error in errors" :key="error">- {{ error }}</ul>
      </li>
    </div>
  </div>
</template>


<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      success: false,
      errors: []
    };
  },
  methods: {
    trySubmit() {
      this.errors = [];
      if (this.form.password === "1234") {
        this.success = true;
        setTimeout(() => {
          this.$router.push("/home");
        }, 1500);
      } else {
        this.errors.push("Mauvais mot de passe");
        this.success = false;
      }
    }
  },

};
</script>

<style scoped>
.bg-green {
  background-color: #27ae60;
}

.text-green {
  color: #27ae60;
}
</style>
