import axios from "axios";
import { deleteCookie } from "cookies-next";
import { SPOTIFY_STATE_KEY } from "../../constants/spotify";

const handler = async (req, res) => {
    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies[SPOTIFY_STATE_KEY] : null;

    if (state === null || state !== storedState) {
        const query = new URLSearchParams({ error: "state_mismatch" }).toString();
        res.redirect(`/?${query}`);
        return;
    }

    deleteCookie(SPOTIFY_STATE_KEY, { req, res });
    const basicAuth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
    const options = {
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams({
            code,
            redirect_uri: process.env.REDIRECT_URI,
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
