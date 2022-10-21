import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Stack from "@mui/material/Stack";
import BaseLayout from "../layouts/BaseLayout";
import Header from "../components/shared/Header";
import TrackItem from "../components/track/TrackItem";
import withAuth from "../hoc/withAuth";
import DataContext from "../context/DataContext";

const Recent = () => {
    const shouldFetch = useRef(true);
    const [recentItems, setRecentItems] = useState([]);
    const dataFetcher = useContext(DataContext);

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            dataFetcher.getRecentlyPlayed().then((response) => {
                const { items } = response.data;
                setRecentItems(items);
                shouldFetch.current = true;
            }).catch(() => {});
        }
    }, [dataFetcher]);

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
