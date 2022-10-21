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

const Playlists = () => {
    const shouldFetch = useRef(true);
    const [reload, setReload] = useState(false);
    const [playlistItems, setPlaylistItems] = useState([]);
    const dataFetcher = useContext(DataContext);

    useEffect(() => {
        if (shouldFetch.current || reload) {
            if (reload) setPlaylistItems([]);
            shouldFetch.current = false;
            dataFetcher.getPlaylists().then((response) => {
                const { items } = response.data;
                setPlaylistItems(items);
                setReload(false);
            });
        }
    }, [dataFetcher, reload]);

    return (
        <BaseLayout loading={playlistItems.length === 0}>
            <Header title="Playlists" />
            <Stack
                flexDirection="row"
                gap={3}
                flexWrap="wrap"
                sx={{ justifyContent: { xs: "space-around", md: "start" } }}
            >
                {playlistItems.map((item) => (
                    <Playlist key={item.id} playlist={item} setParentReload={setReload} />
                ))}
                <AddPlaylist setParentReload={setReload} />
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Playlists);
