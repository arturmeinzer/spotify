import React from "react";
import { useQuery } from "react-query";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/shared/Header";
import TrackItem from "../components/track/TrackItem";
import withAuth from "../hoc/withAuth";
import { useDataFetcher } from "../context/DataFetcherContext";

const Recent = () => {
    const dataFetcher = useDataFetcher();
    const { data } = useQuery("recentlyPlayed", dataFetcher.getRecentlyPlayed);

    return (
        <BaseLayout>
            <Header title="Recently Played Tracks" />
            <Stack
                gap={3}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {data?.items?.map((item) => (
                    <TrackItem key={item.played_at} track={item.track} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Recent);
