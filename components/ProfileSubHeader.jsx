import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import AppLink from "./AppLink";

const ProfileSubHeader = ({ href, title }) => (
    <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: "20px 0" }}
    >
        <Typography variant="h6" as="h2" fontWeight="bold">{title}</Typography>
        <AppLink href={href}>
            <Button color="success">See More</Button>
        </AppLink>
    </Stack>
);

ProfileSubHeader.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default ProfileSubHeader;
