import { useContext } from "react";
import DataContext from "../context/DataContext";
import AlertContext from "../context/AlertContext";

const useAddToPlaylist = () => {
    const dataFetcher = useContext(DataContext);
    const alert = useContext(AlertContext);

    const addToPlaylist = (playlistId, uri, callback) => {
        dataFetcher.getPlaylist(playlistId).then((playlistResponse) => {
            const { tracks } = playlistResponse.data;
            let alreadyInPlaylist = false;
            for (let i = 0; i < tracks.items.length; i += 1) {
                if (tracks.items[i].track.uri === uri) {
                    alreadyInPlaylist = true;
                    break;
                }
            }

            if (alreadyInPlaylist) {
                alert.error("Track is already in selected Playlist");
            } else {
                dataFetcher.addTrackToPlaylist(uri, playlistId).then(() => {
                    alert.success("Successfully added to Playlist");
                    if (typeof callback === "function") {
                        callback();
                    }
                }).catch((err) => {
                    alert.error(err.message);
                });
            }
        });
    };

    return [addToPlaylist];
};

export default useAddToPlaylist;
