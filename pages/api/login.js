import { setCookie } from "cookies-next";
import { SPOTIFY_STATE_KEY } from "../../constants/spotify";

const generateRandomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const handler = (req, res) => {
    const state = generateRandomString(16);
    setCookie(SPOTIFY_STATE_KEY, state, { req, res });

    const scope = "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

    const query = new URLSearchParams({
        response_type: "code",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        scope,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        state,
    }).toString();

    res.redirect(`https://accounts.spotify.com/authorize?${query}`);
};

export default handler;
