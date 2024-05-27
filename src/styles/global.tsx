import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  input: {
    height: 40,
    // margin: 12,
    width: "95%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 6,
  },
  vertical: {
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#FAFAFA",
  },
  vertical_2: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },

  dashboard_parent_section: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },

  dashboard_children_section: {
    width: 40,
    height: 40,
    marginLeft: 0,
  },
});

export default styles;
