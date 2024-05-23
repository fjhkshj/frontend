import { ImageSourcePropType } from "react-native";

export interface IconSet {
  [key: string]: ImageSourcePropType;
}

export const dashboardIcons = {
  light: {
    home: require("../assets/icons/home.png"),
    notification: require("../assets/icons/notification.png"),
    about: require("../assets/icons/about.png"),

    general: require("../assets/icons/general.png"),
    bank: require("../assets/icons/bank.png"),
    leaves: require("../assets/icons/leaves.png"),
    status: require("../assets/icons/status.png"),
    attendance: require("../assets/icons/attendance.png"),
    transcript: require("../assets/icons/transcript.png"),

    profile: require("../assets/icons/profile.png"),
    features: require("../assets/icons/features.png"),
    courses: require("../assets/icons/courses.png")
  },
  dark: {
    home: require("../assets/icons/home_dark.png"),
    notification: require("../assets/icons/notification_dark.png"),
    about: require("../assets/icons/about_dark.png"),

    general: require("../assets/icons/general_dark.png"),
    bank: require("../assets/icons/bank_dark.png"),
    leaves: require("../assets/icons/leaves_dark.png"),

    profile: require("../assets/icons/profile_dark.png"),
    features: require("../assets/icons/features_dark.png"),
    courses: require("../assets/icons/courses_dark.png"),
    status: require("../assets/icons/status_dark.png"),
    attendance: require("../assets/icons/attendance_dark.png"),
    transcript: require("../assets/icons/transcript_dark.png")
  }
};

export const sidebarIcons = dashboardIcons.light;

export const otherIcons = {
  light: {
    calendar: require("../assets/icons/calendar.png"),
    iiit_big: require("../assets/icons/iiit.png"),
    back: require("../assets/icons/back.png"),
    cross: require("../assets/icons/cross.png"),
    edit: require("../assets/icons/edit.png"),
    file_input: require("../assets/icons/file-input.png"),

    handwave: require("../assets/icons/handwave.png"),
    red_dot: require("../assets/icons/red_dot.png"),

    forgot: require("../assets/icons/forgot.png"),
    reset: require("../assets/icons/reset.png")
  },
  dark: {
    calendar: require("../assets/icons/calendar_dark.png"),
    iiit_big: require("../assets/icons/iiit_dark.png"),
    back: require("../assets/icons/back_dark.png"),
    cross: require("../assets/icons/cross_dark.png"),
    edit: require("../assets/icons/edit_dark.png"),
    file_input: require("../assets/icons/file-input_dark.png"),

    forgot: require("../assets/icons/forgot_dark.png"),
    reset: require("../assets/icons/reset_dark.png"),

    three_lines: require("../assets/icons/3_lines.png"),
    logout: require("../assets/icons/logout_dark.png")
  }
};
