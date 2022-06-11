const monthToString: { [key: number]: string } = {
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
 * Converts a timestamp to a string.
 *
 * @param {number} timestamp The timestamp to convert to string.
 * @returns {string} The timestamp in the `Jan-1` format.
 */
export const generateDateString = (timestamp: number) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();

  return `${monthToString[month]}-${day}`;
};
