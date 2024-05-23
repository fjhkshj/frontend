import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "white"
  },
  container: {
    marginTop: 5
  },
  fonts: {
    marginBottom: 8
  },
  text: {
    paddingLeft: 15,
    marginTop: 7,
    marginBottom: 15,
    borderRadius: 10,
    padding: 0,
    color: "#534c4c",
    fontSize: 14,
    fontWeight: "bold"
  },
  sectionHeader: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15
  },
  fieldHeader: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 11,
    paddingLeft: 5
  },
  coupleContainer: {
    display: "flex",
    flexDirection: "row"
  },
  coupleTitleContainer: {},
  coupleCardContainer: {},
  horizontalLine: {
    marginTop: 20,
    marginBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
});

export default styles;
