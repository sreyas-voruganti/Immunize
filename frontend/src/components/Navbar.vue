<template>
  <div
    class="border-b-4 fixed top-0 w-full pb-2"
    style="border-color: #8d53a4; background-color: #fefcfe; color: #79787d"
  >
    <div
      class="text-center text-2xl font-bold flex flex-row justify-center align-center"
    >
      <img src="logo4.png" class="h-12" />
      <!-- <p class="my-3 text-4xl" style="color: #8d53a4">Patienti</p> -->
    </div>
    <nav class="m-nav font-semibold text-xl" v-if="getAuthType() == 'user'">
      <router-link to="/home" tag="p">Home</router-link>
      <router-link to="/user_profile" tag="p">Profile</router-link>
      <p @click="logout()">Logout</p>
    </nav>
    <nav
      class="m-nav font-semibold text-xl"
      v-else-if="getAuthType() == 'doctor'"
    >
      <router-link to="/home" tag="p">Home</router-link>
      <router-link to="/doctor_vaccination" tag="p">Create</router-link>
      <router-link to="/doctor_profile" tag="p">Profile</router-link>
      <p @click="logout()">Logout</p>
    </nav>
    <nav class="m-nav font-semibold text-xl" v-else>
      <router-link to="/home" tag="p">Home</router-link>
      <router-link to="/user_register" tag="p">Users</router-link>
      <router-link to="/doctor_register" tag="p">Doctors</router-link>
      <router-link to="/login" tag="p">Login</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  methods: {
    getAuthType() {
      return localStorage.getItem("user_type");
    },
    logout() {
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user");
      window.location.href = "/login";
    },
  },
};
</script>

<style>
.m-nav {
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-evenly;
  space-between: 10px;
}
.router-link-active {
  color: #8d53a4;
}
</style>
