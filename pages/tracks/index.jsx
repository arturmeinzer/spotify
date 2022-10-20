import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Stack from "@mui/material/Stack";
import BaseLayout from "../../layouts/BaseLayout";
import Header from "../../components/Header";
import TrackItem from "../../components/TrackItem";
import { TIME_RANGE_LONG_TERM } from "../../constants/timeRange";
import TimeRangeToggle from "../../components/TimeRangeToggle";
import withAuth from "../../hoc/withAuth";
import DataContext from "../../context/DataContext";

const Tracks = () => {
    const shouldFetch = useRef(true);
    const [trackItems, setTrackItems] = useState([]);
    const [timeRange, setTimeRange] = useState(TIME_RANGE_LONG_TERM);
    const dataFetcher = useContext(DataContext);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            dataFetcher.getTopTracks(timeRange).then((response) => {
                const { items } = response.data;
                setTrackItems(items);
                shouldFetch.current = true;
            });
        }
    }, [timeRange, dataFetcher]);

    return (
        <BaseLayout loading={trackItems.length === 0}>
            <Header title="Top Tracks">
                <TimeRangeToggle onChange={setTimeRange} timeRange={timeRange} />
            </Header>
            <Stack gap={3}>
                {trackItems.map((item) => (
                    <TrackItem key={item.id} track={item} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Tracks);
