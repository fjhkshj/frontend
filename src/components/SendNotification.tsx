import notifee from "@notifee/react-native";

export async function onDisplayNotification(message: string) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel"
    });

    // Display a notification
    await notifee.displayNotification({
      title: message,
      body: "Click for more details",
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default"
        }
      }
    });
  }