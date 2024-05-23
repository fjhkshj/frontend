import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { rollno } from "../../Login/Login";
import { getCoursesAPI } from "../../../constants/APIHandler";

// define interface for typescript
export interface Course {
  CourseCode: string;
  CourseName: string;
  Credits: number;
  Semester: string;
  Year: string;
  Grade: string | null;
}

export interface Attendance {
  absents: string;
}

export interface CourseDetails {
  Courses: { [key: string]: Course };
  Attendance: { [key: string]: Attendance };
}

export interface CourseRow {
  key: string;
  name: string;
}

let coursedetails = {};
let courserows = {};

function CourseTable(): React.JSX.Element {
  const [detailsState, setDetails] = React.useState<CourseDetails>();
  const [courseRows, setCourseRows] = React.useState<CourseRow[]>([]);

  const filterPresentCourses = () => {
    const Rowslist: CourseRow[] = [];
    if (detailsState == undefined) {
      return;
    }
    const presentCourses = (
      Object.values(detailsState.Courses) as Course[]
    ).filter((course) => course.Grade === null);
    presentCourses.forEach((course) => {
      Rowslist.push({ key: course.CourseCode, name: course.CourseName });
    });
    setCourseRows(Rowslist);
    coursedetails = detailsState;
    courserows = courseRows;
  };

  const fetchCourseDetails = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 10000);
      });
      const responsePromise = fetch(getCoursesAPI(rollno));
      const response = await Promise.race([responsePromise, timeoutPromise]);
      const json = await (response as Response).json();
      setDetails(JSON.parse(JSON.stringify(json)));
      filterPresentCourses();
    } catch (error) {
      Alert.alert("Network Error: Couldn't fetch courses");
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [detailsState]);

  // just to trigger useEffect
  return <View />;
}

export { coursedetails, courserows };
export default CourseTable;
