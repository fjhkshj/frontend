import { getAccessToken } from "./AccessToken";
import { apply_leave } from "../constants/APIHandler";
import { onDisplayNotification } from "../components/SendNotification";

async function sendData(json_to_send, accessToken: string): Promise<boolean> {
    try {
        const response = await fetch(apply_leave, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                'Cookie': `access_token_ims_app=${accessToken}`
            },
            body: JSON.stringify(json_to_send)
        });

        if (response.ok) {
            onDisplayNotification("Your Leave Request Applied successfully.");
            return true;
        } else {
            const errorText = await response.text();
            console.error('Error response from server:', errorText);
            onDisplayNotification("Error during sending your leave request, please try again sometime later.");
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const postLeaveToServer = async (json_to_send): Promise<boolean> => {
    try {
        const accessToken = await getAccessToken();
        if (accessToken) {
            return await sendData(json_to_send, accessToken);
        } else {
            console.log("Error in Receiving Cookies.");
            return false;
        }
    } catch (error) {
        console.error('Network or other error:', error);
        onDisplayNotification("Error during sending your leave request, please try again sometime later.");
        return false;
    }
};
