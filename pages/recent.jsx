import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import BaseLayout from "../components/BaseLayout";
import Header from "../components/Header";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import TrackItem from "../components/TrackItem";
import withAuth from "../hoc/withAuth";

const Recent = () => {
    const shouldFetch = useRef(true);
    const [recentItems, setRecentItems] = useState([]);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getRecentlyPlayed().then((response) => {
                const { items } = response.data;
                setRecentItems(items);
                shouldFetch.current = true;
            });
        }
    }, []);

    return (
        <BaseLayout loading={recentItems.length === 0}>
            <Header title="Recently Played Tracks" />
            <Stack gap={3}>
                {recentItems.map((item) => <TrackItem key={item.played_at} track={item.track} />)}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Recent);
