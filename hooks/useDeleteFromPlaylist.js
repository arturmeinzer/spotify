import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import DataContext from "../context/DataContext";
import useAlertStore from "../store/useAlertStore";

const useDeleteFromPlaylist = () => {
    const dataFetcher = useContext(DataContext);
    const queryClient = useQueryClient();
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));

    const { mutate: deleteFromPlaylist } = useMutation(
        ({ uri, playlistId }) => dataFetcher.removeTrackFromPlaylist(uri, playlistId),
        {
            onSuccess: async (data, { playlistId }) => {
                alert.success("Track deleted from Playlist");
                await queryClient.invalidateQueries("playlists");
                await queryClient.invalidateQueries(`playlist-${playlistId}`);
            },
            onError: (err) => {
                alert.error(err.message);
            },
        },
    );

    return (uri, playlistId) => {
        deleteFromPlaylist({ uri, playlistId });
    };
};

export default useDeleteFromPlaylist;
