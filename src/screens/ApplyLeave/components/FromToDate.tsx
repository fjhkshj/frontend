import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { otherIcons, IconSet } from "../../../constants/Icons";

const lightIcons: IconSet = otherIcons.light;
const redDotIcon = lightIcons.red_dot;
const calendarIcon = lightIcons.calendar;

function FromToDate({
  setfromdate,
  settodate,
  settotaldays,
  fromdatetext,
  todatetext,
}): React.JSX.Element {
  const [totalDays, setTotalDays] = useState(1);
  const [mode, setMode] = useState("date");
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const DateCompare = () => {
    Alert.alert("Alert", "From date cannot be greater than To date", [
      { text: "OK" },
    ]);
  };

  const onFromDateChange = (event: Event, selectedDate: Date) => {
    setShowFromDate(false);
    if (selectedDate) {
      setFromDate(selectedDate);
      setfromdate(selectedDate);
      if (!isSameDate(selectedDate, toDate) && selectedDate > toDate) {
        DateCompare();
      }
    }
  };

  const onToDateChange = (event: Event, selectedDate: Date) => {
    setShowToDate(false);
    if (selectedDate) {
      setToDate(selectedDate);
      settodate(selectedDate);
      if (!isSameDate(selectedDate, fromDate) && selectedDate < fromDate) {
        DateCompare();
      }
    }
  };

  const showFromDateMode = () => {
    setMode("date");
    setShowFromDate(true);
  };

  const showToDateMode = () => {
    setMode("date");
    setShowToDate(true);
  };

  const calculateTotalDays = (startDate: Date, endDate: Date) => {
    // console.log("Date")
    // console.log("FROM DATE : ", startDate)
    // console.log("TO DATE : ", endDate)

    // Reset time to 00:00:00 for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (start.getTime() === end.getTime()) {
      // console.log("Dates are equal");
      setTotalDays(1);
      settotaldays(1);
    } else if (start <= end) {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays =
        Math.abs(Math.round((start.getTime() - end.getTime()) / oneDay)) + 1;
      setTotalDays(diffDays);
      settotaldays(diffDays);
    } else {
      // console.log("Start date is after end date");
      setTotalDays(0);
      settotaldays(0);
    }
  };

  useEffect(() => {
    calculateTotalDays(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <View>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>{fromdatetext}</Text>
          <Image source={redDotIcon} style={LeaveApplicationCss.image} />
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
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={[
              LeaveApplicationCss.input,
              { width: "80%" },
              { marginLeft: "5%" },
              { alignSelf: "flex-start" },
            ]}
          >
            <Text>
              {fromDate.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
          </View>
          <TouchableOpacity onPress={showFromDateMode}>
            <Image
              source={calendarIcon}
              style={{ height: 40, width: 40, marginTop: 10, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>{todatetext}</Text>
          <Image source={redDotIcon} style={LeaveApplicationCss.image} />
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
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={[
              LeaveApplicationCss.input,
              { width: "80%" },
              { marginLeft: "5%" },
              { alignSelf: "flex-start" },
            ]}
          >
            <Text>
              {toDate.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </Text>
          </View>
          <TouchableOpacity onPress={showToDateMode}>
            <Image
              source={calendarIcon}
              style={{ height: 40, width: 40, marginTop: 10, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={LeaveApplicationCss.text}>Total Days</Text>
        <View style={LeaveApplicationCss.input2}>
          <Text>{isNaN(totalDays) ? 0 : totalDays}</Text>
        </View>
      </View>
    </View>
  );
}

export default FromToDate;
