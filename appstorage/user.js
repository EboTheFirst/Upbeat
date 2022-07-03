import * as SecureStore from "expo-secure-store";

const tokenName = "UPBEAT_USER_TOKEN";

const storeUser = (token) => {
  return SecureStore.setItemAsync(tokenName, token);
};
const getUser = () => {
  return SecureStore.getItemAsync(tokenName);
};
const removeUser = () => {
  return SecureStore.deleteItemAsync(tokenName);
};

export default { storeUser, getUser, removeUser };
