<script setup>
import { inject, ref, watch } from 'vue';
import ageCalculator from '../utils/ageCal'

let year = inject('year');
let month = inject('month');
let day = inject('day');
let submitValid = inject('submitValid');


let years = ref(null);
let months = ref(null);
let days = ref(null);

watch([submitValid], ([submitValid]) => {
  if (submitValid) {
    const age = ageCalculator(day.value, month.value, year.value);
    years.value = age.years;
    months.value = age.months;
    days.value = age.days;
  }
})

watch([years, months, days], () =>{
  submitValid.value = false;
})

</script>

<template>
  <div>
    <p class=" text-2xl italic font-extrabold md:text-5xl">
      <span class="text-purple">{{ years ? years : '--' }}</span>
      years
    </p>
    <p class=" text-2xl italic font-extrabold md:text-5xl">
      <span class="text-purple">{{ months ? months : '--' }}</span>
      months
    </p>
    <p class=" text-2xl italic font-extrabold md:text-5xl">
      <span class="text-purple">{{ days ? days : '--' }}</span>
      days
    </p>
  </div>
</template>

<style></style>