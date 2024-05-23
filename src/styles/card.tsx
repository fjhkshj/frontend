import { StyleSheet } from "react-native";

// temporary style
const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "white"
  },
  container: {
    // flex: 1,
    marginTop: 5
  },
  fonts: {
    marginBottom: 8
  },
  card: {
    // flexDirection: "row",
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 10,
    borderRadius: 10,
    padding: 0
    // // height: 20,
    // borderColor: "#534c4c",
    // borderRadius: 6,
    // borderWidth: 1,
    // paddingVertical: 16,
    // paddingHorizontal: 15,
    // marginBottom: 19,
    // marginHorizontal: 8
  },
  notEditableCard: {
    // flexDirection: "row",
    paddingLeft: 10,
    marginTop: 7,
    marginBottom: 10,
    borderRadius: 10,
    padding: 0,
    backgroundColor: "#F5F5F5"
  },
  cardTextInput: {
    // fontSize: 16,
    // // pading: 0,
    // // height: 25,
    // // lineHeight: 1,
    // textAlignVertical: 'center',
    // color: "#000000"
    color: "#534c4c",
    fontSize: 14,
    fontWeight: "bold"
  },
  sectionHeader: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 11,
    paddingLeft: 5
    // fontSize: 18,
    // fontWeight: 'bold',
    // color: '#000000',
  }
});

export default styles;
