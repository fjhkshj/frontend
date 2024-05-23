import React from "react";
import { View, Text, Image, SafeAreaView, TextInput } from "react-native";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";

import { otherIcons } from "../../../constants/Icons";

const lightIcons = otherIcons.light;
const redDotIcon = lightIcons.red_dot;

function Remarks({ leavejustification, leaveremarks }): React.JSX.Element {
  const todayDate = new Date();
  const handleJustificationChange = (text: string) => {
    leavejustification(text);
    if (text == "") {
      leavejustification(null);
    }
  };

  const handleRemarksChange = (text: string) => {
    leaveremarks(text);
    if (text == "") {
      leaveremarks(null);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>Justification for Leave</Text>
          <Image source={redDotIcon} style={LeaveApplicationCss.image} />
        </View>
        <TextInput
          style={LeaveApplicationCss.input3}
          placeholder="Write your response here."
          multiline={true}
          numberOfLines={5}
          onChangeText={handleJustificationChange}
        />
      </View>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>Remarks</Text>
        </View>
        <TextInput
          style={LeaveApplicationCss.input3}
          placeholder="Write your response here."
          multiline={true}
          numberOfLines={5}
          onChangeText={handleRemarksChange}
        />
      </View>
      <View>
        <Text style={LeaveApplicationCss.text}>Application Date</Text>
        <View style={LeaveApplicationCss.input2}>
          <Text>
            {todayDate.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Remarks;
