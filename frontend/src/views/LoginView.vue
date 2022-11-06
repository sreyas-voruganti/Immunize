<template>
  <div class="mt-4">
    <h1 class="text-2xl font-medium text-center mb-1" style="color: #8d53a4">
      Login
    </h1>
    <p class="mx-2 text-center">
      Don't have an account? Register as a
      <router-link to="/user_register" class="mouse-pointer text-blue-800"
        >User</router-link
      >
      or a
      <router-link to="/give_register" class="mouse-pointer text-blue-800"
        >Doctor</router-link
      >.
    </p>
    <div class="ml-5 display-flex">
      <div class="mt-3">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="user.email"
        />
      </div>
      <div class="mt-3">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="user.password"
        />
      </div>
      <button
        class="px-3 py-2 mt-7 rounded-full w-11/12 text-xl"
        style="background-color: #8d53a4; color: white"
        @click="onLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async onLogin() {
      const { data } = await axios.post("http://localhost:8000/login", {
        email: this.user.email,
        password: this.user.password,
      });
      localStorage.setItem("user_id", data._id);
      localStorage.setItem("user_type", data.type);
      window.location.href = "/home";
    },
  },
};
</script>
