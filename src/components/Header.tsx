import "react-native-gesture-handler";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { otherIcons, IconSet } from "../constants/Icons";

const darkIcons: IconSet = otherIcons.dark;
const SidebarButton = darkIcons.three_lines;
const IIITLogo = darkIcons.iiit_big;

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#231542",
        padding: 10
      }}
    >
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          source={SidebarButton}
          style={{ width: 30, height: 30, marginLeft: 10 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          color: "#ffffff",
          fontWeight: "bold",
          marginLeft: 80
        }}
      >
        IMS - IIIT Hyderabad
      </Text>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Image
          source={IIITLogo}
          style={{ width: 80, height: 50, marginLeft: 10 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default CustomHeader;
