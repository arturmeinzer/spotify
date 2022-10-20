import { useContext } from "react";
import AlertContext from "../context/AlertContext";
import DataContext from "../context/DataContext";

const useDeleteFromPlaylist = () => {
    const alert = useContext(AlertContext);
    const dataFetcher = useContext(DataContext);

    const deleteFromPlaylist = (uri, playlistId, callback) => {
        dataFetcher.removeTrackFromPlaylist(uri, playlistId).then(() => {
            alert.success("Track deleted from Playlist");
            callback();
        }).catch((err) => {
            alert.error(err.message);
        });
    };

    return [deleteFromPlaylist];
};

export default useDeleteFromPlaylist;
