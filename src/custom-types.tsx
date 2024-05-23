import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// extend to other types if necessary
// and then set the userType variable in Login.tsx according to the API fields.
enum UserTypes {
  Default, // if user is not of a known type: should not happen
  Student,
  Faculty,
  Staff,
}

// source: https://reactnavigation.org/docs/typescript/
// modify as and when nav stack gets more screens
type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  BottomTab: undefined;
  DashboardScreen: undefined;
  ProfileDetails: undefined;
  BankDetails: undefined;
  EditBankDetails: undefined;
  Profile: undefined;
  LeaveApplicationScreen: undefined;
  Attendance: undefined;
  About: undefined;
  Notifications: undefined;
  NoInternet: undefined;
  MyLeaves: undefined;
  MyTranscript: undefined;
  MyAttendance: undefined;
  CourseAttendance: undefined;
};

// add more props types if and when needed
// add 'id' prop here if more than one nav stack is used
// type BottomTabProps = NativeStackScreenProps<RootStackParamList, "BottomTab">;
type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WelcomeScreen"
>;
type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "LoginScreen"
>;
type ProfileDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileDetails"
>;
type BankDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "BankDetails"
>;
type EditBankDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "EditBankDetails"
>;
type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DashboardScreen"
>;
type LeaveApplicationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "LeaveApplicationScreen"
>;
type NoNetworkProps = NativeStackScreenProps<RootStackParamList, "NoInternet">;
type MyLeavesProps = NativeStackScreenProps<RootStackParamList, "MyLeaves">;
type MyTranscriptProps = NativeStackScreenProps<
  RootStackParamList,
  "MyTranscript"
>;
type MyAttendanceProps = NativeStackScreenProps<
  RootStackParamList,
  "MyAttendance"
>;
type CourseAttendanceProps = NativeStackScreenProps<
  RootStackParamList,
  "MyAttendance"
>;

export type {
  // BottomTabProps,
  RootStackParamList,
  WelcomeScreenProps,
  LoginScreenProps,
  BankDetailsProps,
  EditBankDetailsProps,
  ProfileDetailsProps,
  DashboardScreenProps,
  LeaveApplicationScreenProps,
  NoNetworkProps,
  MyLeavesProps,
  MyTranscriptProps,
  MyAttendanceProps,
  CourseAttendanceProps
};

export { UserTypes };
