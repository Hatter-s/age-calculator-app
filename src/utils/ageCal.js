const ageCalculator = (day, month, year) => {
  //get the current date from the system
  const now = new Date();
  //extract the year, month, and date from current date
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  //get years
  let yearAge = currentYear - year;
  let monthAge;
  let dayAge;
  

  //get months
  if (currentMonth >= month) {
    //get months when current month is greater
    monthAge = currentMonth - month;
  } else {
    yearAge--;
    monthAge = 12 + currentMonth - month;
  }

  //get days
  if (currentDay >= day) {
    //get days when the current date is greater
    dayAge = currentDay - day
  } else {
    monthAge--;
    dayAge = 31 + currentDay - day;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
  return {
    years: yearAge,
    months: monthAge,
    days: dayAge
  }
}

export default ageCalculator;