import {
    PermissionsAndroid
  } from "react-native";
  
  export const askFILEACCESSPERMISSION = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "READ FILE PERMISSIONS",
          message: "Please ALLOW IMS TO READ FILES ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };