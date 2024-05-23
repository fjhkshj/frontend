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
            color: "#000000",
            marginLeft: 15,
            marginBottom: -9,
            fontWeight: "bold"
          }}
        >
          Email:
        </Text>
      </View>
      <TextInput
        style={global.input}
        placeholder="Enter your Email"
        onChangeText={onChangeEmail}
        inputMode="text"
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            color: "#000000",
            marginLeft: 15,
            marginBottom: -9,
            fontWeight: "bold"
          }}
        >
          Password:
        </Text>
      </View>
      <TextInput
        style={global.input}
        placeholder="Enter your password"
        onChangeText={onChangePassword}
        secureTextEntry={true}
        inputMode="text"
      />
    </SafeAreaView>
  );
}

export default Credentials;
