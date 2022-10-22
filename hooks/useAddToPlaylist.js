import { useContext } from "react";
import DataContext from "../context/DataContext";
import useAlertStore from "../store/useAlertStore";

const useAddToPlaylist = () => {
    const dataFetcher = useContext(DataContext);
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));

    const addToPlaylist = (playlistId, uri, callback) => {
        dataFetcher.getPlaylist(playlistId).then((playlistResponse) => {
            const { tracks } = playlistResponse;
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
