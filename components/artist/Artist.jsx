import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import AppLink from "../shared/AppLink";
import { PROP_TYPE_ARTIST } from "../../constants/propTypes";
import { getWidth } from "../../utils/ImageHelper";
import { SIZE_MEDIUM } from "../../constants/imageSizes";
import Image from "../shared/Image";

const Artist = ({ artist, size, direction }) => (
    <AppLink href="/artists/[id]" as={`/artists/${artist.id}`}>
        <Stack
            gap={2}
            flexDirection={direction}
            alignItems="center"
            sx={{ textAlign: "center", width: direction === "row" ? "auto" : getWidth(size) }}
        >
            <Image
                imagesArray={artist.images}
                size={size}
                round
            />
            <Box>{artist.name}</Box>
        </Stack>
    </AppLink>
);

Artist.propTypes = {
    artist: PROP_TYPE_ARTIST.isRequired,
    size: PropTypes.string,
    direction: PropTypes.string,
};

Artist.defaultProps = {
    size: SIZE_MEDIUM,
    direction: "column",
};

export default Artist;
