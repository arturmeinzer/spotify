import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import DataContext from "../context/DataContext";
import useAlertStore from "../store/useAlertStore";

const useCreatePlaylist = () => {
    const dataFetcher = useContext(DataContext);
    const queryClient = useQueryClient();
    const alert = useAlertStore((state) => ({ error: state.error, success: state.success }));

    const { mutate: createPlaylist } = useMutation(
        ({ id, playlistData }) => dataFetcher.createPlaylist(id, playlistData),
        {
            onSuccess: async () => {
                alert.success("Playlist created successfully");
                await queryClient.invalidateQueries("playlists");
            },
            onError: (err) => {
                alert.error(err.message);
            },
        },
    );

    return async (playlistData, callback) => {
        try {
            const userResponse = await dataFetcher.getUser();
            const { id } = userResponse;

            createPlaylist(
                { id, playlistData },
                {
                    onSuccess: () => {
                        if (typeof callback === "function") {
                            callback();
                        }
                    },
                },
            );
        } catch (err) {
            alert.error(err.message);
        }
    };
};

export default useCreatePlaylist;
