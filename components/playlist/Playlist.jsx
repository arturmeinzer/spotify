import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { MdEdit } from "react-icons/md";
import Image from "../shared/Image";
import { SIZE_BIG } from "../../constants/imageSizes";
import { PROP_TYPES_PLAYLIST } from "../../constants/propTypes";
import AppLink from "../shared/AppLink";
import SlidingModal from "../shared/SlidingModal";
import PlaylistForm from "./PlaylistForm";
import DataContext from "../../context/DataContext";
import AlertContext from "../../context/AlertContext";

const Playlist = ({ playlist, size }) => {
    const [open, setOpen] = useState(false);
    const dataFetcher = useContext(DataContext);
    const alert = useContext(AlertContext);

    const handleUpdate = (data) => {
        dataFetcher.updatePlaylist(playlist.id, data).then(() => {
            alert.success("Playlist updated successfully");
            setOpen(false);
            // TODO: update list of playlists somehow
        }).catch((err) => {
            alert.error(err.message);
        });
    };

    return (
        <>
            <AppLink href="/playlists/[id]" as={`/playlists/${playlist.id}`}>
                <Stack gap={1} textAlign="center" sx={{ position: "relative" }}>
                    <Image imagesArray={playlist.images} size={size} />
                    <Box>{playlist.name}</Box>
                    <Box
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                    >
                        {`${playlist.tracks.total} Tracks`}
                    </Box>
                    <IconButton
                        size="small"
                        sx={{ position: "absolute", right: 0, bottom: "30px" }}
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                        }}
                    >
                        <MdEdit />
                    </IconButton>
                </Stack>
            </AppLink>
            <SlidingModal
                title="Edit Playlist"
                open={open}
                onClose={() => setOpen(false)}
            >
                <PlaylistForm
                    onSubmit={handleUpdate}
                    initialData={{ name: playlist.name, description: playlist.description }}
                />
            </SlidingModal>
        </>
    );
};

Playlist.propTypes = {
    playlist: PROP_TYPES_PLAYLIST.isRequired,
    size: PropTypes.string,
};

Playlist.defaultProps = {
    size: SIZE_BIG,
};

export default Playlist;
