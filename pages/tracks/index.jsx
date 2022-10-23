import React, {
    useContext,
    useRef,
} from "react";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import BaseLayout from "../../layouts/BaseLayout";
import Header from "../../components/shared/Header";
import TrackItem from "../../components/track/TrackItem";
import { TIME_RANGE_LONG_TERM } from "../../constants/timeRange";
import TimeRangeToggle from "../../components/shared/TimeRangeToggle";
import withAuth from "../../hoc/withAuth";
import DataFetcherContext from "../../context/DataFetcherContext";

const Tracks = () => {
    const timeRange = useRef(TIME_RANGE_LONG_TERM);
    const dataFetcher = useContext(DataFetcherContext);
    const { data, refetch } = useQuery(["tracks"], () => dataFetcher.getTopTracks(timeRange.current));

    const handleToggle = (newTimeRange) => {
        timeRange.current = newTimeRange;
        refetch();
    };

    return (
        <BaseLayout>
            <Header title="Top Tracks">
                <TimeRangeToggle onChange={handleToggle} timeRange={timeRange.current} />
            </Header>
            <Stack
                gap={3}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {data?.items?.map((item) => (
                    <TrackItem key={item.id} track={item} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Tracks);
