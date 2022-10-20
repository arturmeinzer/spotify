import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Box from "@mui/material/Box";
import BaseLayout from "../../layouts/BaseLayout";
import Artist from "../../components/artist/Artist";
import Header from "../../components/shared/Header";
import { TIME_RANGE_LONG_TERM } from "../../constants/timeRange";
import withAuth from "../../hoc/withAuth";
import TimeRangeToggle from "../../components/shared/TimeRangeToggle";
import DataContext from "../../context/DataContext";

export const Artists = () => {
    const shouldFetch = useRef(true);
    const [artistItems, setArtistItems] = useState([]);
    const [timeRange, setTimeRange] = useState(TIME_RANGE_LONG_TERM);
    const dataFetcher = useContext(DataContext);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            dataFetcher.getTopArtists(timeRange).then((response) => {
                const { items } = response.data;
                setArtistItems(items);
                shouldFetch.current = true;
            });
        }
    }, [dataFetcher, timeRange]);

    return (
        <BaseLayout loading={artistItems.length === 0}>
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
