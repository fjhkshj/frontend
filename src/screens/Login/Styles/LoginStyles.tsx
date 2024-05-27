import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 240,
    height: 120,
    resizeMode: "cover",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 5,
    marginBottom: 15,
  },
  vertical: {
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
  image2: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    marginTop: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    width: 340,
  },
  container2: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  indicator: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
