import client from "./client";

const signup = (user) => {
  return client.post("/register", user);
};
const login = (user) => {
  return client.post("/login", user);
};
const registerPushToken = (userId, expoPushToken) => {
  return client.post("/registertoken", { userId, expoPushToken });
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
  registerPushToken,
  sendNotification,
  deregisterPushToken,
};
