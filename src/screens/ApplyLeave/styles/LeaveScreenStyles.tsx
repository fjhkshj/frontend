import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 13,
    width: "90%", // Set width to 80% of the container width
    alignSelf: "center", // Center the input horizontally
    borderRadius: 6
  },
  text: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#000000",
    marginLeft: 20,
    marginTop: 15
  },
  input2: {
    height: 45,
    marginVertical: 10,
    borderWidth: 1,
    padding: 12,
    width: "90%", // Set width to 80% of the container width
    alignSelf: "center", // Center the input horizontally
    borderRadius: 6,
    backgroundColor: "#D9D9D9"
  },
  input3: {
    height: 100,
    marginVertical: 10,
    borderWidth: 1,
    padding: 13,
    width: "90%",
    alignSelf: "center",
    textAlignVertical: "top",
    flexWrap: "wrap",
    borderRadius: 6
  },
  image: {
    width: 10,
    height: 10,
    resizeMode: "cover",
    marginTop: 24,
    marginLeft: 3
  },
  image2: {
    width: 17,
    height: 17,
    // resizeMode: 'cover',
    marginTop: 20,
    marginLeft: 5
  },
  image3: {
    width: 20,
    height: 20,
    // resizeMode: 'cover',
    marginTop: 20,
    marginLeft: -10
    // marginLeft: 5,
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30
  }
});

export default styles;
