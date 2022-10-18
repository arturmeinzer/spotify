import React from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Image from "./Image";
import { SIZE_BIG } from "../constants/imageSizes";
import { PROP_TYPE_IMAGES } from "../constants/propTypes";
import AppLink from "./AppLink";

const Playlist = ({ playlist }) => (
    <AppLink href="/playlists/[id]" as={`/playlists/${playlist.id}`}>
        <Stack gap={1} textAlign="center">
            <Image imagesArray={playlist.images} size={SIZE_BIG} />
            <Box>{playlist.name}</Box>
            <Box
                sx={{ color: (theme) => theme.palette.text.secondary }}
            >
                {`${playlist.tracks.total} Tracks`}
            </Box>
        </Stack>
    </AppLink>
);

Playlist.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.string,
        images: PROP_TYPE_IMAGES,
        name: PropTypes.string,
        tracks: PropTypes.shape({
            href: PropTypes.string,
            total: PropTypes.number,
        }),
    }).isRequired,
};

export default Playlist;
