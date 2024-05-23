import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { otherIcons } from "../../../constants/Icons";

const lightIcons = otherIcons.light;
const calendarIcon = lightIcons.calendar;

function EventSchedule(props: {
  fromDateText: string;
  toDateText: string;
}): React.JSX.Element {
  const [mode, setMode] = useState("date");
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDate(false);
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDate(false);
    setToDate(currentDate);
  };
  const showFromDateMode = () => {
    setMode("date");
    setShowFromDate(true);
  };

  const showToDateMode = () => {
    setMode("date");
    setShowToDate(true);
  };
  return (
    <View>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>{props.fromDateText}</Text>
          <TouchableOpacity onPress={showFromDateMode}>
            <Image
              source={calendarIcon}
              style={{ height: 40, width: 40, marginTop: 10, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        {showFromDate && (
          <DateTimePicker
            value={fromDate}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onFromDateChange}
          />
        )}
        <View style={LeaveApplicationCss.input}>
          <Text>
            {fromDate.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })}
          </Text>
        </View>
      </View>

      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>{props.toDateText}</Text>
          <TouchableOpacity onPress={showToDateMode}>
            <Image
              source={calendarIcon}
              style={{ height: 40, width: 40, marginTop: 10, marginLeft: 10 }}
            />
          </TouchableOpacity>
          {showToDate && (
            <DateTimePicker
              value={toDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onToDateChange}
            />
          )}
        </View>
        <View style={LeaveApplicationCss.input}>
          <Text>
            {toDate.toLocaleDateString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default EventSchedule;
