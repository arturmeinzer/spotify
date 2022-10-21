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
import TrackActionsContext from "../../context/TrackActionsContext";
import useDeleteFromPlaylist from "../../hooks/useDeleteFromPlaylist";
import useMoveItemInPlaylist from "../../hooks/useMoveItemInPlaylist";
import { immutableMove } from "../../utils/ArrayHelper";
import BackButton from "../../components/shared/BackButton";

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

    const updatePlaylist = (items, snapshotId, remove = false) => {
        setPlaylist((prev) => ({
            ...prev,
            snapshot_id: snapshotId || prev.snapshot_id,
            tracks: {
                ...prev.tracks,
                total: remove ? prev.tracks.total - 1 : prev.tracks.total,
                items,
            },
        }));
    };

    const menuItems = (uri, position) => ([
        ...(position > 0 ? [
            <IconButton
                key="moveUp"
                size="small"
                onClick={() => (
                    moveUp(playlist.id, playlist.snapshot_id, position, (newSnapshotId) => {
                        updatePlaylist(
                            immutableMove(playlist.tracks.items, position, position - 1),
                            newSnapshotId,
                        );
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
                        updatePlaylist(
                            immutableMove(playlist.tracks.items, position, position + 1),
                            newSnapshotId,
                        );
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
                    updatePlaylist(
                        playlist.tracks.items.filter((item) => item.track.uri !== uri),
                        null,
                        true,
                    );
                });
            }}
        >
            <MdDelete />
        </IconButton>,
    ]);

    return (
        <BaseLayout>
            <BackButton />
            <Stack gap={5} sx={{ flexDirection: { xs: "column", md: "row" }, marginTop: "40px" }}>
                <Stack gap={3} alignItems="center">
                    <Playlist playlist={playlist} />
                    {playlist.tracks.items.length > 0 && (
                        <AppLink href="/recommendations/[id]" as={`/recommendations/${playlist.id}`}>
                            <Button color="success">Recommendations</Button>
                        </AppLink>
                    )}
                </Stack>
                <Stack gap={3} flexGrow={1}>
                    {playlist && playlist.tracks.items.map((item, position) => (
                        <TrackActionsContext.Provider
                            key={item.track.id}
                            value={menuItems(item.track.uri, position)}
                        >
                            <TrackItem
                                size={SIZE_SMALL}
                                track={item.track}
                            />
                        </TrackActionsContext.Provider>
                    ))}
                </Stack>
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(PlaylistDetail);
