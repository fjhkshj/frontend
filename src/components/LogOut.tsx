import React from "react";
import { Button } from "@rneui/base";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CookieManager from "@react-native-cookies/cookies";

function LogOut() {
  const navigation = useNavigation();

  // Clear Cookies on Logout
  const clearCookies = () => {
    CookieManager.clearAll()
      .then((success) => {
        console.log('CookieManager.clearAll =>', success);
      })
      .catch((error) => {
        console.error('Error clearing cookies:', error);
      });
  };

  const handleLogout = () => {
    clearCookies();
    navigation.navigate("WelcomeScreen");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "black", margin: 10, fontSize: 20, marginBottom: 20 }}>
        Are you sure you want to Log Out?
      </Text>
      <Button
        onPress={handleLogout}
        title="Yes"
        containerStyle={{ width: 250, height: 50 }}
        buttonStyle={{ backgroundColor: "#2D0C8B" }}
      />
      <View style={{ marginTop: 10 }}>
        <Button
          onPress={() => navigation.goBack()}
          title="No"
          containerStyle={{ width: 250, height: 50 }}
          buttonStyle={{ backgroundColor: "#2D0C8B" }}
        />
      </View>
    </View>
  );
}

export default LogOut;
