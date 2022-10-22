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
        this.alert = null;
    }

    setAlert(alert) {
        this.alert = alert;
    }

    setTokenTimestamp = () => {
        window.localStorage.setItem(SPOTIFY_TOKEN_TIMESTAMP, Date.now().toString());
    };

    setLocalAccessToken = (accessToken) => {
        this.setTokenTimestamp();
        window.localStorage.setItem(SPOTIFY_ACCESS_TOKEN, accessToken);
    };

    setLocalRefreshToken = (refreshToken) => {
        window.localStorage.setItem(SPOTIFY_REFRESH_TOKEN, refreshToken);
    };

    getLocalAccessToken = () => window.localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

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
            this.alert.error(e.messages);
        }
    };

    getAccessToken = async () => {
        const timeRemaining = Date.now() - parseInt(this.getTokenTimestamp(), 10);

        if (timeRemaining > SPOTIFY_TOKEN_EXPIRATION_TIME) {
            // eslint-disable-next-line no-console
            this.alert.info("Access token has expired, refreshing...");
            await this.refreshAccessToken();
        }

        return this.getLocalAccessToken();
    };

    static logout = () => {
        window.localStorage.removeItem(SPOTIFY_TOKEN_TIMESTAMP);
        window.localStorage.removeItem(SPOTIFY_REFRESH_TOKEN);
        window.localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
    };

    getHeaders = async () => {
        const accessToken = await this.getAccessToken();
        return {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        };
    };

    fetch = async (url, options = {}) => {
        const headers = await this.getHeaders();
        try {
            return await this.spotifyApi.get(url, { headers, ...options });
        } catch (e) {
            console.log(e.message);
            console.log("error function", this.alert.error);
            this.alert.error(e.message);
            return {};
        }
    };

    post = async (url, data, options = {}) => {
        const headers = await this.getHeaders();
        try {
            return await this.spotifyApi.post(url, data, { headers, ...options });
        } catch (e) {
            this.alert.error(e.message);
            return {};
        }
    };

    delete = async (url, options) => {
        const headers = await this.getHeaders();
        try {
            return await this.spotifyApi.delete(url, { headers, ...options });
        } catch (e) {
            this.alert.error(e.message);
            return {};
        }
    };

    put = async (url, data, options) => {
        const headers = await this.getHeaders();
        try {
            return await this.spotifyApi.put(url, data, { headers, ...options });
        } catch (e) {
            this.alert.error(e.message);
            return {};
        }
    };

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
        this.fetch("/me/playlists", { id: "list-playlists" })
    );

    getPlaylist = async (playlistId) => (
        this.fetch(`/playlists/${playlistId}`, { id: `playlist-${playlistId}` })
    );

    createPlaylist = async (userId, data) => (
        this.post(
            `/users/${userId}/playlists`,
            data,
            {
                cache: {
                    update: {
                        "list-playlists": "delete",
                    },
                },
            },
        )
    );

    updatePlaylist = async (playlistId, data) => (
        this.put(
            `/playlists/${playlistId}`,
            data,
            {
                cache: {
                    update: {
                        "list-playlists": "delete",
                    },
                },
            },
        )
    )

    addTrackToPlaylist = async (uri, playlistId) => (
        this.post(
            `/playlists/${playlistId}/tracks`,
            {
                uris: [uri],
            },
            {
                cache: {
                    update: {
                        "list-playlists": "delete",
                        [`playlist-${playlistId}`]: "delete",
                    },
                },
            },
        )
    );

    removeTrackFromPlaylist = async (uri, playlistId) => (
        this.delete(
            `/playlists/${playlistId}/tracks`,
            {
                data: {
                    tracks: [{ uri }],
                },
                cache: {
                    update: {
                        "list-playlists": "delete",
                        [`playlist-${playlistId}`]: "delete",
                    },
                },
            },
        )
    );

    changeTrackOrderInPlaylist = async (playlistId, snapshotId, rangeStart, insertBefore) => (
        this.put(
            `/playlists/${playlistId}/tracks`,
            {
                range_start: rangeStart,
                range_length: 1,
                insert_before: insertBefore,
                snapshot_id: snapshotId,
            },
            {
                cache: {
                    update: {
                        "list-playlists": "delete",
                        [`playlist-${playlistId}`]: "delete",
                    },
                },
            },
        )
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
    };

    getSearch = async (searchTerm, limit = 20) => (
        this.fetch(`/search?q=${searchTerm}&type=track&limit=${limit}`)
    );

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
    };

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
    };
}

export default SpotifyDataFetcher;
