const monthToString = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

/**
 * Gets the current date and returns it in the `Jan-1` format
 * for the database query.
 *
 * @param {string} dateString A date string in the `YYYY-MM-DD` format to convert.
 * @returns {string} The current date in the `Jan-1` format.
 */
export const generateDateQuery = (dateString?: string) => {
  const date = new Date(dateString || Date.now());
  const month = date.getMonth();
  const day = date.getDate();

  return `${monthToString[month]}-${day}`;
};
