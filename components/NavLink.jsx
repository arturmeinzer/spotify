import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import AppLink from "./AppLink";

const activeStyle = {
    borderLeft: "7px solid green",
    backgroundColor: "grey.900",
    color: "white",
};

const NavLink = ({
    href,
    icon,
    caption,
    active,
}) => (
    <AppLink href={href}>
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={[
                {
                    padding: "15px",
                    borderLeft: "7px solid transparent",
                    color: "#aaa",
                    ...(active && activeStyle),
                },
                {
                    "&:hover": {
                        ...activeStyle,
                    },
                },
            ]}
        >
            <Box sx={{ fontSize: "25px" }}>{icon}</Box>
            <Box sx={{ fontSize: "10px" }}>{caption}</Box>
        </Stack>
    </AppLink>
);

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    caption: PropTypes.string.isRequired,
    active: PropTypes.bool,
};

NavLink.defaultProps = {
    active: false,
};

export default NavLink;
