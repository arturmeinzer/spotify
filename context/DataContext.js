import { createContext } from "react";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";

const AxiosSpotifyInstance = setupCache(
    axios.create({
        baseURL: "https://api.spotify.com/v1",
    }),
    {
        ttl: 1000 * 60 * 30,
        interpretHeader: false,
    },
);

const AxiosLocalInstance = axios.create();

const spotifyDataFetcher = new SpotifyDataFetcher(
    AxiosSpotifyInstance,
    AxiosLocalInstance,
);
const DataContext = createContext(spotifyDataFetcher);

export default DataContext;
