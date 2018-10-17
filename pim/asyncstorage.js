import { AsyncStorage } from "react-native";

/* Save data to AsyncStorage */
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("saved data:", key, value);
  } catch (error) {
    // Error saving data
    console.log("error saving data to asyncstorage:", error);
  }
};
