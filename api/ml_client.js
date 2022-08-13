import apisauce from "apisauce";
import user from "../appstorage/user";

const ml_client = apisauce.create({
  baseURL: "https://murmur-detection-app.herokuapp.com",
});

export default ml_client;
