import React from "react";
import Stack from "@mui/material/Stack";
import { getHeight, getWidth } from "../utils/ImageHelper";
import { SIZE_BIG } from "../constants/imageSizes";

const AddPlaylist = () => (
    <Stack
        width={getWidth(SIZE_BIG)}
        height={getHeight(SIZE_BIG)}
        justifyContent="center"
        alignItems="center"
        sx={{
            border: (theme) => `1px dashed ${theme.palette.text.secondary}`,
            color: (theme) => theme.palette.text.secondary,
            cursor: "pointer",
        }}
    >
        Add Playlist
    </Stack>
);

export default AddPlaylist;
