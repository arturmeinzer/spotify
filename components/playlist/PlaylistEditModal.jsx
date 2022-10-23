import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import SlidingModal from "../shared/SlidingModal";
import PlaylistForm from "./PlaylistForm";
import { PROP_TYPES_PLAYLIST } from "../../constants/propTypes";
import useEditPlaylist from "../../hooks/useEditPlaylist";

const PlaylistEditModal = ({ playlist }) => {
    const [open, setOpen] = useState(false);
    const editPlaylist = useEditPlaylist();

    const handleUpdate = (data) => {
        const playlistData = { name: data.name };
        if (data.description.length > 0) {
            playlistData.description = data.description;
        }

        editPlaylist(playlist.id, playlistData, () => {
            setOpen(false);
        });
    };

    return (
        <>
            <IconButton
                size="small"
                onClick={() => setOpen(true)}
            >
                <MdEdit />
            </IconButton>
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

PlaylistEditModal.propTypes = {
    playlist: PROP_TYPES_PLAYLIST.isRequired,
};

export default PlaylistEditModal;
