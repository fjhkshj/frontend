import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { userName } from "../../../backend_requests/UserDetails";

import { otherIcons } from "../../../constants/Icons";

const lightIcons = otherIcons.light;
const handwareIcon = lightIcons.handwave;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 40,
    marginTop: -20
  },
  image: {
    width: 150,
    height: 65,
    resizeMode: "contain"
  },

  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});

function logo(): React.JSX.Element {
  const wordsArray = userName.split(" ");
  const firstName = wordsArray[0];
  return (
    <SafeAreaView style={styles.vertical}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#000000" }}>
          Hi {firstName}
        </Text>
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Image source={handwareIcon} style={{ width: 35, height: 35 }} />
      </View>
    </SafeAreaView>
  );
}

export default logo;
