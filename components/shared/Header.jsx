import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Header = ({ title, as, children }) => (
    <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 0 40px",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: "20px",
    }}
    >
        <Typography variant="h5" as={as} sx={{ fontWeight: "bold" }}>{title}</Typography>
        {children && <Box>{children}</Box>}
    </Box>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    as: PropTypes.string,
    children: PropTypes.node,
};

Header.defaultProps = {
    children: null,
    as: "h1",
};

export default Header;
