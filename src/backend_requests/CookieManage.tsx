import CookieManager from "@react-native-cookies/cookies";

export const getCookie = async (request: Response, uri_for_auth: string): Promise<boolean> => {
    try {
        if (!request) {
            throw new Error('Invalid request object');
        }

        const cookies = request.headers.get('set-cookie');
        // console.log("REQUEST HEADERS: ", request.headers);

        if (!cookies) {
            return false;
        }

        // Extracting the value of the cookie from the header
        const cookieArray = cookies.split('; ');

        // Get the Access Token
        let accessToken = cookieArray[4];
        const access_token_value = accessToken.split(', ');

        const token_dict = access_token_value[1];
        const token_value = token_dict.split('=');

        const ims_app_token_value = token_value[1];

        if (!ims_app_token_value) {
            return false;
        }

        console.log("ACCESS TOKEN: ", ims_app_token_value);

        await CookieManager.set(uri_for_auth, {
            name: 'access_token_ims_app',
            value: ims_app_token_value,
            path: '/',
            httpOnly: false
        });

        console.log('Status of assigning cookie to the user: ', 'Success');

        // Get cookie of the user for verification
        const cookie = await CookieManager.get(uri_for_auth, false);
        if(cookie){
            console.log('Verifying cookie of the user: ', cookie);
            console.log("Assigned cookie to the user successfully...");
            return true;
        }
        else{
            return false;
        }

    } catch (error) {
        console.error('Failed to handle cookies: ', error);
        return false;
    }
};
