<template>
  <div class="my-4">
    <div>
      <h1 class="text-2xl font-medium text-center mb-1" style="color: #8d53a4">
        Register as a User
      </h1>
      <p class="text-center">
        Already have an account? Click
        <router-link to="/login" class="mouse-pointer text-blue-800"
          >here</router-link
        >
        to login.
      </p>
      <div class="ml-5 display-flex">
        <div class="mt-3">
          <label>Name</label>
          <input
            type="text"
            placeholder="Full Name"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.name"
          />
        </div>
        <div class="mt-3">
          <label>Birthday </label> <br />
          <input
            type="date"
            class="border-2 rounded-xl p-2 w-11/12"
            v-model="user.dob"
          />
        </div>
        <div class="mt-3">
          <label>Gender</label>
          <select class="border-2 rounded-xl p-2 w-11/12" v-model="user.gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other/Prefer not to say</option>
          </select>
        </div>
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
          @click="onRegister"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserRegisterView",
  data: () => ({
    user: {
      name: "",
      dob: "",
      gender: "male",
      email: "",
      password: "",
    },
  }),
  methods: {
    async onRegister() {
      const { data } = await axios.post("http://localhost:8000/user_register", {
        name: this.user.name,
        dob: this.user.dob,
        gender: this.user.gender,
        email: this.user.email,
        password: this.user.password,
      });
      localStorage.setItem("user_id", data._id);
      localStorage.setItem("user_type", data.type);
      console.log(data);
    },
  },
};
</script>
