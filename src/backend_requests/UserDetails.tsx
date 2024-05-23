import { UserTypes } from "../custom-types";
import CookieManager from "@react-native-cookies/cookies";
import { domain } from "../constants/APIHandler";
import { user_details } from "../constants/APIHandler";
import { getAccessToken } from "./AccessToken";

// better to pass to navigation params but easier this way
let userMail = "";
let userName = "";
let rollno = "";
let userType: UserTypes = UserTypes.Default; // should not be default post login


export const get_user_details = async (): Promise<boolean> => {
    try {
        const accessToken = await getAccessToken();
        if (accessToken) {
            const uri = user_details;
            console.log(" GET DETAILS API: ", uri);
            const responsePromise = await fetch(uri,
                {
                    method: "GET",
                    headers: { 'Cookie': `access_token_ims_app=${accessToken}` }
                }
            );

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Request timed out"));
                }, 5000);
            });

            const response = await Promise.race([responsePromise, timeoutPromise]);
            console.log("RESPONSE FROM GET USER DETAILS API: ", response)
            if (!(response as Response).ok) {

                console.log("Error In Recieving User Details");
                return false;
            }

            const responseData = await (response as Response).json();
            console.log("DATA OF RESPONSE JSON: ", responseData);
            if (response.status === 200) {
                userMail = responseData.email;
                userName = responseData.name;
                rollno = responseData.rollNumber;
                console.log("USER TYPE: ", responseData.userType);
                if (
                    responseData.userType === "Academics Students" &&
                    responseData.role === "Student"
                ) {
                    userType = UserTypes.Student;
                } else if (
                    responseData.userType === "EMPLOYEE" &&
                    responseData.role === "Faculty"
                ) {
                    userType = UserTypes.Faculty;
                } else if (
                    responseData.userType === "EMPLOYEE" &&
                    responseData.role === "Staff"
                ) {
                    userType = UserTypes.Staff;
                }
                return true;

            } else {
                console.log("Auth Success, Error in Getting User Details");
                return false;

            }

        }
        else {
            console.log("Error in Getting ACCESS TOKEN");
            return false;
        }
    } catch (e) {
        console.log("ERROR in Getting user Details");
        return false;

    }
}
export { userMail, userName, rollno, userType };