import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Loader from "../components/shared/Loader";
import NavBar from "../components/shared/NavBar";

const BaseLayout = ({ children }) => (
    <Suspense fallback={<Loader />}>
        <Box sx={{ padding: { xs: "20px 20px 120px", md: "40px 40px 40px 140px" } }}>
            {children}
        </Box>
        <NavBar />
    </Suspense>
);

BaseLayout.propTypes = {
    children: PropTypes.node,
};

BaseLayout.defaultProps = {
    children: null,
};

export default BaseLayout;
