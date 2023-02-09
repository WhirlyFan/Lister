export default function formatDateTime(timestamp) {
  let dateObj = new Date(timestamp);
  // Grab month, day, and year of dateObj then convert into string, do the same for time
  let date = dateObj.toLocaleString("default", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  let time = dateObj.toLocaleString("default", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    timeZone: "UTC",
  });
  //  Check if the message's date matches today and replace date with Today
  let todayObj = new Date();
  let todayDate = todayObj.toLocaleString("default", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  if (todayDate === date) {
    date = "Today at";
  }

  let formattedDate = `${date} ${time}`;
  return formattedDate;
}
