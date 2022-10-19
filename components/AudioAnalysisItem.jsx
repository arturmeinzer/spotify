import React from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const AudioAnalysisItem = ({ title, value }) => (
    <Stack
        textAlign="center"
        padding="10px"
        sx={{ outline: `1px solid ${grey[700]}` }}
    >
        <Typography
            variant="caption"
            sx={{ color: (theme) => theme.palette.text.secondary }}
        >
            {title}
        </Typography>
        <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>
            {value}
        </Box>
    </Stack>
);

AudioAnalysisItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AudioAnalysisItem;
