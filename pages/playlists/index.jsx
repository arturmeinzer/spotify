import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import BaseLayout from "../../components/BaseLayout";
import Header from "../../components/Header";
import withAuth from "../../hoc/withAuth";
import SpotifyDataFetcher from "../../utils/SpotifyDataFetcher";
import Playlist from "../../components/Playlist";

const Playlists = () => {
    const shouldFetch = useRef(true);
    const [playlistItems, setPlaylistItems] = useState([]);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getPlaylists().then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data);
                const { items } = response.data;
                setPlaylistItems(items);
            });
        }
    }, []);

    return (
        <BaseLayout loading={playlistItems.length === 0}>
            <Header title="Playlists" />
            <Stack
                flexDirection="row"
                gap={3}
                flexWrap="wrap"
                sx={{ justifyContent: { xs: "space-around", md: "start" } }}
            >
                {playlistItems.map((item) => <Playlist key={item.id} playlist={item} />)}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Playlists);
