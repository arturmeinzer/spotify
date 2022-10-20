import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import withAuth from "../../hoc/withAuth";
import BaseLayout from "../../layouts/BaseLayout";
import DataContext from "../../context/DataContext";
import TrackItem from "../../components/track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import Header from "../../components/shared/Header";

const PlaylistRecommendations = () => {
    const [trackItems, setTrackItems] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const shouldFetch = useRef(true);
    const dataFetcher = useContext(DataContext);
    const router = useRouter();

    useEffect(() => {
        if (shouldFetch.current && router.isReady) {
            const { id } = router.query;
            shouldFetch.current = false;
            dataFetcher.getPlaylist(id).then((playlistResponse) => {
                setPlaylist(playlistResponse.data);
            });
        }
    }, [dataFetcher, router]);

    useEffect(() => {
        if (playlist && trackItems.length === 0) {
            const playlistTrackIds = playlist.tracks.items.map((item) => item.track.id);
            dataFetcher.getRecommendationsForTracks(playlistTrackIds).then((response) => {
                const { tracks } = response.data;
                setTrackItems(tracks);
            });
        }
    }, [playlist, trackItems.length, dataFetcher]);

    return (
        <BaseLayout loading={trackItems.length === 0}>
            <Header title={`Recommendations Based On ${playlist?.name}`}>
                <Button onClick={() => router.back()}>Back</Button>
            </Header>
            <Box sx={{ marginBottom: "40px", textAlign: "center" }}>
                <Button color="success" onClick={() => setTrackItems([])}>Load New</Button>
            </Box>
            <Stack gap={3}>
                {trackItems.map((item) => (
                    <TrackItem key={item.id} size={SIZE_SMALL} track={item} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(PlaylistRecommendations);
