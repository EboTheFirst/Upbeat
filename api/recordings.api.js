import client from "./client";

const getRecs = (deviceArray) => {
  return client.post("/recordings/get/", { deviceArray });
};

const update = (recording) => {
  return client.put("/recordings/", recording);
};
const getByPatient = (patientId) => {
  return client.get(`/recordings/patient/${patientId}`);
};

export { getRecs, update, getByPatient };
