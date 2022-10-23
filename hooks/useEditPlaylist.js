import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import DataFetcherContext from "../context/DataFetcherContext";
import useAlertStore from "../store/useAlertStore";

const useEditPlaylist = () => {
    const dataFetcher = useContext(DataFetcherContext);
    const queryClient = useQueryClient();
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));

    const { mutate: updatePlaylist } = useMutation(
        ({ playlistId, playlistData }) => dataFetcher.updatePlaylist(playlistId, playlistData),
        {
            onSuccess: async (data, { playlistId }) => {
                alert.success("Playlist updated successfully");
                await queryClient.invalidateQueries("playlists");
                await queryClient.invalidateQueries(`playlist-${playlistId}`);
            },
            onError: (err) => {
                alert.error(err.message);
            },
        },
    );

    return (playlistId, playlistData, callback) => {
        updatePlaylist(
            { playlistId, playlistData },
            {
                onSuccess: () => {
                    if (typeof callback === "function") {
                        callback();
                    }
                },
            },
        );
    };
};

export default useEditPlaylist;
