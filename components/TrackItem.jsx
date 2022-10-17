import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PROP_TYPE_TRACK } from "../constants/propTypes";
import { getHeight, getWidth } from "../utils/ImageHelper";
import { SIZE_SMALL } from "../constants/imageSizes";
import Image from "./Image";

const msToMinutes = (ms) => {
    const totalSeconds = ms / 1000;
    const seconds = Math.round(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TrackItem = ({ track, size }) => (
    <Stack
        flexDirection="row"
        gap={2}
        sx={{ height: getHeight(size) }}
    >
        <Box sx={{ minWidth: getWidth(size) }}>
            <Image
                imagesArray={track.album.images}
                size={SIZE_SMALL}
            />
        </Box>
        <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Box sx={{ whiteSpace: "nowrap" }}>
                {track.name}
            </Box>
            <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                {track.artists.map((item) => item.name).join(" ")}
                &nbsp;-&nbsp;
                {track.album.name}
            </Box>
        </Stack>
        <Box>{msToMinutes(track.duration_ms)}</Box>
    </Stack>
);

TrackItem.propTypes = {
    track: PROP_TYPE_TRACK.isRequired,
    size: PropTypes.string,
};

TrackItem.defaultProps = {
    size: SIZE_SMALL,
};

export default TrackItem;
