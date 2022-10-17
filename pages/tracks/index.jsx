import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import BaseLayout from "../../components/BaseLayout";
import Header from "../../components/Header";
import TrackItem from "../../components/TrackItem";
import SpotifyDataFetcher from "../../utils/SpotifyDataFetcher";
import { TIME_RANGE_LONG_TERM } from "../../constants/timeRange";
import TimeRangeToggle from "../../components/TimeRangeToggle";
import withAuth from "../../hoc/withAuth";

const Tracks = () => {
    const shouldFetch = useRef(true);
    const [trackItems, setTrackItems] = useState([]);
    const [timeRange, setTimeRange] = useState(TIME_RANGE_LONG_TERM);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getTopTracks(timeRange).then((response) => {
                const { items } = response.data;
                setTrackItems(items);
                shouldFetch.current = true;
            });
        }
    }, [timeRange]);

    return (
        <BaseLayout loading={trackItems.length === 0}>
            <Header title="Top Tracks">
                <TimeRangeToggle onChange={setTimeRange} timeRange={timeRange} />
            </Header>
            <Stack gap={3}>
                {trackItems.map((item) => <TrackItem key={item.id} track={item} />)}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Tracks);
