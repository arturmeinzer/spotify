import React, { useRef } from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import BaseLayout from "../../layouts/BaseLayout";
import Artist from "../../components/artist/Artist";
import Header from "../../components/shared/Header";
import { TIME_RANGE_LONG_TERM } from "../../constants/timeRange";
import withAuth from "../../hoc/withAuth";
import TimeRangeToggle from "../../components/shared/TimeRangeToggle";
import { useDataFetcher } from "../../context/DataFetcherContext";

export const Artists = () => {
    const timeRange = useRef(TIME_RANGE_LONG_TERM);
    const dataFetcher = useDataFetcher();
    const { data, refetch } = useQuery("artists", () => dataFetcher.getTopArtists(timeRange.current));

    const handleToggle = async (newTimeRange) => {
        timeRange.current = newTimeRange;
        await refetch();
    };

    return (
        <BaseLayout>
            <Header title="Top Artists">
                <TimeRangeToggle onChange={handleToggle} timeRange={timeRange.current} />
            </Header>
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit, 160px)"
                gap={3}
                sx={{ justifyContent: { xs: "space-around", md: "space-between" } }}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {data?.items?.map((item) => <Artist key={item.id} artist={item} />)}
            </Box>
        </BaseLayout>
    );
};

export default withAuth(Artists);
