import { IMAGE_SIZES } from "../constants/imageSizes";

export const getHeight = (size) => IMAGE_SIZES[size].height;
export const getWidth = (size) => IMAGE_SIZES[size].width;

export const findBestImage = (imagesArray, size) => {
    let bestImageUrl = imagesArray[0].url;
    if (imagesArray.length === 1) {
        return bestImageUrl;
    }

    const height = getHeight(size);
    const width = getWidth(size);
    for (let i = 1; i < imagesArray.length; i += 1) {
        if (imagesArray[i].height >= height && imagesArray[i].width >= width) {
            bestImageUrl = imagesArray[i].url;
        }
    }
    return bestImageUrl;
};
