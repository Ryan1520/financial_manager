export const GetDate = () => {
  // https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return {day, month, year}
}