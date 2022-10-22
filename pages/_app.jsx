import "../styles/globals.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { grey } from "@mui/material/colors";
import Alert from "../components/shared/Alert";
import { DataProvider } from "../context/DataContext";

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    padding: "10px 30px",
                    fontWeight: "bold",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    border: `1px solid ${grey[700]}`,
                },
            },
        },
    },
    palette: {
        mode: "dark",
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            suspense: true,
        },
    },
});

const MyApp = ({ Component, pageProps }) => (
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <DataProvider>
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
                <Alert />
                <Component {...pageProps} />
            </DataProvider>
        </QueryClientProvider>
    </ThemeProvider>
);

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({}).isRequired,
};

export default MyApp;
