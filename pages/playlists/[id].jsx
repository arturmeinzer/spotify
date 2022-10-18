import React, {
    useContext,
    useEffect,
    useRef, useState,
} from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BaseLayout from "../../layouts/BaseLayout";
import DataContext from "../../context/DataContext";
import Playlist from "../../components/Playlist";
import TrackItem from "../../components/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import AppLink from "../../components/AppLink";
import withAuth from "../../hoc/withAuth";
import Loader from "../../components/Loader";

const PlaylistDetail = () => {
    const [playlist, setPlaylist] = useState(null);
    const shouldFetch = useRef(true);
    const dataFetcher = useContext(DataContext);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (shouldFetch.current && typeof id !== "undefined") {
            shouldFetch.current = false;
            dataFetcher.getPlaylist(id).then((response) => {
                console.log(response.data);
                setPlaylist(response.data);
                shouldFetch.current = true;
            });
        }
    }, [id, dataFetcher]);

    if (!playlist) {
        return (
            <BaseLayout>
                <Loader />
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Stack gap={5} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Stack gap={3} alignItems="center">
                    <Playlist playlist={playlist} />
                    <AppLink href="/recommendations/[id]" as={`/recommendations/${id}`}>
                        <Button color="success">Recommendations</Button>
                    </AppLink>
                </Stack>
                <Stack gap={3} flexGrow={1}>
                    {playlist && playlist.tracks.items.map((item) => (
                        <TrackItem key={item.track.id} size={SIZE_SMALL} track={item.track} />
                    ))}
                </Stack>
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(PlaylistDetail);
