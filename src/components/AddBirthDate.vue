<script setup>
import { inject, ref } from 'vue';

let day = inject('day');
let month = inject('month');
let year = inject('year');
let submitValid = inject('submitValid');

let errorPlace = ref(null);
let errorMessage = ref(null);

const checkValidDate = (day, month, year) => {
  const errorLine = {
    required: 'This field is required',
    invalidDay: 'Must be a valid day',
    invalidMonth: 'Must be a valid month',
    inFuture: 'Must be in the past',
    invalidDate: 'Must be a valid date',
    invalidType: 'Only accept number'
  }
  //current date 
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  //not valid value error
  if (typeof day !== 'number' || typeof month !== 'number' || typeof year !== 'number') {
    return {
      error: true,
      errorType: 'invalid type',
      placement: typeof day !== 'number' ? 'day' : typeof month !== 'number' ? 'month' : 'year',
      message: errorLine.invalidType
    }
  }

  if (month > 12 || month < 1) {
    return {
      error: true,
      errorType: 'invalid month',
      placement: 'month',
      message: errorLine.invalidMonth
    }
  }

  if (day > 31 || day < 1) {
    return {
      error: true,
      errorType: 'invalid day',
      placement: 'day',
      message: errorLine.invalidDay
    }
  }

  if ([4, 6, 9, 11].find(element => month === element) && day === 31) {
    return {
      error: true,
      errorType: 'invalid date',
      placement: 'day',
      message: errorLine.invalidDate
    }
  }

  if (month === 2 && day > 28 && isLeapYear !== true) {
    return {
      error: true,
      errorType: 'invalid date',
      placement: 'day',
      message: errorLine.invalidDate
    }
  }

  if (month === 2 && day > 29 && isLeapYear === true) {
    return {
      error: true,
      errorType: 'invalid date',
      placement: 'day',
      message: errorLine.invalidDate
    }
  }

  //in future error
  if (currentYear < year) {
    return {
      error: true,
      errorType: 'in future',
      placement: 'year',
      message: errorLine.inFuture
    }
  }

  if (currentYear === year && currentMonth < month) {
    return {
      error: true,
      errorType: 'in future',
      placement: 'month',
      message: errorLine.inFuture
    }
  }

  if (currentYear === year && currentMonth === month && currentDay < day) {
    return {
      error: true,
      errorType: 'in future',
      placement: 'day',
      message: errorLine.inFuture
    }
  }

  return {
    error: false
  }
}

const handleForm = (event) => {
  event.preventDefault()
  const checkValid = checkValidDate(day.value, month.value, year.value);
  if (checkValid.error) {
    errorPlace.value = checkValid.placement;
    errorMessage.value = checkValid.message;
  }
  else {
    errorPlace.value = null;
    errorMessage.value = null;
    submitValid.value = true;
  }
}

</script>


<template>
  <div>
    <form class="" @submit="handleForm">
      <div class="flex gap-2 md:gap-3 justify-start">
        <div class="w-auto max-w-[125px]">
        <label for="day" class=" text-[16px] uppercase font-bold"
          :class="[errorPlace === 'day' ? 'text-light-red' : 'text-smokey-grey']">day</label>
        <input type="number" name="day" id="day" v-model="day"
          class="w-full bg-transparent border rounded p-1.5 text-[18px] font-bold outline-none focus:border-purple caret-purple placeholder:text-light-grey"
          :class="[errorPlace === 'day' ? 'border-light-red' : 'border-light-grey']" placeholder="DD" required>
        <p class="text-[10px] italic text-light-red" :class="[errorPlace === 'day' ? 'block' : 'hidden']">
          {{ errorMessage }}
        </p>
      </div>
      <div class="w-auto max-w-[125px]">
        <label for="month" class=" text-[16px] uppercase font-bold"
          :class="[errorPlace === 'month' ? 'text-light-red' : 'text-smokey-grey']">month</label>
        <input type="number" name="month" id="month" v-model="month"
          class="w-full bg-transparent border rounded p-1.5 text-[18px] font-bold outline-none focus:border-purple caret-purple placeholder:text-light-grey"
          :class="[errorPlace === 'month' ? 'border-light-red' : 'border-light-grey']" placeholder="MM" required>
        <p class="text-[10px] italic text-light-red" :class="[errorPlace === 'month' ? 'block' : 'hidden']">
          {{ errorMessage }}
        </p>
      </div>
      <div class="w-auto max-w-[125px]">
        <label for="year" class=" text-[16px] uppercase font-bold"
          :class="[errorPlace === 'year' ? 'text-light-red' : 'text-smokey-grey']">year</label>
        <input type="number" name="year" id="year" v-model="year"
          class="w-full bg-transparent border rounded p-1.5 text-[18px] font-bold outline-none focus:border-purple caret-purple placeholder:text-light-grey"
          :class="[errorPlace === 'year' ? 'border-light-red' : 'border-light-grey']" placeholder="YYYY" required>
        <p class="text-[10px] italic text-light-red" :class="[errorPlace === 'year' ? 'block' : 'hidden']">
          {{ errorMessage }}
        </p>
      </div>
      </div>

      <div class="relative col-span-3">
        <input type="image" src="assets/images/icon-arrow.svg"
          class=" absolute bg-purple rounded-full p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:shadow-md focus:shadow-smokey-grey outline-none md:left-auto md:right-0 md:translate-x-0"
          alt="Submit" width="60" height="60">
        <hr class="my-5 self-center text-light-grey">
      </div>
    </form>
  </div>
</template>
