import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View, Image, Text, Linking } from "react-native";
import styles from "../Styles/LoginStyles";
import { otherIcons } from "../../../constants/Icons";

const lightIcons = otherIcons.light;
const resetIcon = lightIcons.reset;
const forgotIcon = lightIcons.forgot;

const Forgot_Password = "https://passwordreset.iiit.ac.in/forgotpassword/";
const Reset_Password = "https://passwordreset.iiit.ac.in/";

function UpdatePassword() {
  const handleForgotPasswordPress = () => {
    Linking.openURL(Forgot_Password).catch(() => {
      console.warn(`Failed to open URL: ${Forgot_Password}`);
      // You can show an alert or perform additional error handling here
    });
  };

  const handleResetPasswordPress = () => {
    Linking.openURL(Reset_Password).catch(() => {
      console.warn(`Failed to open URL: ${Reset_Password}`);
      // You can show an alert or perform additional error handling here
    });
  };

  return (
    <SafeAreaView>
      <View style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}>
        <Image source={forgotIcon} style={styles.image2} />
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
              marginBottom: 15,
              color: "#000000",
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}>
        <Image source={resetIcon} style={styles.image2} />
        <TouchableOpacity onPress={handleResetPasswordPress}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 5,
              marginBottom: 30,
              color: "#000000",
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default UpdatePassword;
