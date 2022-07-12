import client from "./client";

const create = (patient) => {
  return client.post("/patients/", patient);
};

const get = () => {
  return client.get("/patients/");
};

const update = (patient) => {
  return client.put("/patients/", patient);
};

export { create, get, update };
