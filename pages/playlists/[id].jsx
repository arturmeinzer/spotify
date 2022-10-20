import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdDelete } from "react-icons/md";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import BaseLayout from "../../layouts/BaseLayout";
import DataContext from "../../context/DataContext";
import Playlist from "../../components/playlist/Playlist";
import TrackItem from "../../components/track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import AppLink from "../../components/shared/AppLink";
import withAuth from "../../hoc/withAuth";
import Loader from "../../components/shared/Loader";
import MenuContext from "../../context/MenuContext";
import useDeleteFromPlaylist from "../../hooks/useDeleteFromPlaylist";
import useMoveItemInPlaylist from "../../hooks/useMoveItemInPlaylist";
import { immutableMove } from "../../utils/ArrayHelper";

const PlaylistDetail = () => {
    const [playlist, setPlaylist] = useState(null);
    const shouldFetch = useRef(true);
    const dataFetcher = useContext(DataContext);
    const [deleteFromPlaylist] = useDeleteFromPlaylist();
    const { moveUp, moveDown } = useMoveItemInPlaylist();
    const router = useRouter();

    useEffect(() => {
        if (shouldFetch.current && router.isReady) {
            const { id } = router.query;
            shouldFetch.current = false;
            dataFetcher.getPlaylist(id).then((response) => {
                setPlaylist(response.data);
                shouldFetch.current = true;
            });
        }
    }, [dataFetcher, router]);

    if (!playlist) {
        return (
            <BaseLayout>
                <Loader />
            </BaseLayout>
        );
    }

    const menuItems = (uri, position) => ([
        ...(position > 0 ? [
            <IconButton
                key="moveUp"
                size="small"
                onClick={() => (
                    moveUp(playlist.id, playlist.snapshot_id, position, (newSnapshotId) => {
                        setPlaylist((prev) => ({
                            ...prev,
                            snapshot_id: newSnapshotId,
                            tracks: {
                                ...prev.tracks,
                                items: immutableMove(prev.tracks.items, position, position - 1),
                            },
                        }));
                    })
                )}
            >
                <BsArrowUpCircle />
            </IconButton>,
        ] : []),
        ...(position < (playlist.tracks.total - 1) ? [
            <IconButton
                key="moveDown"
                size="small"
                onClick={() => (
                    moveDown(playlist.id, playlist.snapshot_id, position, (newSnapshotId) => {
                        setPlaylist((prev) => ({
                            ...prev,
                            snapshot_id: newSnapshotId,
                            tracks: {
                                ...prev.tracks,
                                items: immutableMove(prev.tracks.items, position, position + 1),
                            },
                        }));
                    })
                )}
            >
                <BsArrowDownCircle />
            </IconButton>,
        ] : []),
        <IconButton
            aria-label="delete from playlist"
            key="delete"
            size="small"
            onClick={() => {
                deleteFromPlaylist(uri, playlist.id, () => {
                    setPlaylist((prev) => ({
                        ...prev,
                        tracks: {
                            ...prev.tracks,
                            total: (prev.tracks.total - 1),
                            items: prev.tracks.items.filter((item) => item.track.uri !== uri),
                        },
                    }));
                });
            }}
        >
            <MdDelete />
        </IconButton>,
    ]);

    return (
        <BaseLayout>
            <Stack gap={5} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Stack gap={3} alignItems="center">
                    <Playlist playlist={playlist} />
                    <AppLink href="/recommendations/[id]" as={`/recommendations/${playlist.id}`}>
                        <Button color="success">Recommendations</Button>
                    </AppLink>
                </Stack>
                <Stack gap={3} flexGrow={1}>
                    {playlist && playlist.tracks.items.map((item, position) => (
                        <MenuContext.Provider
                            key={item.track.id}
                            value={menuItems(item.track.uri, position)}
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
