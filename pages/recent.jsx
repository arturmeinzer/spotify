import React, { useContext } from "react";
import { useQuery } from "react-query";
import Stack from "@mui/material/Stack";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/shared/Header";
import TrackItem from "../components/track/TrackItem";
import withAuth from "../hoc/withAuth";
import DataContext from "../context/DataContext";

const Recent = () => {
    const dataFetcher = useContext(DataContext);
    const { data } = useQuery("recentlyPlayed", dataFetcher.getRecentlyPlayed);

    return (
        <BaseLayout>
            <Header title="Recently Played Tracks" />
            <Stack gap={3}>
                {data?.items?.map((item) => (
                    <TrackItem key={item.played_at} track={item.track} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Recent);
