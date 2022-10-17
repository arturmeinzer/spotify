import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import BaseLayout from "../../components/BaseLayout";
import SpotifyDataFetcher from "../../utils/SpotifyDataFetcher";
import Artist from "../../components/Artist";
import Header from "../../components/Header";
import { TIME_RANGE_LONG_TERM } from "../../constants/timeRange";
import withAuth from "../../hoc/withAuth";
import TimeRangeToggle from "../../components/TimeRangeToggle";

export const Artists = () => {
    const shouldFetch = useRef(true);
    const [artistItems, setArtistItems] = useState([]);
    const [timeRange, setTimeRange] = useState(TIME_RANGE_LONG_TERM);

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
                <TimeRangeToggle onChange={setTimeRange} timeRange={timeRange} />
            </Header>
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, 160px)"
                gap={3}
                sx={{ justifyContent: { xs: "space-around", md: "space-between" } }}
            >
                {artistItems.map((item) => <Artist key={item.id} artist={item} />)}
            </Box>
        </BaseLayout>
    );
};

export default withAuth(Artists);
