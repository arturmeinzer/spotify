import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Loader from "../components/shared/Loader";
import NavBar from "../components/shared/NavBar";

const BaseLayout = ({ children, loading }) => {
    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Box sx={{ padding: { xs: "20px 20px 120px", md: "40px 40px 40px 140px" } }}>
                {children}
            </Box>
            <NavBar />
        </>
    );
};

BaseLayout.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
};

BaseLayout.defaultProps = {
    children: null,
    loading: false,
};

export default BaseLayout;
