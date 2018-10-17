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

/* Fetch data from AsyncStorage by key*/
export const fetchData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Got data
      console.log("fetched data:", value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log("error retrieving data to asyncstorage:", error);
  }
};
