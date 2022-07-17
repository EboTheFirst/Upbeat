import client from "./client";

const signup = (user) => {
  return client.post("/register", user);
};
const login = (user) => {
  return client.post("/login", user);
};
const addDevice = (userId, deviceId) => {
  return client.post("/deviceadd", { userId, deviceId });
};
const update = (user) => {
  return client.put("/", user);
};

const sendNotification = ({ title, message, data, targetToken, channelId }) => {
  return client.post("/notification", {
    title,
    message,
    data,
    targetToken,
    channelId,
  });
};

const deregisterPushToken = (userId) => {
  return client.post("/deleteExpoToken", { userId });
};

export {
  signup,
  login,
  addDevice,
  update,
  sendNotification,
  deregisterPushToken,
};
