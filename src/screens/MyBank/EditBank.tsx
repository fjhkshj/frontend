import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Button } from "@rneui/base";
import { SelectList } from "react-native-dropdown-select-list";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import notifee from "@notifee/react-native";

import { rollno, userMail } from "../../backend_requests/UserDetails";

import global from "../../styles/global";
import card from "../../styles/card";
import bank from "../../styles/bank";
import { otherIcons, IconSet } from "../../constants/Icons";
import { getAccessToken } from "../../backend_requests/AccessToken";
import { update_bank_details } from "../../constants/APIHandler";

// IMS has limit of 50 apparently
const MAX_FIELD_LENGTH = 50;
const MAX_ACCOUNT_NUMBER_LENGTH = 20;

// use icons
const lightIcons: IconSet = otherIcons.light;
const redDotIcon = lightIcons.red_dot;
const crossIcon = lightIcons.cross;
const fileInputIcon = lightIcons.file_input;

// fill up using user input
const bankDetailsJSON = {
  rollNumber: null,
  selectBank: null,
  accountHolderName: null,
  accountNumber: null,
  bankName: null,
  branchName: null,
  ifscCode: null,
  bankAddress: null,
  remarks: null,
  base64Data: null,
};

const fieldNames: { [key: string]: string } = {
  rollNumber: "Roll Number",
  selectBank: "Select Bank",
  accountHolderName: "Account Holder Name as per Bank",
  accountNumber: "Account Number",
  bankName: "Bank Name",
  branchName: "Branch Name",
  ifscCode: "IFSC Code",
  bankAddress: "Bank Address",
  remarks: "Remarks",
  passbookOrCanceledCheque: "Passbook / Canceled Cheque Leaf",
  base64Data: "Passbook / Canceled Cheque Leaf",
};

const mandatoryFields = [
  "selectBank",
  "accountHolderName",
  "accountNumber",
  "passbookOrCanceledCheque",
];

let fieldsToNotShow: Array<string> = [];

