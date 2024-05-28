import React, { useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import { Button } from "@rneui/base";
import * as types from "../../custom-types";

import TreeLogo from "./components/TreeLogo";
import Credentials from "./components/Credentials";
import UpdatePassword from "./components/UpdatePassword";

import styles from "./Styles/LoginStyles";
import Connectionstatus from "../../components/Connectionstatus";
import { authenticate_user } from "../../backend_requests/AuthUser";
import { get_user_details } from "../../backend_requests/UserDetails";
import { askFILEACCESSPERMISSION } from "../../device_permissions/FilePermission";

function Login({
  _route,
  navigation,
}: types.LoginScreenProps): React.JSX.Element {
  const [Email, onChangeEmail] = React.useState("");
  const [_Password, onChangePassword] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");

  const handleLoginPress = async () => {
    try {
      setErrorText("");
      setIsLoading(true);
      console.log("Checking Authentication...");
      const auth_status = await authenticate_user(
        Email,
        _Password,
        setErrorText,
        setIsLoading,
      );
      if (auth_status === true) {
        // After Successful Authentication, Get User Details
        setIsLoading(true);
        try {
          setErrorText("Authentication Success, Getting User Details..");
          console.log("Getting User Details...");
          const user_details_status = await get_user_details();
          if (user_details_status == true) {
            setErrorText(
              "User Details Fetched Success. Redirecting to Dashboard",
            );
            console.log("Recieved User Details Successfully...");
            navigation.navigate("SidebarDisplay");
          } else {
            setErrorText(
              "Authentication, Cookie assign succcess,  Error In Getting User Details..., Please Login again",
            );
          }
        } catch (err) {
          setErrorText(
            "Auth, Cookie assign succes, Error in getting User Details, Please Login in again.",
          );
          console.log("ERROR In Getting User Details");
        }
      } else {
        console.log("Invalid Username or password");
      }
    } catch (err) {
      console.log("ERROR IN AUTHENTICATION");
    }
  };

  useEffect(() => {
    // askNotificationPermission(); // Call the function when the component mounts
    askFILEACCESSPERMISSION();
  }, []);

  return (
    <SafeAreaView style={styles.container2}>
      <SafeAreaView style={{ marginTop: 140 }}>
        <TreeLogo />
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 20 }}>{errorText}</Text>
        </View>
        <Credentials
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
        />
        <UpdatePassword />
        <View style={{ alignItems: "center" }}>
          <Button
            containerStyle={{ width: 250, height: 50 }}
            onPress={handleLoginPress}
            disabled={isloading}
            color="#2D0C8B"
          >
            {isloading ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ color: "white" }}>Logging In...</Text>
              </View>
            ) : (
              <Text style={{ color: "white" }}>Login</Text>
            )}
          </Button>
        </View>
      </SafeAreaView>
      <Connectionstatus />
    </SafeAreaView>
  );
}

export default Login;
