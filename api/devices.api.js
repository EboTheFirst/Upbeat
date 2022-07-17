import client from "./client";

const add = (device) => {
  return client.post("/devices/useradd", device);
};

const get = (userId) => {
  return client.get(`/devices/${userId}`);
};

const update = (device) => {
  return client.put(`/devices`, device);
};

export { add, get, update };
