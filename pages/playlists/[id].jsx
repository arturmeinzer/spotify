import React, {
    useContext,
} from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdDelete } from "react-icons/md";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import BaseLayout from "../../layouts/BaseLayout";
import DataFetcherContext from "../../context/DataFetcherContext";
import Playlist from "../../components/playlist/Playlist";
import TrackItem from "../../components/track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import AppLink from "../../components/shared/AppLink";
import withAuth from "../../hoc/withAuth";
import TrackActionsContext from "../../context/TrackActionsContext";
import useDeleteFromPlaylist from "../../hooks/useDeleteFromPlaylist";
import useMoveItemInPlaylist from "../../hooks/useMoveItemInPlaylist";
import BackButton from "../../components/shared/BackButton";

const PlaylistDetail = ({ id }) => {
    const dataFetcher = useContext(DataFetcherContext);
    const deleteFromPlaylist = useDeleteFromPlaylist();
    const { moveUp, moveDown } = useMoveItemInPlaylist();
    const { data } = useQuery(`playlist-${id}`, () => dataFetcher.getPlaylist(id));

    const menuItems = (uri, position) => ([
        ...(position > 0 ? [
            <IconButton
                key="moveUp"
                size="small"
                onClick={() => moveUp(data.id, data.snapshot_id, position)}
            >
                <BsArrowUpCircle />
            </IconButton>,
        ] : []),
        ...(position < (data.tracks.total - 1) ? [
            <IconButton
                key="moveDown"
                size="small"
                onClick={() => moveDown(data.id, data.snapshot_id, position)}
            >
                <BsArrowDownCircle />
            </IconButton>,
        ] : []),
        <IconButton
            aria-label="delete from playlist"
            key="delete"
            size="small"
            onClick={() => deleteFromPlaylist(uri, data.id)}
        >
            <MdDelete />
        </IconButton>,
    ]);

    return (
        <BaseLayout>
            <BackButton />
            <Stack gap={5} sx={{ flexDirection: { xs: "column", md: "row" }, marginTop: "40px" }}>
                <Stack gap={3} alignItems="center">
                    <Playlist playlist={data} />
                    {data.tracks.items.length > 0 && (
                        <AppLink href="/recommendations/[id]" as={`/recommendations/${data.id}`}>
                            <Button color="success">Recommendations</Button>
                        </AppLink>
                    )}
                </Stack>
                <Stack
                    gap={3}
                    flexGrow={1}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {data && data.tracks.items.map((item, position) => (
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

PlaylistDetail.propTypes = {
    id: PropTypes.string.isRequired,
};

export async function getServerSideProps({ query: { id } }) {
    return {
        props: { id },
    };
}

export default withAuth(PlaylistDetail);
