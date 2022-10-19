export const secondsToMinutes = (totalSeconds) => {
    const seconds = Math.round(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const msToMinutes = (ms) => {
    const totalSeconds = ms / 1000;
    return secondsToMinutes(totalSeconds);
};

export const releaseDateToYear = (releaseDate) => {
    if (releaseDate.length > 4) {
        return releaseDate.substring(0, 4);
    }
    return releaseDate;
};
