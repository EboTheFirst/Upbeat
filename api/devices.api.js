import client from "./client";

const add = (device) => {
  return client.post("/devices/add", device);
};

const get = () => {
  return client.get("/devices/");
};

const update = (device) => {
  return client.put("/devices/", device);
};

export { add, get, update };
