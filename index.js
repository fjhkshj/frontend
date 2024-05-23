/**
 * @format
 */

import { AppRegistry } from "react-native";

import notifee, { EventType } from "@notifee/react-native";
import App from "./App";
import { name as appName } from "./app.json";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  // console.log(type, notification, pressAction);

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
