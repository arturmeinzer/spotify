import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import DataFetcherContext from "../context/DataFetcherContext";
import useAlertStore from "../store/useAlertStore";

const useAddToPlaylist = () => {
    const dataFetcher = useContext(DataFetcherContext);
    const queryClient = useQueryClient();
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));

    const { mutate: addToPlaylist } = useMutation(
        ({ uri, playlistId }) => dataFetcher.addTrackToPlaylist(uri, playlistId),
        {
            onSuccess: async (data, { playlistId }) => {
                alert.success("Successfully added to Playlist");
                await queryClient.invalidateQueries("playlists");
                await queryClient.invalidateQueries(`playlist-${playlistId}`);
            },
            onError: (err) => {
                alert.error(err.message);
            },
        },
    );

    return (playlistId, uri) => {
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
                return;
            }

            addToPlaylist({ uri, playlistId });
        });
    };
};

export default useAddToPlaylist;
