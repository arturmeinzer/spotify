import axios from "axios";

const handler = async (req, res) => {
    const { refreshToken } = req.query;

    const basicAuth = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`).toString("base64");
    const options = {
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        headers: {
            Authorization: `Basic ${basicAuth}`,
        },
    };

    const response = await axios(options);
    if (response.status === 200) {
        const { access_token: accessToken } = response.data;
        res.send({ accessToken });
    }
};

export default handler;
