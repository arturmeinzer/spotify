import "../styles/globals.css";

import React from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { DataFetcherProvider } from "../context/DataFetcherContext";
import ThemeContextProvider from "../context/ThemeContextProvider";

const DynamicAlert = dynamic(() => import("../components/shared/Alert"));

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            suspense: true,
        },
    },
});

const MyApp = ({ Component, pageProps }) => (
    <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
            <DataFetcherProvider>
                <Head>
                    <title>Spotify App</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <CssBaseline />
                <DynamicAlert />
                <Component {...pageProps} />
            </DataFetcherProvider>
        </QueryClientProvider>
    </ThemeContextProvider>
);

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({}).isRequired,
};

export default MyApp;
