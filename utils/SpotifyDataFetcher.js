import axios from "axios";
import {
    SPOTIFY_ACCESS_TOKEN,
    SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_TOKEN_TIMESTAMP,
    SPOTIFY_TOKEN_EXPIRATION_TIME,
} from "../constants/spotify";
import { TIME_RANGE_LONG_TERM } from "../constants/timeRange";

class SpotifyDataFetcher {
    constructor(axiosSpotify, axiosLocal) {
        this.spotifyApi = axiosSpotify;
        this.localApi = axiosLocal;
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
            const refreshToken = this.getLocalRefreshToken();
            const { data } = await this.localApi.get(`/api/refreshToken?refreshToken=${refreshToken}`);
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

    fetch = async (url) => {
        const headers = await this.getHeaders();
        return this.spotifyApi.get(url, headers);
    }

    post = async (url, data) => {
        const headers = await this.getHeaders();
        return this.spotifyApi.post(url, data, headers);
    }

    getUser = async () => (
        this.fetch("/me")
    );

    getTopArtists = async (timeRange, limit = 50) => (
        this.fetch(`/me/top/artists?limit=${limit}&time_range=${timeRange}`)
    );

    getArtist = async (artistId) => (
        this.fetch(`/artists/${artistId}`)
    );

    getRecentlyPlayed = async () => (
        this.fetch("/me/player/recently-played")
    );

    getTopTracks = async (timeRange, limit = 50) => (
        this.fetch(`/me/top/tracks?limit=${limit}&time_range=${timeRange}`)
    );

    getPlaylists = async () => (
        this.fetch("/me/playlists")
    );

    getPlaylist = async (playlistId) => (
        this.fetch(`/playlists/${playlistId}`)
    );

    getTrack = async (trackId) => (
        this.fetch(`/tracks/${trackId}`)
    );

    getTrackAudioAnalysis = async (trackId) => (
        this.fetch(`/audio-analysis/${trackId}`)
    );

    getRecommendationsForTracks = async (trackIds) => {
        const shuffledTracks = trackIds
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .join(",");

        return this.fetch(`/recommendations?seed_tracks=${shuffledTracks}`);
    }

    getUserInfo = async () => {
        await this.getAccessToken();
        return axios.all([
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
        );
    }

    getTrackInfo = async (trackId) => {
        await this.getAccessToken();
        return axios.all([
            this.getTrack(trackId),
            this.getTrackAudioAnalysis(trackId),
        ]).then(
            axios.spread((track, audioAnalysis) => ({
                track: track.data,
                audioAnalysis: audioAnalysis.data,
            })),
        );
    }
}

export default SpotifyDataFetcher;
