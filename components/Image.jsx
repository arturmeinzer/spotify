import React from "react";
import NextImage from "next/image";
import PropTypes from "prop-types";
import { findBestImage, getHeight, getWidth } from "../utils/ImageHelper";
import { PROP_TYPE_IMAGES } from "../constants/propTypes";

const Image = ({ imagesArray, size, round }) => (
    <NextImage
        src={findBestImage(imagesArray, size)}
        width={getWidth(size)}
        height={getHeight(size)}
        style={{ borderRadius: (round ? "50%" : "0") }}
    />
);

Image.propTypes = {
    imagesArray: PROP_TYPE_IMAGES.isRequired,
    size: PropTypes.string.isRequired,
    round: PropTypes.bool,
};

Image.defaultProps = {
    round: false,
};

export default Image;
