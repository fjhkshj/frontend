import { dashboardIcons, otherIcons, IconSet } from "./Icons";
import { ImageSourcePropType } from "react-native";

export interface Entry {
  name: string;
  icon: ImageSourcePropType;
  target: string;
}

interface Entries {
  [key: string]: Entry;
}

// sidebar components

const dDarkIcons: IconSet = dashboardIcons.dark;
const oDarkIcons: IconSet = otherIcons.dark;
export const threeLinesIcon = oDarkIcons.three_lines;

const homeIcon = dDarkIcons.home;
const bellIcon = dDarkIcons.notification;
const attendanceIcon = dDarkIcons.attendance;
const transcriptIcon = dDarkIcons.transcript;
const aboutIcon = dDarkIcons.about;
const logoutIcon = oDarkIcons.logout;

export const entries: Entries = {
  dashboard: { name: "Dashboard", icon: homeIcon, target: "BottomTab" },
  notification: {
    name: "Notifications",
    icon: bellIcon,
    target: "Notifications"
  },
  attendance: {
    name: "Attendance",
    icon: attendanceIcon,
    target: "MyAttendance"
  },
  transcript: {
    name: "Transcript",
    icon: transcriptIcon,
    target: "MyTranscript"
  },
  about: { name: "About", icon: aboutIcon, target: "About" },
  logout: { name: "LogOut", icon: logoutIcon, target: "Logout" }
};
