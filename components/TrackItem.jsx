import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { PROP_TYPE_IMAGES } from "../constants/propTypes";
import { findBestImage } from "../utils/ImageHelper";

const WIDTH = 75;
const HEIGHT = 75;

const msToMinutes = (ms) => {
    const fullSeconds = ms / 1000;
    const seconds = Math.round(fullSeconds % 60);
    const minutes = Math.floor(fullSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TrackItem = ({ track }) => (
    <Stack flexDirection="row" gap={3}>
        <Box sx={{ minWidth: "75px" }}>
            <Image
                src={findBestImage(track.album.images, HEIGHT, WIDTH)}
                width={WIDTH}
                height={HEIGHT}
            />
        </Box>
        <Stack sx={{ flexGrow: 1 }}>
            <Box>
                {track.name}
            </Box>
            <Box sx={{ color: "grey.500" }}>
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
};

export default TrackItem;
