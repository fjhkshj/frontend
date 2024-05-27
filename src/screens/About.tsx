import React from "react";
import {
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import global from "../styles/global";

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

function About(): React.JSX.Element {
  return (
    <SafeAreaView style={global.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.subHeading}>
          IMS Application for IIIT Hyderabad
        </Text>
        <Text style={styles.description}>
          {"     "}
          This project involves the development of a mobile application for
          Android and iOS platforms dedicated to the IMS website of IIIT
          Hyderabad. Students can utilise the application to submit requests for
          leave, view their attendance and transcript.
        </Text>
        <Text style={styles.description}>
          Furthermore, students can access and view their profile details
          including address, bank details and general information. Additionally
          students can add or edit bank details.
        </Text>
      </View>

      <View style={{ flexDirection: "row", padding: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Contribute / Report Issues: </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://github.com/IMS-IIITH/ims-mobile-app");
          }}
        >
          <Text>Github</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default About;
