<script setup>
import { provide, ref } from 'vue';
import Attribution from './components/Attribution.vue';
import AddBirthDate from './components/AddBirthDate.vue';
import DisplayCurrentAge from './components/DisplayCurrentAge.vue';

const day = ref('');
const month = ref('');
const year = ref('');
const submitValid = ref(false);

provide('day', day);
provide('month', month);
provide('year', year);
provide('submitValid', submitValid);
</script>

<template>
  <div class="frame bg-off-white h-full w-full pt-10 p-2 md:pt-16">
    <div 
      class="card bg-white py-5 px-2 rounded-xl rounded-ee-[25%] max-w-[600px] mx-auto md:px-4"
    >  
      <AddBirthDate />
      <DisplayCurrentAge />
    </div>
  </div>
  <Attribution />
</template>

<style scoped></style>
