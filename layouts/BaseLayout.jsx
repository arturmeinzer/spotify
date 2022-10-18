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
                <Box sx={{
                    minHeight: "100%",
                    height: "100%",
                    padding: { xs: "10px", md: "40px" },
                    paddingLeft: { xs: "10px", md: "140px" },
                }}
                >
                    {children}
                </Box>
                <Box sx={{ height: 80 }} />
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
