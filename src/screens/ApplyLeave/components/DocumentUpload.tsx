import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";
import RNFS from "react-native-fs";

import { otherIcons, IconSet } from "../../../constants/Icons";

const lightIcons: IconSet = otherIcons.light;
const redDotIcon = lightIcons.red_dot;
const fileInputIcon = lightIcons.file_input;
const crossIcon = lightIcons.cross;

function DocumentAdd({
  pickfile1,
  pickfile2,
  file1_base64,
  file2_base64,
}): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [firstFILEUri, setFIRSTFILEURI] = useState("");
  const [secondFILEUri, setSecondFILEURI] = useState("");

  useEffect(() => {
    const readFileAsync = async () => {
      try {
        const base64_content = await RNFS.readFile(firstFILEUri, "base64");
        file1_base64(base64_content);
        // console.log("File Contents of the FILE: ", base64_content);
        // console.log("FIRST SELECTED FILE DATA SUCCESSFULY READ.");
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    if (firstFILEUri !== "") {
      readFileAsync();
    }
  }, [firstFILEUri]);

  useEffect(() => {
    const readFileAsync = async () => {
      try {
        const base64_content = await RNFS.readFile(secondFILEUri, "base64");
        // console.log("File Contents of the FILE: ", base64_content);
        file2_base64(base64_content);
        // console.log("SECOND SELECTED FILE DATA SUCCESSFULY READ.");
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    if (secondFILEUri !== "") {
      readFileAsync();
    }
  }, [secondFILEUri]);

  const selectDoc = async (fileNumber: Int32) => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.docx,
          DocumentPicker.types.doc,
          DocumentPicker.types.xls,
        ],
      });
      // console.log(doc);
      if (fileNumber === 1) {
        setSelectedFile(doc[0].name); // Set the selected file name to the state
        pickfile1(doc[0].name);
        setFIRSTFILEURI(doc[0].uri);
      } else {
        setSelectedFile2(doc[0].name); // Set the selected file name to the state
        pickfile2(doc[0].name);
        setSecondFILEURI(doc[0].uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log("User cancelled the upload", err);
      } else {
        // console.log(err);
        Alert.alert("Error", "Failed to pick document.");
      }
    }
    // // console.log()
  };
  const cleardoc = (fileNumber: Int32) => {
    if (fileNumber === 1) {
      setSelectedFile(null);
      pickfile1(null);
    } else {
      setSelectedFile2(null);
      pickfile2(null);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>
            Upload Relevant Documents
          </Text>
          <Image source={redDotIcon} style={LeaveApplicationCss.image} />
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={[
              LeaveApplicationCss.input2,
              { width: "70%" },
              { marginLeft: "5%" },
              { alignSelf: "flex-start" },
            ]}
          >
            <Text>{selectedFile ? selectedFile : "File Name"}</Text>
          </View>
          <TouchableOpacity onPress={() => selectDoc(1)}>
            <Image
              source={fileInputIcon}
              style={{ height: 30, width: 30, marginTop: 13, marginLeft: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cleardoc(1)}>
            <Image
              source={crossIcon}
              style={{ height: 30, width: 30, marginTop: 13, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>
            Upload additional Documents(if any)
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={[
              LeaveApplicationCss.input2,
              { width: "70%" },
              { marginLeft: "5%" },
              { alignSelf: "flex-start" },
            ]}
          >
            <Text>{selectedFile2 ? selectedFile2 : "File Name"}</Text>
          </View>
          <TouchableOpacity onPress={() => selectDoc(2)}>
            <Image
              source={fileInputIcon}
              style={{ height: 30, width: 30, marginTop: 13, marginLeft: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cleardoc(2)}>
            <Image
              source={crossIcon}
              style={{ height: 30, width: 30, marginTop: 13, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default DocumentAdd;
