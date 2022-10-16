import React from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppLink from "./AppLink";
import { PROP_TYPE_ARTIST } from "../constants/propTypes";
import { findBestImage } from "../utils/ImageHelper";

const HEIGHT = 160;
const WIDTH = 160;

const Artist = ({ artist }) => (
    <AppLink href="/artists/[id]" as={`/artists/${artist.id}`}>
        <Stack gap="10px" sx={{ textAlign: "center", width: "160px" }}>
            <Image
                src={findBestImage(artist.images, HEIGHT, WIDTH)}
                width={WIDTH}
                height={HEIGHT}
                style={{ borderRadius: "50%" }}
            />
            <Box>{artist.name}</Box>
        </Stack>
    </AppLink>
);

Artist.propTypes = {
    artist: PROP_TYPE_ARTIST.isRequired,
};

export default Artist;
