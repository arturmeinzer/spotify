import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Stack from "@mui/material/Stack";
import BaseLayout from "../../layouts/BaseLayout";
import Header from "../../components/shared/Header";
import withAuth from "../../hoc/withAuth";
import Playlist from "../../components/playlist/Playlist";
import DataContext from "../../context/DataContext";
import AddPlaylist from "../../components/playlist/AddPlaylist";
import PlaylistOverviewContext from "../../context/PlaylistOverviewContext";

const Playlists = () => {
    const shouldFetch = useRef(true);
    const [reload, setReload] = useState(false);
    const [playlistItems, setPlaylistItems] = useState([]);
    const dataFetcher = useContext(DataContext);

    useEffect(() => {
        if (shouldFetch.current || reload) {
            shouldFetch.current = false;
            if (reload) setPlaylistItems([]);
            dataFetcher.getPlaylists().then((response) => {
                const { items } = response.data;
                setPlaylistItems(items);
                setReload(false);
            }).catch(() => {});
        }
    }, [dataFetcher, reload]);

    return (
        <BaseLayout loading={playlistItems.length === 0}>
            <Header title="Playlists" />
            <PlaylistOverviewContext.Provider value={setReload}>
                <Stack
                    flexDirection="row"
                    gap={3}
                    flexWrap="wrap"
                    sx={{ justifyContent: { xs: "space-around", md: "start" } }}
                >
                    {playlistItems.map((item) => (
                        <Playlist key={item.id} playlist={item} />
                    ))}
                    <AddPlaylist />
                </Stack>
            </PlaylistOverviewContext.Provider>
        </BaseLayout>
    );
};

export default withAuth(Playlists);
