import React from "react";
import NextImage from "next/image";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import { findBestImage, getHeight, getWidth } from "../../utils/ImageHelper";
import { PROP_TYPE_IMAGES } from "../../constants/propTypes";

const Image = ({ imagesArray, size, round }) => {
    if (imagesArray.length === 0) {
        return (
            <Stack
                width={getWidth(size)}
                height={getHeight(size)}
                justifyContent="center"
                alignItems="center"
                sx={{
                    border: "1px solid grey",
                    color: (theme) => theme.palette.text.secondary,
                }}
            >
                No Image
            </Stack>
        );
    }

    return (
        <NextImage
            src={findBestImage(imagesArray, size)}
            width={getWidth(size)}
            height={getHeight(size)}
            style={{ borderRadius: (round ? "50%" : "0") }}
        />
    );
};

Image.propTypes = {
    imagesArray: PROP_TYPE_IMAGES.isRequired,
    size: PropTypes.string.isRequired,
    round: PropTypes.bool,
};

Image.defaultProps = {
    round: false,
};

export default Image;
