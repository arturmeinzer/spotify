import { createContext } from "react";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";

const AxiosInstance = setupCache(
    axios.create(),
    {
        ttl: 1000 * 60 * 30,
        interpretHeader: false,
    },
);

const spotifyDataFetcher = new SpotifyDataFetcher(AxiosInstance);
const DataContext = createContext(spotifyDataFetcher);

export default DataContext;
