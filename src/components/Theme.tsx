import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { dashboardIcons, otherIcons } from "../constants/Icons";

function currentTheme(): any {
  // light theme
  let theme = {
    navTheme: DefaultTheme,
    colors: {
      background: "white",
      text: "black",
      placeholder: "grey",
    },
    icons: {
      dashboard: dashboardIcons.light,
      other: otherIcons.light,
    },
  };

  let currentTheme = useColorScheme();
  if (currentTheme === "dark") {
    theme.navTheme = DarkTheme;

    theme.colors.background = "grey";
    theme.colors.text = "white";
    theme.colors.placeholder = "light-grey";

    theme.icons.dashboard = dashboardIcons.dark;
    theme.icons.other = otherIcons.dark;
  }

  return JSON.parse(JSON.stringify(theme));
}

export default currentTheme;
