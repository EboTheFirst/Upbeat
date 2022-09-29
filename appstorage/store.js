import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function load(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  }
}

export { save, load };
