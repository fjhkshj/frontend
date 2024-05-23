import { dashboardIcons, IconSet } from "./Icons";
import { UserTypes } from "../custom-types";
import { ImageSourcePropType } from "react-native";

const lightIcons: IconSet = dashboardIcons.light;

// get icons
const profileIcon = lightIcons.profile;
const generalIcon = lightIcons.general;
const bankIcon = lightIcons.bank;

const featureIcon = lightIcons.features;
const leaveIcon = lightIcons.leaves;
const statusIcon = lightIcons.status;
const attendanceIcon = lightIcons.attendance;
const transcriptIcon = lightIcons.transcript;

export interface ItemList {
  [name: string]: {
    icon: ImageSourcePropType;
    target: string;
    access: UserTypes[];
  };
}

export const entries = {
  "My Profile": {
    icon: profileIcon,
    itemList: {
      Profile: {
        icon: generalIcon,
        target: "ProfileDetails",
        access: [UserTypes.Student, UserTypes.Faculty, UserTypes.Staff]
      },
      "Bank Details": {
        icon: bankIcon,
        target: "BankDetails",
        access: [UserTypes.Student, UserTypes.Faculty, UserTypes.Staff]
      }
    }
  },
  Features: {
    icon: featureIcon,
    itemList: {
      "Request Leave": {
        icon: leaveIcon,
        target: "LeaveApplicationScreen",
        access: [UserTypes.Student]
      },
      "Leave Status": {
        icon: statusIcon,
        target: "MyLeaves",
        access: [UserTypes.Student]
      },
      Attendance: {
        icon: attendanceIcon,
        target: "MyAttendance",
        access: [UserTypes.Student]
      },
      Transcript: {
        icon: transcriptIcon,
        target: "MyTranscript",
        access: [UserTypes.Student]
      }
    }
  }
};
