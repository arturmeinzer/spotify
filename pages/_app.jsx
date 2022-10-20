import "../styles/globals.css";

import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Alert from "../components/Alert";
import { AlertProvider } from "../context/AlertContext";

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
    },
    palette: {
        mode: "dark",
    },
});

const MyApp = ({ Component, pageProps }) => (
    <ThemeProvider theme={theme}>
        <AlertProvider>
            <Head>
                <title>Spotify App</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <CssBaseline />
            <Alert />
            <Component {...pageProps} />
        </AlertProvider>
    </ThemeProvider>
);

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({}).isRequired,
};

export default MyApp;
