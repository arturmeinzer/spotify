import axios from "axios";
import { deleteCookie } from "cookies-next";

const stateKey = "spotify_auth_state";
const handler = async (req, res) => {
    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        const query = new URLSearchParams({ error: "state_mismatch" }).toString();
        res.redirect(`/?${query}`);
        return;
    }

    deleteCookie(stateKey, { req, res });
    const basicAuth = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString("base64");
    const options = {
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams({
            code,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
            grant_type: "authorization_code",
        }),
        headers: {
            Authorization: `Basic ${basicAuth}`,
        },
    };

    const response = await axios(options);
    if (response.status === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = response.data;
        const query = new URLSearchParams({ accessToken, refreshToken }).toString();
        res.redirect(`/?${query}`);
    } else {
        const query = new URLSearchParams({ error: "invalid_token" }).toString();
        res.redirect(`/?${query}`);
    }
};

export default handler;
