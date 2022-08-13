import ml_client from "./ml_client";
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

const getPrediction = (uri) => {
  var form = new FormData();
  form.append("audio", {
    name: makeid(10),
    type: "audio/wav",
    uri: uri,
  });
  return ml_client.post("/ml/", form);
};

export default getPrediction;
