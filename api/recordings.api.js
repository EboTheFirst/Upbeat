import client from "./client";
import FormData from "form-data";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const uploadRecording = (uri, label, patient) => {
  var form = new FormData();
  form.append("label", label);
  form.append("patient", patient);
  form.append("audio", {
    name: makeid(10),
    type: "audio/wav",
    uri: uri,
  });
  return client.post("/recordings/uploadaudio/", form);
};

const getRecs = (deviceArray) => {
  return client.post("/recordings/get/", { deviceArray });
};

const update = (recording) => {
  return client.put("/recordings/", recording);
};
const getByPatient = (patientId) => {
  return client.get(`/recordings/patient/${patientId}`);
};

export { getRecs, update, getByPatient, uploadRecording };
