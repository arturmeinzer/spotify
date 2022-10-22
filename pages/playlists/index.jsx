import React, { useContext } from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import Stack from "@mui/material/Stack";
import BaseLayout from "../../layouts/BaseLayout";
import Header from "../../components/shared/Header";
import withAuth from "../../hoc/withAuth";
import Playlist from "../../components/playlist/Playlist";
import DataContext from "../../context/DataContext";
import AddPlaylist from "../../components/playlist/AddPlaylist";
import PlaylistOverviewContext from "../../context/PlaylistOverviewContext";

const Playlists = () => {
    const dataFetcher = useContext(DataContext);
    const { data, refetch } = useQuery("playlists", dataFetcher.getPlaylists);

    return (
        <PlaylistOverviewContext.Provider value={refetch}>
            <BaseLayout>
                <Header title="Playlists" />
                <Stack
                    flexDirection="row"
                    gap={3}
                    flexWrap="wrap"
                    sx={{ justifyContent: { xs: "space-around", md: "start" } }}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {data.items.map((item) => (
                        <Playlist key={item.id} playlist={item} />
                    ))}
                    <AddPlaylist />
                </Stack>
            </BaseLayout>
        </PlaylistOverviewContext.Provider>
    );
};

export default withAuth(Playlists);
