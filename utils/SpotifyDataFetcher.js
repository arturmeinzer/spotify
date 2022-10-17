import axios from "axios";
import {
    SPOTIFY_ACCESS_TOKEN,
    SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_TOKEN_TIMESTAMP,
    SPOTIFY_TOKEN_EXPIRATION_TIME,
} from "../constants/spotify";
import { TIME_RANGE_LONG_TERM } from "../constants/timeRange";

class SpotifyDataFetcher {
    constructor() {
        this.axios = axios.create();
    }

    setTokenTimestamp = () => {
        window.localStorage.setItem(SPOTIFY_TOKEN_TIMESTAMP, Date.now().toString());
    }

    setLocalAccessToken = (accessToken) => {
        this.setTokenTimestamp();
        window.localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
    }

    setLocalRefreshToken = (refreshToken) => {
        window.localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
    }

    getLocalAccessToken = () => window.localStorage.getItem(SPOTIFY_ACCESS_TOKEN)

    getLocalRefreshToken = () => window.localStorage.getItem(SPOTIFY_REFRESH_TOKEN);

    getTokenTimestamp = () => window.localStorage.getItem(SPOTIFY_TOKEN_TIMESTAMP);

    hasLocalAccessToken = () => this.getLocalAccessToken() !== null;

    refreshAccessToken = async () => {
        try {
            const { data } = await axios.get(`/api/refreshToken?refreshToken=${this.getLocalRefreshToken()}`);
            const { accessToken } = data;
            this.setLocalAccessToken(accessToken);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    }

    getAccessToken = async () => {
        const timeRemaining = Date.now() - parseInt(this.getTokenTimestamp(), 10);

        if (timeRemaining > SPOTIFY_TOKEN_EXPIRATION_TIME) {
            // eslint-disable-next-line no-console
            console.info("Access token has expired, refreshing...");
            await this.refreshAccessToken();
        }

        return this.getLocalAccessToken();
    }

    static logout = () => {
        window.localStorage.removeItem(SPOTIFY_TOKEN_TIMESTAMP);
        window.localStorage.removeItem(SPOTIFY_REFRESH_TOKEN);
        window.localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
    }

    getHeaders = async () => {
        const accessToken = await this.getAccessToken();
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };
    }

    getUser = async () => {
        const headers = await this.getHeaders();
        return axios.get("https://api.spotify.com/v1/me", headers);
    }

    getTopArtists = async (timeRange, limit = 50) => {
        const headers = await this.getHeaders();
        return axios.get(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`, headers);
    }

    getArtist = async (artistId) => {
        const headers = await this.getHeaders();
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}`, headers);
    }

    getRecentlyPlayed = async () => {
        const headers = await this.getHeaders();
        return axios.get("https://api.spotify.com/v1/me/player/recently-played", headers);
    }

    getTopTracks = async (timeRange, limit = 50) => {
        const headers = await this.getHeaders();
        return axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`, headers);
    }

    getUserInfo = async () => (
        axios.all([
            this.getUser(),
            this.getTopArtists(TIME_RANGE_LONG_TERM, 10),
            this.getTopTracks(TIME_RANGE_LONG_TERM, 10),
        ]).then(
            axios.spread((
                user,
                topArtists,
                topTracks,
            ) => ({
                user: user.data,
                topArtists: topArtists.data,
                topTracks: topTracks.data,
            })),
        )
    )
}

export default SpotifyDataFetcher;
