
import { auth_route } from "../constants/APIHandler";
import { getCookie } from "./CookieManage";

export const authenticate_user = async (Email: string, _Password: string, setErrorText: (text: string) => void, setIsError: (text: boolean) => void): Promise<boolean> => {

    try {
        console.log("Authenticating User...");
        // Creating Form Data Which is defined in Backend 
        const formData = new FormData();

        formData.append('username', Email);
        formData.append('password', _Password);
        console.log("Email: ", Email);
        console.log("Password: ", _Password);
        const uri_for_auth = auth_route;
        console.log("URL FOR AUTHENTICATION: ", uri_for_auth);

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("Request timed out"));
            }, 5000);
        });

        const responsePromise = fetch(uri_for_auth, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Connection": "keep-alive",
                "Accept-Encoding": "gzip, deflate, br",
                "Content-Type": "multipart/form-data"
            },
            body: formData
        });

        const response = await Promise.race([responsePromise, timeoutPromise]);
        console.log("Response Data: ", responsePromise);
        console.log("RESPONSE: ", response);
        if (!(response as Response).ok) {
            setIsError(false);
            setErrorText("Invalid Username or Password");
            console.log("Error In Recieving User Details");
            return false;
        }

        const responseData = await (response as Response).json();
        // console.log("RESPONSE From Server: ", response);
        setIsError(false);
        // Handle the response
        if (response.status === 200) {
            setErrorText("Auth Success, Getting Cookies....");
            const cookie_status = await getCookie(response, uri_for_auth);
            if (cookie_status == false) {
                setErrorText("Auth Success, Cookie assign failed");
                return false;
            }
            setErrorText("Auth, Cookie Assign Success.");
            return true;
        }
        else {
            setErrorText("Invalid Credentials");
            console.log("Invalid Credentials");
            return false;
        }


    }
    catch (error) {
        setIsError(false);
        setErrorText("Error while sending POST request to Authentication API")
        console.log("Failed in Authentication Network request failed ", error);
        return false;
    }
};