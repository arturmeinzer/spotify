import React, { useCallback } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppLink from "./AppLink";
import { PROP_TYPE_ARTIST } from "../constants/propTypes";

const HEIGHT = 160;
const WIDTH = 160;

const Artist = ({ artist }) => {
    const findBestImage = useCallback((imagesArray) => {
        let bestImage = null;
        imagesArray.forEach((image) => {
            if (image.height >= HEIGHT && image.width >= WIDTH) {
                bestImage = image;
            }
        });
        return bestImage.url;
    }, []);

    return (
        <AppLink href="/artists/[id]" as={`/artists/${artist.id}`}>
            <Stack gap="10px" sx={{ textAlign: "center", width: "160px" }}>
                <Image
                    src={findBestImage(artist.images)}
                    width={WIDTH}
                    height={HEIGHT}
                    style={{ borderRadius: "50%" }}
                />
                <Box>{artist.name}</Box>
            </Stack>
        </AppLink>
    );
};

Artist.propTypes = {
    artist: PROP_TYPE_ARTIST.isRequired,
};

export default Artist;
