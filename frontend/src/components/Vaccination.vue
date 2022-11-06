<template>
  <div class="border-2 my-4 mx-5 rounded-xl p-3">
    <p class="text-xl font-medium">
      <span class="font-semibold">Vaccine: </span>
      <span>{{ vaccination.vaccine }}</span>
      <br />
      <span class="font-semibold">Lot Number: </span>
      <span>{{ vaccination.product }}</span>
      <br />
      <span class="font-semibold">Date Given: </span>
      <span>{{ vaccination.date }}</span>
      <br />
      <span class="font-semibold">Physician: </span>
      <span>{{ vaccination.physician }}</span>
      <br />
      <span class="font-semibold">Location: </span>
      <span>{{ vaccination.location }}</span>
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Vaccination",
  props: ["vaccination"],
};
</script>
