import { useContext } from "react";
import DataContext from "../context/DataContext";
import useAlertStore from "../store/useAlertStore";

const useMoveItemInPlaylist = () => {
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));
    const dataFetcher = useContext(DataContext);

    const moveItem = (playlistId, snapshotId, position, insertBefore, callback) => {
        dataFetcher.changeTrackOrderInPlaylist(playlistId, snapshotId, position, insertBefore)
            .then((response) => {
                const { snapshot_id: newSnapshotId } = response.data;
                alert.success("Moved item in Playlist");
                callback(newSnapshotId);
            }).catch((err) => {
                alert.error(err.message);
            });
    };

    const moveUp = (playlistId, snapshotId, position, callback) => (
        moveItem(playlistId, snapshotId, position, position - 1, callback)
    );

    const moveDown = (playlistId, snapshotId, position, callback) => (
        moveItem(playlistId, snapshotId, position, position + 2, callback)
    );

    return { moveUp, moveDown };
};

export default useMoveItemInPlaylist;
