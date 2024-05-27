import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bankDetailsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bankHeaderBack: {},
  bankHeaderText: {
    alignSelf: "center",
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  bankHeaderEdit: {},
  bankPDFContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  bankPDFNameCard: {
    alignSelf: "flex-start",
    flex: 0.75,
  },
  bankPDFName: {
    color: "#534c4c",
    fontSize: 14,
    fontWeight: "bold",
  },
  bankPDFIcons: {
    flex: 0.2,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  bankPDFPick: {
    height: 35,
    width: 35,
  },
  bankPDFCancel: {
    height: 35,
    width: 35,
  },
  bankDetailsSubmit: {
    marginTop: 20,
  },
  fieldHeaderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  fieldHeaderMandatory: {
    width: 10,
    height: 10,
    resizeMode: "cover",
    marginTop: 7,
    marginLeft: 10,
  },
  noDetailsText: {
    alignSelf: "center",
    color: "red",
    fontSize: 16,
    paddingTop: 20,
    fontWeight: "bold",
  },
});

export default styles;
