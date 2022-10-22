import { useContext } from "react";
import DataContext from "../context/DataContext";
import useAlertStore from "../store/useAlertStore";

const useDeleteFromPlaylist = () => {
    const dataFetcher = useContext(DataContext);
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));

    const deleteFromPlaylist = (uri, playlistId, callback) => {
        dataFetcher.removeTrackFromPlaylist(uri, playlistId).then(() => {
            alert.success("Track deleted from Playlist");
            callback();
        }).catch((err) => {
            alert.error(err.message);
        });
    };

    return deleteFromPlaylist;
};

export default useDeleteFromPlaylist;
