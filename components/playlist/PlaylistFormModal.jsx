import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import SlidingModal from "../shared/SlidingModal";
import PlaylistForm from "./PlaylistForm";
import DataContext from "../../context/DataContext";
import AlertContext from "../../context/AlertContext";
import { PROP_TYPES_PLAYLIST } from "../../constants/propTypes";
import PlaylistOverviewContext from "../../context/PlaylistOverviewContext";

const PlaylistFormModal = ({ playlist }) => {
    const [open, setOpen] = useState(false);
    const dataFetcher = useContext(DataContext);
    const alert = useContext(AlertContext);
    const setReload = useContext(PlaylistOverviewContext);

    const handleUpdate = (data) => {
        const playlistData = { name: data.name };
        if (data.description.length > 0) {
            playlistData.description = data.description;
        }
        dataFetcher.updatePlaylist(playlist.id, playlistData).then(() => {
            alert.success("Playlist updated successfully");
            setOpen(false);
            setReload(true);
        }).catch((err) => {
            alert.error(err.message);
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

PlaylistFormModal.propTypes = {
    playlist: PROP_TYPES_PLAYLIST.isRequired,
};

export default PlaylistFormModal;
