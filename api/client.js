import apisauce from "apisauce";
import user from "../appstorage/user";

const client = apisauce.create({ baseURL: "http://192.168.43.146:4000" });

client.addAsyncRequestTransform(async (request) => {
  const token = await user.getUser();
  if (token) {
    request.headers["x-auth-token"] = token;
  }
});

export default client;