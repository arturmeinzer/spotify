import { createContext } from "react";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";

const spotifyDataFetcher = new SpotifyDataFetcher();
const DataContext = createContext(spotifyDataFetcher);

export default DataContext;
