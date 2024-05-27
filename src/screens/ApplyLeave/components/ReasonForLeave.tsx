import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, TextInput } from "react-native";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";
import { SelectList } from "react-native-dropdown-select-list";
import EventSchedule from "./EventSchedule";
import { otherIcons, IconSet } from "../../../constants/Icons";

const lightIcons: IconSet = otherIcons.light;
const redDotIcon = lightIcons.red_dot;

function ReasonForLeave({
  leavereason,
  patientscategory,
  doctorscategory,
  eventscategory,
  presentation,
  URL,
}): React.JSX.Element {
  const [reasonForLeave, setReasonForLeave] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const ListOfReasons = [
    { key: "Select...", value: "Select..." },
    { key: "Sickness", value: "Sickness" },
    { key: "Family Emergency", value: "Family Emergency" },
    { key: "Technical Event", value: "Technical Event" },
    { key: "Sports Event", value: "Sports Event" },
    { key: "Cultural Event", value: "Cultural Event" },
    { key: "Any Other", value: "Any Other" },
  ];

  const PatientCategories = [
    { key: "Select...", value: "Select..." },
    { key: "In Patient", value: "In Patient" },
    { key: "Out Patient", value: "Out Patient" },
  ];

  const DoctorCategories = [
    { key: "Select...", value: "Select..." },
    { key: "Institute Doctor", value: "Institute Doctor" },
    { key: "Outside Doctor", value: "Outside Doctor" },
  ];

  const EventCategories = [
    { key: "Select...", value: "Select..." },
    { key: "Conference", value: "Conference" },
    { key: "Workshop", value: "Workshop" },
  ];
  const Presentations = [
    { key: "Select...", value: "Select..." },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];
  const handleurlChange = (text: string) => {
    URL(text);
    if (text == null) {
      URL(null);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={LeaveApplicationCss.text}>Reason for Leave</Text>

          <Image source={redDotIcon} style={LeaveApplicationCss.image} />
        </View>
        <View style={{ margin: 20, marginBottom: 2 }}>
          <SelectList
            setSelected={(value) => {
              setReasonForLeave(value);
              leavereason(value);
            }}
            data={ListOfReasons}
            placeholder="Select..."
            search={false}
          ></SelectList>
        </View>
        {reasonForLeave === "Sickness" ? (
          <View style={{ margin: 20, marginTop: 3 }}>
            <View style={{ marginLeft: -20, marginTop: -10, marginBottom: 15 }}>
              <Text style={LeaveApplicationCss.text}>Patient Category</Text>
            </View>
            <SelectList
              setSelected={(value) => {
                patientscategory(value);
              }}
              data={PatientCategories}
              placeholder="Select..."
              search={false}
            ></SelectList>
            <View style={{ marginTop: 20 }}>
              <View
                style={{ marginLeft: -20, marginTop: -18, marginBottom: 15 }}
              >
                <Text style={LeaveApplicationCss.text}>Doctor Category</Text>
              </View>
              <SelectList
                setSelected={(value) => {
                  doctorscategory(value);
                }}
                data={DoctorCategories}
                placeholder="Select..."
                search={false}
              ></SelectList>
            </View>
          </View>
        ) : null}
        {reasonForLeave === "Sports Event" ? (
          <EventSchedule
            fromDateText="Event Start Date"
            toDateText="Event End Date"
          />
        ) : null}
        {reasonForLeave === "Cultural Event" ? (
          <EventSchedule
            fromDateText="Event Start Date"
            toDateText="Event End Date"
          />
        ) : null}
        {reasonForLeave === "Technical Event" ? (
          <View>
            <View>
              <Text style={LeaveApplicationCss.text}>Event Type</Text>
            </View>
            <View style={{ margin: 20, marginBottom: 2 }}>
              <SelectList
                setSelected={(value) => {
                  setEventCategory(value);
                  eventscategory(value);
                }}
                data={EventCategories}
                placeholder="Select..."
                search={false}
              ></SelectList>
            </View>
            {EventCategory === "Conference" ? (
              <View>
                <View>
                  <Text style={LeaveApplicationCss.text}>
                    Are You Presenting a Paper?
                  </Text>
                </View>
                <View style={{ margin: 20, marginBottom: 2 }}>
                  <SelectList
                    setSelected={(value) => {
                      presentation(value);
                    }}
                    data={Presentations}
                    placeholder="Select..."
                    search={false}
                  ></SelectList>
                </View>
              </View>
            ) : null}
            <View>
              <EventSchedule
                fromDateText="Event Start Date"
                toDateText="Event End Date"
              />
            </View>
            <View>
              <Text style={LeaveApplicationCss.text}>Event URL</Text>
              <TextInput
                style={LeaveApplicationCss.input}
                multiline={true}
                numberOfLines={5}
                inputMode="text"
                onChangeText={handleurlChange}
              />
              {/* <View style={LeaveApplicationCss.input}>
                        </View> */}
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
export default ReasonForLeave;
