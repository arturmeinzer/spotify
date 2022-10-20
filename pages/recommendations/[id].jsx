import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import withAuth from "../../hoc/withAuth";
import BaseLayout from "../../layouts/BaseLayout";
import DataContext from "../../context/DataContext";
import TrackItem from "../../components/track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import Header from "../../components/shared/Header";

const PlaylistRecommendations = () => {
    const [trackItems, setTrackItems] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const shouldFetch = useRef(true);
    const dataFetcher = useContext(DataContext);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (shouldFetch.current && typeof id !== "undefined") {
            shouldFetch.current = false;
            dataFetcher.getPlaylist(id).then((playlistResponse) => {
                const { tracks: playlistTracks, name } = playlistResponse.data;
                setPlaylistName(name);
                const playlistTrackIds = playlistTracks.items.map((item) => item.track.id);
                dataFetcher.getRecommendationsForTracks(playlistTrackIds).then((response) => {
                    const { tracks } = response.data;
                    setTrackItems(tracks);
                });
            });
        }
    }, [id, dataFetcher]);

    return (
        <BaseLayout loading={trackItems.length === 0}>
            <Header title={`Recommendations Based On ${playlistName}`} />
            <Stack gap={3}>
                {trackItems.map((item) => (
                    <TrackItem key={item.id} size={SIZE_SMALL} track={item} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(PlaylistRecommendations);
