import React from "react";
import { SafeAreaView, Image, ImageSourcePropType } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard/Dashboard";
import About from "../screens/About";
import Notification from "../screens/Notifications/Notifications";

import { dashboardIcons, IconSet } from "../constants/Icons";

const Tab = createBottomTabNavigator();

const lightIcons: IconSet = dashboardIcons.light;

const homeIcon = lightIcons.home;
const notificationIcon = lightIcons.notification;
const aboutIcon = lightIcons.about;

function BottomTab(): React.JSX.Element {
  const TabBarIcon = (image: ImageSourcePropType) => {
    return (
      <SafeAreaView>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: 25,
          }}
        />
      </SafeAreaView>
    );
  };

  const getTabScreen = (
    tabName: string,
    image: ImageSourcePropType,
    componentName: string,
  ) => {
    return (
      <Tab.Screen
        name={tabName}
        component={componentName}
        options={{
          tabBarIcon: () => TabBarIcon(image),
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2D0C8B", // Change the active text color here
        tabBarInactiveTintColor: "#999999", // Change the inactive text color here
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 14,
        },
      }}
    >
      {getTabScreen("Home", homeIcon, Dashboard)}
      {getTabScreen("Notification", notificationIcon, Notification)}
      {getTabScreen("About", aboutIcon, About)}
    </Tab.Navigator>
  );
}

export default BottomTab;
