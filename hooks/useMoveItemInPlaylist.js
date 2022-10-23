import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import DataFetcherContext from "../context/DataFetcherContext";
import useAlertStore from "../store/useAlertStore";

const useMoveItemInPlaylist = () => {
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));
    const dataFetcher = useContext(DataFetcherContext);
    const queryClient = useQueryClient();

    const { mutate: moveItem } = useMutation(
        ({
            playlistId,
            snapshotId,
            position,
            insertBefore,
        }) => (
            dataFetcher.changeTrackOrderInPlaylist(playlistId, snapshotId, position, insertBefore)
        ),
        {
            onSuccess: async (data, { playlistId }) => {
                alert.success("Successfully moved item in Playlist");
                await queryClient.invalidateQueries(`playlist-${playlistId}`);
            },
            onError: (err) => {
                alert.error(err.message);
            },
        },
    );

    const moveUp = (playlistId, snapshotId, position) => (
        moveItem({
            playlistId,
            snapshotId,
            position,
            insertBefore: position - 1,
        })
    );

    const moveDown = (playlistId, snapshotId, position) => (
        moveItem({
            playlistId,
            snapshotId,
            position,
            insertBefore: position + 2,
        })
    );

    return { moveUp, moveDown };
};

export default useMoveItemInPlaylist;
