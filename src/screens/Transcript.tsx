import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  StyleSheet
} from "react-native";
import { Button } from "@rneui/base";
import SemesterSelector from "../components/SemesterSelector";
import { getTranscriptAPI } from "../constants/APIHandler";

import { userMail } from "../backend_requests/UserDetails";
import { selected_year, selected_sem } from "../components/SemesterSelector";

import {
  coursedetails,
  CourseDetails,
  Course
} from "./Dashboard/components/CourseTable";

interface SemesterData {
  [semester: string]: {
    year: string;
    courses: Course[];
    CGPA: number;
    SGPA: number;
  };
}

interface GPAJSON {
  [semesterName: string]: { cgpa: number; sgpa: number };
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    color: "#7a7a7a",
    marginTop: 20,
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15
  },
  row: {
    flexDirection: "row"
  },
  box: {
    borderRadius: 10,
    justifyContent: "space-evenly",
    backgroundColor: "#FAFAFA",
    padding: 40,
    paddingTop: 0,
    paddingBottom: 20,
    marginBottom: 20
  },
  cell: {
    borderColor: "black",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    borderColor: "black",
    alignSelf: "center"
  },
  headingRow: {
    backgroundColor: "lightgray"
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 11
  },
  input3: {
    height: 100,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black", // Ensure consistent border color
    padding: 13,
    width: "90%",
    alignSelf: "center",
    textAlignVertical: "top",
    flexWrap: "wrap",
    borderRadius: 6
  }
});

function Transcript(): React.JSX.Element {
  const screenWidth = Dimensions.get("window").width;
  const [semesterData, setSemesterData] = useState({} as SemesterData);
  const [gpaData, setGpaData] = useState({} as GPAJSON);
  const [record, setRecord] = useState(false);

  const fetchGpa = async () => {
    try {
      const url = getTranscriptAPI(userMail);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch GPA data");
      }
      const responseData = await response.json();
      setGpaData(responseData.semesters);
    } catch (e: unknown) {
      Alert.alert("GPAData:", e as string);
    }
  };

  // when page loads, fetch transcript API
  useEffect(() => {
    fetchGpa();
  }, []);

  const columnFractions = [0.25, 0.45, 0.15, 0.15];

  const getValidEntries = (): string[] => {
    const valid_entries = [];
    const [year1, year2Part] = selected_year.split("-");
    const year2 = "20" + year2Part;
    if (selected_sem == "Spring") {
      valid_entries.push("Spring" + year2);
    } else if (selected_sem == "Monsoon") {
      valid_entries.push("Monsoon" + year1);
    } else {
      valid_entries.push("Monsoon" + year1);
      valid_entries.push("Spring" + year2);
    }
    return valid_entries;
  };

  const addCourses = (newSemData: SemesterData) => {
    setRecord(true);
    const newData = coursedetails as CourseDetails;

    // initialize the semeseter
    for (const courseId in newData.Courses) {
      const course = newData.Courses[courseId];
      const { Year, Semester } = course;
      if (
        Year === selected_year &&
        (selected_sem === "All" || Semester === selected_sem)
      ) {
        // if semester is defined first time
        if (newSemData[Semester] == undefined) {
          newSemData[Semester] = {
            year: selected_year,
            courses: [course],
            CGPA: 0,
            SGPA: 0
          };
        } else {
          newSemData[Semester].courses.push(course);
        }
      }
    }
  };

  const addGPA = (newSemData: SemesterData) => {
    const validEntries = getValidEntries();
    for (const [semesterName, { sgpa, cgpa }] of Object.entries(gpaData)) {
      if (validEntries.includes(semesterName)) {
        const semEntry = semesterName.slice(0, -4);

        // fix: GPA list works even if courselist fails.
        if (newSemData[semEntry] == undefined) {
          newSemData[semEntry] = {
            year: selected_year,
            courses: [],
            CGPA: cgpa,
            SGPA: sgpa
          };
        } else {
          newSemData[semEntry].CGPA = cgpa;
          newSemData[semEntry].SGPA = sgpa;
        }
      }
    }
  };

  const handleSelection = () => {
    if (selected_year != null && selected_year != "Select...") {
      if (
        selected_sem == "All" ||
        selected_sem == "Spring" ||
        selected_sem == "Monsoon"
      ) {
        const newSemData: SemesterData = {};
        addCourses(newSemData);
        addGPA(newSemData);
        setSemesterData(newSemData);
        return;
      }
    }
    return Alert.alert("Alert", "Please fill all the fields", [{ text: "OK" }]);
  };
  const renderTableCells = (courses: Course[]) => {
    const cells = [];
    const headings = ["CourseCode", "CourseName", "Credits", "Grade"];

    // render heading row
    const headingRowCells = headings.map((heading, index) => (
      <View
        key={index}
        style={[
          styles.cell,
          { width: (screenWidth - 30) * columnFractions[index] }
        ]}
      >
        <Text style={styles.headingText}>{heading}</Text>
      </View>
    ));

    cells.push(
      <View style={[styles.row, styles.headingRow]}>{headingRowCells}</View>
    );

    // render rows
    courses.forEach((course: Course, index: number) => {
      const rowCells = headings.map((heading, columnIndex) => (
        <View
          key={columnIndex}
          style={[
            styles.cell,
            { width: (screenWidth - 30) * columnFractions[columnIndex] }
          ]}
        >
          <Text>{course[heading]}</Text>
        </View>
      ));

      cells.push(
        <View key={index} style={styles.row}>
          {rowCells}
        </View>
      );
    });
    return cells;
  };

  const Selector = () => {
    return (
      <SafeAreaView style={styles.box}>
        <Text style={styles.heading}>Filter Selection</Text>
        <SemesterSelector />
        <View style={{ marginVertical: 30, alignItems: "center" }}>
          <Button
            containerStyle={{ width: 200 }}
            onPress={handleSelection}
            title="Proceed"
            color="#2D0C8B"
          />
        </View>
      </SafeAreaView>
    );
  };

  const EndOfRecord = () => {
    if (record) {
      return (
        <View style={{ marginBottom: 10, alignItems: "center", marginTop: 8 }}>
          <Text style={{ fontWeight: "900", fontSize: 15 }}>
            *End of Record*
          </Text>
        </View>
      );
    }
    return null;
  };

  const PreHeading = (semester: string, year: string) => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginVertical: 10,
            marginLeft: screenWidth * 0.03
          }}
        >
          {semester + " " + year}
        </Text>
      </View>
    );
  };

  const GPAInfo = (props: {
    sgpa: number;
    cgpa: number;
  }): React.JSX.Element => {
    const { sgpa, cgpa } = props;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: screenWidth * 0.05,
          marginTop: 10,
          marginVertical: 20
        }}
        key={1}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          SGPA: {sgpa.toString()}
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          CGPA: {cgpa.toString()}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Selector />
      {Object.entries(semesterData).map(
        ([semester, { year, courses, CGPA, SGPA }], index) => (
          <View key={index}>
            {PreHeading(semester, year)}
            <View style={[styles.table, { width: screenWidth - 30 }]} key={0}>
              {renderTableCells(courses)}
            </View>
            <GPAInfo sgpa={SGPA} cgpa={CGPA} />
          </View>
        )
      )}
      <EndOfRecord />
    </ScrollView>
  );
}

export default Transcript;
