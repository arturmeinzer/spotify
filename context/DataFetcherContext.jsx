import React, { createContext, useContext } from "react";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";
import PropTypes from "prop-types";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import useAlertStore from "../store/useAlertStore";

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
const DataFetcherContext = createContext(null);

/**
 * @returns {SpotifyDataFetcher}
 */
const useDataFetcher = () => useContext(DataFetcherContext);

const DataFetcherProvider = ({ children }) => {
    const alert = useAlertStore((state) => ({
        success: state.success,
        error: state.error,
        info: state.info,
    }));
    spotifyDataFetcher.setAlert(alert);

    return (
        <DataFetcherContext.Provider value={spotifyDataFetcher}>
            {children}
        </DataFetcherContext.Provider>
    );
};

DataFetcherProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { DataFetcherProvider, useDataFetcher };
export default DataFetcherContext;
