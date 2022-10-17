import { IMAGE_SIZES } from "../constants/imageSizes";

export const getHeight = (size) => IMAGE_SIZES[size].height;
export const getWidth = (size) => IMAGE_SIZES[size].width;

export const findBestImage = (imagesArray, size) => {
    let bestImage = imagesArray[0];
    const height = getHeight(size);
    const width = getWidth(size);
    imagesArray.forEach((image) => {
        if (image.height >= height && image.width >= width) {
            bestImage = image;
        }
    });
    return bestImage.url;
};
