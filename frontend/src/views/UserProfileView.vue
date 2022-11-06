<template>
  <div class="mt-3">
    <h1 class="text-2xl font-medium text-center" style="color: #8d53a4">
      <i class="fa-solid fa-user fa-sm"></i> Your Profile
    </h1>
    <div v-if="user" class="mx-5 mt-2 text-xl">
      <p><span class="font-semibold">Name:</span> {{ user.name }}</p>
      <p><span class="font-semibold">Email:</span> {{ user.email }}</p>
      <p><span class="font-semibold">Birthday:</span> {{ user.dob }}</p>
    </div>
    <p class="mt-4 font-semibold ml-3 text-xl">
      Your Vaccinations ({{ vaccinations.length }}):
    </p>
    <div>
      <Vaccination
        v-for="vaccination in vaccinations"
        :key="vaccination.id"
        :vaccination="vaccination"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vaccination from "@/components/Vaccination.vue";
export default {
  name: "UserProfileView",
  data: () => ({
    user: null,
    vaccinations: [],
  }),
  components: {
    Vaccination,
  },
  methods: {
    fetchData() {
      axios
        .post("http://localhost:8000/user_profile", {
          user_id: localStorage.getItem("user_id"),
        })
        .then((res) => {
          this.user = res.data.user;
          this.vaccinations = res.data.vaccinations;
        });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
