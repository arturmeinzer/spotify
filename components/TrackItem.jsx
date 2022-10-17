import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { PROP_TYPE_IMAGES } from "../constants/propTypes";
import { findBestImage, getHeight, getWidth } from "../utils/ImageHelper";
import { SIZE_SMALL } from "../constants/imageSizes";

const msToMinutes = (ms) => {
    const totalSeconds = ms / 1000;
    const seconds = Math.round(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TrackItem = ({ track, size }) => (
    <Stack flexDirection="row" gap={3} sx={{ height: getHeight(size) }}>
        <Box sx={{ minWidth: getWidth(size) }}>
            <Image
                src={findBestImage(track.album.images, SIZE_SMALL)}
                width={getWidth(SIZE_SMALL)}
                height={getHeight(SIZE_SMALL)}
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
    track: PropTypes.shape({
        album: PropTypes.shape({
            name: PropTypes.string,
            images: PROP_TYPE_IMAGES,
        }),
        artists: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
        })),
        name: PropTypes.string,
        id: PropTypes.string,
        popularity: PropTypes.number,
        preview_url: PropTypes.string,
        href: PropTypes.string,
        duration_ms: PropTypes.number,
    }).isRequired,
    size: PropTypes.string,
};

TrackItem.defaultProps = {
    size: SIZE_SMALL,
};

export default TrackItem;
