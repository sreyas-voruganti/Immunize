<template>
  <div
    class="mt-10 px-10 animate__animated animate__fadeInUp"
    style="color: #8d53a4; border-color: #ffda59"
  >
    <h1
      class="text-5xl font-medium text-center"
      style="font-family: 'Roboto', sans-serif; font-size: 56px"
    >
      Welcome to Immunize!
    </h1>
    <img
      src="https://www.beaumont.org/images/default-source/primary-care/getting-to-know-doctor.jpg"
      class="rounded-lg m-30 w-full my-5"
    />
    <h3
      class="text-center mt-4 text-2xl"
      style="font-family: 'Roboto', sans-serif; font-size: 28px"
    >
      All your medical records in one place.
    </h3>

    <div>
      <p class="mt-5 text-xl text-center">
        Immunize uses blockchain technology to securely store vaccination
        records.
      </p>
      <div class="flex justify-center space-x-5 mt-5">
        <a
          class="px-3 py-2 rounded"
          style="background-color: #8d53a4; color: white"
          href="/user_register"
        >
          For Users
        </a>
        <a
          class="px-3 py-2 rounded"
          style="background-color: #8d53a4; color: white"
          href="/doctor_register"
        >
          For Doctors
        </a>
      </div>
      <p class="mt-8 text-xl">Powered by</p>
      <img
        src="http://cdn.shopify.com/s/files/1/0602/6421/8805/files/6148aea00f7f900364e37426_deso-logo-blackpng.png"
        class="rounded-lg m-30 w-48 mt-3"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
