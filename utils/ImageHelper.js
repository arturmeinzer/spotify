// eslint-disable-next-line import/prefer-default-export
export const findBestImage = (imagesArray, height, width) => {
    let bestImage = imagesArray[0];
    imagesArray.forEach((image) => {
        if (image.height >= height && image.width >= width) {
            bestImage = image;
        }
    });
    return bestImage.url;
};
