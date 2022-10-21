import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import { getHeight, getWidth } from "../../utils/ImageHelper";
import { SIZE_BIG } from "../../constants/imageSizes";
import SlidingModal from "../shared/SlidingModal";
import AlertContext from "../../context/AlertContext";
import DataContext from "../../context/DataContext";
import PlaylistForm from "./PlaylistForm";

const AddPlaylist = () => {
    const [open, setOpen] = useState(false);
    const alert = useContext(AlertContext);
    const dataFetcher = useContext(DataContext);

    const handleCreate = async (data) => {
        try {
            const userResponse = await dataFetcher.getUser();
            const { id } = userResponse.data;
            dataFetcher.createPlaylist(id, data).then(() => {
                alert.success("Playlist created successfully");
                setOpen(false);
                // TODO: update list of playlists somehow
            });
        } catch (err) {
            alert.error(err.message);
        }
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
