import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import SlidingModal from "../shared/SlidingModal";
import PlaylistForm from "./PlaylistForm";
import DataContext from "../../context/DataContext";
import { PROP_TYPES_PLAYLIST } from "../../constants/propTypes";
import PlaylistOverviewContext from "../../context/PlaylistOverviewContext";
import useAlertStore from "../../store/useAlertStore";

const PlaylistFormModal = ({ playlist }) => {
    const [open, setOpen] = useState(false);
    const dataFetcher = useContext(DataContext);
    const setReload = useContext(PlaylistOverviewContext);
    const success = useAlertStore((state) => state.success);

    const handleUpdate = (data) => {
        const playlistData = { name: data.name };
        if (data.description.length > 0) {
            playlistData.description = data.description;
        }
        dataFetcher.updatePlaylist(playlist.id, playlistData).then(() => {
            success("Playlist updated successfully");
            setOpen(false);
            setReload(true);
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
