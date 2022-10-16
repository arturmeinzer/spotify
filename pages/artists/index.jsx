import React, { useEffect, useRef, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import BaseLayout from "../../components/BaseLayout";
import SpotifyDataFetcher from "../../utils/SpotifyDataFetcher";
import Artist from "../../components/Artist";
import Header from "../../components/Header";
import {
    TIME_RANGE_LONG_TERM,
    TIME_RANGE_MEDIUM_TERM,
    TIME_RANGE_SHORT_TERM,
} from "../../constants/timeRange";

export const Artists = () => {
    const shouldFetch = useRef(true);
    const [artistItems, setArtistItems] = useState([]);
    const [timeRange, setTimeRange] = useState("long_term");

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getTopArtists(timeRange).then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data);
                const { items } = response.data;
                setArtistItems(items);
                shouldFetch.current = true;
            });
        }
    }, [timeRange]);

    return (
        <BaseLayout>
            <Header title="Top Artists">
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={timeRange}
                    onChange={(event, newTimeRange) => setTimeRange(newTimeRange)}
                >
                    <ToggleButton value={TIME_RANGE_LONG_TERM}>All Time</ToggleButton>
                    <ToggleButton value={TIME_RANGE_MEDIUM_TERM}>Last 6 Months</ToggleButton>
                    <ToggleButton value={TIME_RANGE_SHORT_TERM}>Last 4 Weeks</ToggleButton>
                </ToggleButtonGroup>
            </Header>
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, 160px)"
                justifyContent="space-between"
                gap={4}
            >
                {artistItems.map((item) => <Artist key={item.id} artist={item} />)}
            </Box>
        </BaseLayout>
    );
};

export default Artists;
