const getDateInNumbers = (mongoDateTimeString) => {
  return mongoDateTimeString.split("T")[0];
};

const getDate = (mongoDateTimeString) => {
  let date = new Date(mongoDateTimeString).toDateString();
  return date;
};

const getTimeGMT = (mongoDateTimeString) => {
  return mongoDateTimeString.split("T")[1].slice(0, 5);
};

const getTime = (mongoDateTimeString) => {
  let time = mongoDateTimeString.split("T")[1].slice(0, 5);
  let [hours, minutes] = time.split(":");

  if (+hours > 12) {
    return `${+hours % 12}:${minutes} PM`;
  } else {
    return `${hours}:${minutes} AM`;
  }
};

export default { getDate, getTime, getTimeGMT, getDateInNumbers };
