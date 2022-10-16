import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Header = ({ title, children }) => (
    <header style={{ display: "flex", justifyContent: "space-between", margin: "40px 0" }}>
        <Typography variant="h5" as="h1" sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Box>{children}</Box>
    </header>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

Header.defaultProps = {
    children: null,
};

export default Header;
