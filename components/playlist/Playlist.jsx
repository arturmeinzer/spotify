import React from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Image from "../shared/Image";
import { SIZE_BIG } from "../../constants/imageSizes";
import { PROP_TYPE_IMAGES } from "../../constants/propTypes";
import AppLink from "../shared/AppLink";

const Playlist = ({ playlist, size }) => (
    <AppLink href="/playlists/[id]" as={`/playlists/${playlist.id}`}>
        <Stack gap={1} textAlign="center">
            <Image imagesArray={playlist.images} size={size} />
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
    size: PropTypes.string,
};

Playlist.defaultProps = {
    size: SIZE_BIG,
};

export default Playlist;
