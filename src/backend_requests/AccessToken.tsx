import CookieManager from "@react-native-cookies/cookies";
import { domain } from "../constants/APIHandler";

export const getAccessToken = async (): Promise<string | null> => {
    try {
        const cookies = await CookieManager.get(domain);
        const accessToken = cookies['access_token_ims_app']?.value;
        if (accessToken) {
            console.log("ACCESS TOKEN: ", accessToken);
            return accessToken;
        } else {
            console.log("Access token not found in cookies");
            return null;
        }
    } catch (error) {
        console.log("Error retrieving access token from cookies", error);
        return null;
    }
};