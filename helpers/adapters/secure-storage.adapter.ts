import * as SecureStore from "expo-secure-store";

export class SecureStorageAdapter {
  static async save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
  static async get(key: string) {
    return await SecureStore.getItemAsync(key);
  }
  static async delete(key: string) {
    await SecureStore.deleteItemAsync(key);
  }
}
