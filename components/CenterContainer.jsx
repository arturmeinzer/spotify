import React from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const CenterContainer = ({ children }) => (
    <Stack
        justifyContent="center"
        alignItems="center"
        gap="20px"
        sx={{ height: "100%", fontSize: "25px", fontWeight: "bold" }}
    >
        {children}
    </Stack>
);

CenterContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CenterContainer;
