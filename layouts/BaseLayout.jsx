import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

const BaseLayout = ({ children, loading }) => (
    <>
        {loading && <Loader />}
        {!loading && (
            <>
                <Box sx={{ padding: { xs: "10px 10px 120px", md: "40px 40px 40px 140px" } }}>
                    {children}
                </Box>
                <NavBar />
            </>
        )}
    </>
);

BaseLayout.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

BaseLayout.defaultProps = {
    loading: false,
};

export default BaseLayout;
