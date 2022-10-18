import "../styles/globals.css";

import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
        <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
);

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({}).isRequired,
};

export default MyApp;
