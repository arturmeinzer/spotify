import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { getHeight, getWidth } from "../../utils/ImageHelper";
import { SIZE_BIG } from "../../constants/imageSizes";
import SlidingModal from "../shared/SlidingModal";
import PlaylistForm from "./PlaylistForm";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";

const AddPlaylist = () => {
    const [open, setOpen] = useState(false);
    const createPlaylist = useCreatePlaylist();

    const handleCreate = async (data) => {
        const playlistData = { name: data.name };
        if (data.description.length > 0) {
            playlistData.description = data.description;
        }

        await createPlaylist(playlistData, () => {
            setOpen(false);
        });
    };

    return (
        <>
            <Stack
                width={getWidth(SIZE_BIG)}
                height={getHeight(SIZE_BIG)}
                justifyContent="center"
                alignItems="center"
                sx={{
                    border: (theme) => `1px dashed ${theme.palette.text.secondary}`,
                    color: (theme) => theme.palette.text.secondary,
                    cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
            >
                Add Playlist
            </Stack>
            <SlidingModal
                title="New Playlist"
                open={open}
                onClose={() => setOpen(false)}
            >
                <PlaylistForm onSubmit={handleCreate} />
            </SlidingModal>
        </>
    );
};

export default AddPlaylist;
