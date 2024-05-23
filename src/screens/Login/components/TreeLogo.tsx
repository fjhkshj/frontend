import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text } from "react-native";
import styles from "../Styles/LoginStyles";
import { otherIcons } from "../../../constants/Icons";

const lightIcons = otherIcons.light;
const iiitIcon = lightIcons.iiit_big;

function TreeLogo() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={iiitIcon} style={styles.image} />
      </View>
      <View style={styles.text}>
        <Text style={{ fontSize: 20, color: "#161C51", fontWeight: "bold" }}>
          Login with your LDAP Credentials
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default TreeLogo;