function EditBankDetails(): React.JSX.Element {
  const detailsJSON = bankDetailsJSON;
  const detailsObj = JSON.parse(JSON.stringify(detailsJSON));

  detailsObj.rollNumber = rollno;

  const [pdfName, setPDFName] = React.useState("");
  const [pdfSize, setPDFSize] = React.useState(0);
  const [pdfURI, setPDFURI] = React.useState("");
  const [fileContent, setFileContent] = React.useState("");

  const selectBankOptions = ["Select", "SBI", "Other"];

  const [details, setDetails] = React.useState(detailsObj);

  const fields = Object.keys(detailsObj);

  useEffect(() => {
    const readFile = async () => {
      try {
        const base64_content = await RNFS.readFile(pdfURI, "base64");
        setFileContent(base64_content);
      } catch (error) {
        console.error("Error reading file:", error);
        Alert.alert("An error ocurred while loading the file.");
      }
    };

    if (pdfURI !== "") {
      // set pdf doc in json format
      readFile();
      setDetails(() => {
        const newDetails = { ...details };
        newDetails.base64Data = fileContent;
        return newDetails;
      });
    }
  }, [pdfName, pdfSize, pdfURI]);

  async function onDisplayNotification(message: string) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      title: message,
      body: "Click for more details",
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default",
        },
      },
    });
  }

  const handleSumbit = () => {
    // if field has a value or not
    function doesFieldHaveValue(field: string): boolean {
      return !(details[field] === null);
    }

    if (
      !(
        mandatoryFields.filter(doesFieldHaveValue).toString() ===
        mandatoryFields.toString()
      )
    ) {
      Alert.alert("Please fill mandatory fields.");
    } else {
      const accessToken = getAccessToken();
      fetch(update_bank_details, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token_ims_app=${accessToken}`,
        },
        body: JSON.stringify(details),
      })
        .then((response) => response)
        .then((_json) => {
          // console.log("response: ", _json);
          Alert.alert("Submitted bank details.");
          onDisplayNotification(
            "Your application for bank details has been sent successfully.",
          );
        })
        .catch((error) => {
          // console.log("Error during Bank Details POST API: ", error);
          Alert.alert("An error occured while submitting.", error.toString());
          onDisplayNotification(
            "Your application for bank details was not sent successfully. Please try again later.",
          );
        });
    }
  };

  function isNotRollNumber(field: string): boolean {
    return !(field === "rollNumber");
  }

  function shouldBeShown(field: string): boolean {
    return fieldsToNotShow.includes(field) === false;
  }

  // type check input text for account number
  function isValidTextInput(input: string): boolean {
    // apparently IMS allows dots (.) in account number so we will also allow
    return input.match(/[^0-9.]/g) === null;
  }

  // function set selected value in state, or to set to null
  function setSelected(selected: string) {
    let valueToSet = "";
    const newDetails = { ...details };
    // show all by default
    fieldsToNotShow = fieldsToNotShow.filter(() => {
      return false;
    });
    if (selected !== "Select") {
      valueToSet = selected;
    }
    if (selected === "SBI") {
      fieldsToNotShow.push("bankName");
      fieldsToNotShow.push("branchName");
      fieldsToNotShow.push("ifscCode");

      // clear state to be safe
      newDetails.bankName = null;
      newDetails.branchName = null;
      newDetails.ifscCode = null;
    }

    setDetails(() => {
      newDetails.selectBank = valueToSet;
      return newDetails;
    });
  }

  // to remove selected pdf
  function clearPDF() {
    setDetails(() => {
      const newDetails = { ...details };
      // newDetails["passbookOrCanceledCheque"] = {
      // "filename": null,
      // "size": null,
      newDetails.base64Data = null;
      setPDFName("");
      setPDFSize(0);
      setPDFURI("");
      setFileContent("");
      // };
      return newDetails;
    });
  }

  // pdf picker
  const selectDocument = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.pdf,
      });

      // Check if the selected file is within the 1 MB limit
      if (doc.size != null && doc.size > 1 * 1024 * 1024) {
        Alert.alert(
          "File Size Limit Exceeded",
          "Please select a file up to 1 MB.",
        );
      } else {
        setPDFName(doc.name ? doc.name : ""); // triggers useEffect hook
        setPDFSize(doc.size ? doc.size : 0);
        setPDFURI(doc.uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log("User cancelled the upload", err);
      } else {
        // console.log(err);
        Alert.alert("Error", "Failed to pick the document.");
        clearPDF(); // to be safe
      }
    }
  };

  // skip roll number and render
  const objectList: Array<React.JSX.Element> = fields
    .filter(isNotRollNumber)
    .filter(shouldBeShown)
    .map((value, index) => {
      // if (value === "passbookOrCanceledCheque") {
      if (value === "base64Data") {
        return (
          <SafeAreaView key={index} style={card.container}>
            <SafeAreaView style={bank.fieldHeaderContainer}>
              <Text style={card.sectionHeader}>{fieldNames[value]}</Text>
              {mandatoryFields.includes(value) ? (
                <Image source={redDotIcon} style={bank.fieldHeaderMandatory} />
              ) : undefined}
            </SafeAreaView>

            <SafeAreaView style={bank.bankPDFContainer}>
              <Card containerStyle={bank.bankPDFNameCard}>
                <Text style={bank.bankPDFName}>
                  {/* {details.passbookOrCanceledCheque.filename ? details.passbookOrCanceledCheque.filename : "No file selected."} */}
                  {pdfName ? pdfName : "No file selected."}
                </Text>
              </Card>

              <SafeAreaView style={bank.bankPDFIcons}>
                <TouchableOpacity
                  onPress={selectDocument}
                  style={bank.bankPDFPick}
                >
                  <Image source={fileInputIcon} style={bank.bankPDFPick} />
                </TouchableOpacity>

                <TouchableOpacity onPress={clearPDF} style={bank.bankPDFCancel}>
                  <Image source={crossIcon} style={bank.bankPDFCancel} />
                </TouchableOpacity>
              </SafeAreaView>
            </SafeAreaView>
          </SafeAreaView>
        );
      }

      if (value == "selectBank") {
        return (
          <SafeAreaView key={index}>
            <SafeAreaView style={bank.fieldHeaderContainer}>
              <Text style={card.sectionHeader}>{fieldNames[value]}</Text>
              {mandatoryFields.includes(value) ? (
                <Image source={redDotIcon} style={bank.fieldHeaderMandatory} />
              ) : undefined}
            </SafeAreaView>

            <SafeAreaView style={card.card}>
              <SelectList
                setSelected={setSelected}
                data={selectBankOptions}
                placeholder="Select"
                search={false}
                dropdownTextStyles={card.cardTextInput}
                inputStyles={card.cardTextInput}
              ></SelectList>
            </SafeAreaView>
          </SafeAreaView>
        );
      }

      return (
        <SafeAreaView key={index} style={card.container}>
          <SafeAreaView style={bank.fieldHeaderContainer}>
            <Text style={card.sectionHeader}>{fieldNames[value]}</Text>
            {mandatoryFields.includes(value) ? (
              <Image source={redDotIcon} style={bank.fieldHeaderMandatory} />
            ) : undefined}
          </SafeAreaView>

          <Card containerStyle={card.card}>
            <TextInput
              style={card.cardTextInput}
              editable={true}
              value={details[value] === null ? "" : details[value]}
              onChangeText={(newText) => {
                if (
                  value === "accountNumber" &&
                  isValidTextInput(newText) === false
                ) {
                  Alert.alert("Only numbers are allowed.");
                } else {
                  setDetails(() => {
                    const newDetails = { ...details };
                    newDetails[value] = newText.length == 0 ? null : newText;
                    return newDetails;
                  });
                }
              }}
              keyboardType={value === "accountNumber" ? "numeric" : "default"}
              maxLength={
                value === "accountNumber"
                  ? MAX_ACCOUNT_NUMBER_LENGTH
                  : MAX_FIELD_LENGTH
              }
              multiline={true}
            />
          </Card>
        </SafeAreaView>
      );
    });

  return (
    <SafeAreaView style={global.container}>
      <ScrollView>
        {objectList}
        <SafeAreaView style={bank.bankDetailsSubmit}>
          <Button onPress={handleSumbit} color="#2D0C8B">
            Submit
          </Button>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditBankDetails;
