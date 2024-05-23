import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import LeaveApplicationCss from "../styles/LeaveScreenStyles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SelectList,
  MultipleSelectList
} from "react-native-dropdown-select-list"; // Assuming you have these components
import { courserows } from "../../Dashboard/components/CourseTable"; // Assuming this is where your course data is stored

import { otherIcons } from "../../../constants/Icons";

const lightIcons = otherIcons.light;
const redDotIcon = lightIcons.red_dot;

function MissedExams({
  leaveforsports,
  setmissedexams,
  setCOURSESMISSED
}): React.JSX.Element {
  const [missedExams, setMissedExams] = useState("Missed Exams");
  const [missedcourses, setMissedCourses] = useState([]);

  const ListOfReasons = [
    { key: "Select...", value: "Select..." },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" }
  ];

  const ReasonsforSports = [
    { key: "Select...", value: "Select..." },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" }
  ];

  // const coursesList = []
  const coursesList = Object.values(courserows).map((course) => ({
    key: course.key,
    value: course.name
  }));

  useEffect(() => {
    setmissedexams(missedExams);
  }, [missedExams]);

  useEffect(() => {
    // console.log(missedcourses)
    setCOURSESMISSED(missedcourses);
  }, [missedcourses]);

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[LeaveApplicationCss.text, { marginBottom: -10 }]}>
              Missed exams during leave?
            </Text>

            <Image source={redDotIcon} style={LeaveApplicationCss.image} />
          </View>
          <View style={{ margin: 20, marginBottom: 5 }}>
            <SelectList
              setSelected={(value) => {
                setMissedExams(value);
                setmissedexams(value);
              }}
              data={ListOfReasons}
              placeholder="Select..."
              search={false}
            />
          </View>
          {missedExams === "Yes" ? (
            <View>
              <View>
                <Text style={LeaveApplicationCss.text}>Courses</Text>
              </View>
              <View style={{ margin: 20, marginBottom: 2 }}>
                <MultipleSelectList
                  setSelected={(value) => {
                    setMissedCourses(value);
                  }}
                  data={coursesList}
                  placeholder="Select..."
                  search={false}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={LeaveApplicationCss.text}>
              Leave for only PT/Sports classes
            </Text>

            <Image source={redDotIcon} style={LeaveApplicationCss.image} />
          </View>
          <View style={{ margin: 20 }}>
            <SelectList
              setSelected={(value) => {
                leaveforsports(value); // Passing the value to leaveforsports
              }}
              data={ReasonsforSports}
              placeholder="Select..."
              search={false}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

// console.log(courserows)
export default MissedExams;
