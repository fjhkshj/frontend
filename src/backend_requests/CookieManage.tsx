import CookieManager from "@react-native-cookies/cookies";

export const getCookie = async (request: Response, uri_for_auth: string): Promise<boolean> => {
    try {
        if (!request) {
            throw new Error('Invalid request object');
        }

        const cookies = request.headers.get('set-cookie');
        // console.log("REQUEST HEADERS: ", request.headers);

        if (!cookies) {
            throw new Error('No cookies found in the response headers');
        }

        // console.log("Cookies: ", cookies);

        // Extracting the value of the cookie from the header
        const cookieArray = cookies.split('; ');

        // Find the access token (Assuming it's the fifth part of the split)
        if (cookieArray.length < 5) {
            throw new Error('Expected cookie not found');
        }

        let accessToken = cookieArray[4];
        const access_token_value = accessToken.split(', ');

        if (access_token_value.length < 2) {
            throw new Error('Access token value is malformed');
        }

        const token_dict = access_token_value[1];
        const token_value = token_dict.split('=');

        if (token_value.length < 2) {
            throw new Error('Token value is malformed');
        }

        const ims_app_token_value = token_value[1];

        if (!ims_app_token_value) {
            throw new Error('Access token value is empty');
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
        console.log('Verifying cookie of the user: ', cookie);
        console.log("Assigned cookie to the user successfully...");
        return true;

    } catch (error) {
        console.error('Failed to handle cookies: ', error);
        return false;
    }
};
