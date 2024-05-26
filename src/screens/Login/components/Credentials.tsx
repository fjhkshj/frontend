import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput } from "react-native";
import global from "../../../styles/global";

function Credentials({ onChangeEmail, onChangePassword }) {
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "#000000", // TODO: replace with theme wise color
            marginLeft: 15,
            marginBottom: -9,
            fontWeight: "bold"
          }}
        >
          Email
        </Text>
      </View>
      <TextInput
        style={{...global.input, color: "#000000"}} // TODO: replace with theme wise color
        placeholder="Enter your Email"
        placeholderTextColor={"grey"} // TODO: replace with theme wise color
        onChangeText={onChangeEmail}
        inputMode="text"
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "#000000", // TODO: replace with theme wise color
            marginLeft: 15,
            marginBottom: -9,
            fontWeight: "bold"
          }}
        >
          Password
        </Text>
      </View>
      <TextInput
        style={{...global.input, color: "#000000"}} // TODO: replace with theme wise color
        placeholder="Enter your password"
        placeholderTextColor={"grey"} // TODO: replace with theme wise color
        onChangeText={onChangePassword}
        secureTextEntry={true}
        inputMode="text"
      />
    </SafeAreaView>
  );
}

export default Credentials;
