import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";

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

const ThemeContextProvider = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;
