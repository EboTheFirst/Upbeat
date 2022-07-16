import client from "./client";

const add = (device) => {
  return client.post("/devices/useradd", device);
};

const get = (userId) => {
  return client.get(`/devices/${userId}`);
};

export { add, get };
