import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import "react-native-gesture-handler";
import CustomHeader from "./Header";
import BottomTab from "./BottomTab";

import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { threeLinesIcon, entries, Entry } from "../constants/SidebarContent";

const Drawer = createDrawerNavigator();

function SidebarDisplay(): React.JSX.Element {
  const WhiteLine = () => {
    return (
      <View
        style={{ height: 0.5, backgroundColor: "white", marginVertical: 10 }}
      />
    );
  };

  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const PreHeader = () => {
      return (
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={threeLinesIcon}
            style={{ width: 30, height: 30, margin: 20, marginTop: 16 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    };

    const renderEntry = (entry: Entry) => {
      const { name, icon, target } = entry;
      return (
        <DrawerItem
          label={name}
          onPress={() => {
            props.navigation.navigate(target);
          }}
          inactiveTintColor="#ffffff"
          icon={() => (
            <Image
              source={icon}
              resizeMode="contain"
              style={{ marginLeft: 20, width: 20, height: 20 }}
            />
          )}
          labelStyle={{ fontSize: 16 }}
        />
      );
    };

    return (
      <DrawerContentScrollView>
        <PreHeader />
        {renderEntry(entries.dashboard)}
        {renderEntry(entries.notification)}
        <WhiteLine />
        {renderEntry(entries.attendance)}
        {renderEntry(entries.transcript)}
        <WhiteLine />
        {renderEntry(entries.about)}
        {renderEntry(entries.logout)}
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        header: () => <CustomHeader />,
        drawerStyle: {
          backgroundColor: "#231542",
          width: 240,
        },
        headerTitleStyle: {
          fontFamily: "Quicksand-Light",
        },
      }}
    >
      {/* just have this to make it work */}
      <Drawer.Screen name="BottomTab" component={BottomTab} />
    </Drawer.Navigator>
  );
}

export default SidebarDisplay;
