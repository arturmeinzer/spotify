import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import BaseLayout from "../../layouts/BaseLayout";
import DataContext from "../../context/DataContext";
import Playlist from "../../components/Playlist";
import TrackItem from "../../components/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import AppLink from "../../components/AppLink";
import withAuth from "../../hoc/withAuth";
import Loader from "../../components/Loader";
import MenuContext from "../../context/MenuContext";
import AlertContext from "../../context/AlertContext";

const PlaylistDetail = () => {
    const [playlist, setPlaylist] = useState(null);
    const shouldFetch = useRef(true);
    const dataFetcher = useContext(DataContext);
    const alert = useContext(AlertContext);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (shouldFetch.current && typeof id !== "undefined") {
            shouldFetch.current = false;
            dataFetcher.getPlaylist(id).then((response) => {
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

    const menuItems = (uri, playlistId) => ([
        <MenuItem
            key="delete"
            onClick={() => {
                dataFetcher.removeTrackFromPlaylist(uri, playlistId).then(() => {
                    alert.success("Track deleted from Playlist");
                    setPlaylist((prev) => ({
                        ...prev,
                        tracks: {
                            ...prev.tracks,
                            total: (prev.tracks.total - 1),
                            items: prev.tracks.items.filter((item) => item.track.uri !== uri),
                        },
                    }));
                }).catch((err) => {
                    alert.error(err.message);
                });
            }}
        >
            Delete from Playlist
        </MenuItem>,
    ]);

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
                        <MenuContext.Provider
                            key={item.track.id}
                            value={menuItems(item.track.uri, playlist.id)}
                        >
                            <TrackItem
                                size={SIZE_SMALL}
                                track={item.track}
                            />
                        </MenuContext.Provider>
                    ))}
                </Stack>
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(PlaylistDetail);
