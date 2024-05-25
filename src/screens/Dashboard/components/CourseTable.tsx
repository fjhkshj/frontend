import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { courses_details } from "../../../constants/APIHandler";
import { getAccessToken } from "../../../backend_requests/AccessToken";

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
    // console.log("Checking Here: ");

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


      const accessToken = await getAccessToken();
      if (accessToken) {
        console.log("Cookies Fetched Success.");
        const responsePromise = fetch(courses_details, {
          method: "GET",
          headers: { 'Cookie': `access_token_ims_app=${accessToken}` }
        });
        const response = await Promise.race([responsePromise, timeoutPromise]);
        console.log("RESPONSE: ", response);
        const json = await (response as Response).json();
        console.log("JSON FORMAT: ",    json);
        setDetails(JSON.parse(JSON.stringify(json)));

        // Here function is not calling, Need to fix this.
        filterPresentCourses();

      } else {
        console.log("Error in Receiving Cookies.");

      }

    } catch (error) {
      // Alert.alert("Network Error: Couldn't fetch courses");
      console.log("Could not fetch Courses data in the Dashboard");
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  
  // just to trigger useEffect
  return <View />;
}

export { coursedetails, courserows };
export default CourseTable;
