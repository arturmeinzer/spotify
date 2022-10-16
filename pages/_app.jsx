import "../styles/globals.css";

import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const MyApp = ({ Component, pageProps }) => (
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
);

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({}).isRequired,
};

export default MyApp;
