import React from "react";
import { SafeAreaView, Text, Image } from "react-native";
import { otherIcons } from "../constants/Icons";

const lightIcons = otherIcons.light;
const iiitIcon = lightIcons.iiit_big;

function NoNetwork(): React.JSX.Element {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <Image source={iiitIcon} />
      <Text
        style={{
          marginHorizontal: 70,
          fontSize: 20,
          color: "black",
          marginTop: 100
        }}
      >
        You are not connected to Internet. Please Check your internet connection
        and try again.
      </Text>
    </SafeAreaView>
  );
}

export default NoNetwork;
