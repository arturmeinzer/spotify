import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { getHeight, getWidth } from "../../utils/ImageHelper";
import { SIZE_BIG } from "../../constants/imageSizes";
import SlidingModal from "../shared/SlidingModal";
import AlertContext from "../../context/AlertContext";
import DataContext from "../../context/DataContext";
import PlaylistForm from "./PlaylistForm";

const AddPlaylist = ({ setParentReload }) => {
    const [open, setOpen] = useState(false);
    const alert = useContext(AlertContext);
    const dataFetcher = useContext(DataContext);

    const handleCreate = async (data) => {
        try {
            const playlistData = { name: data.name };
            if (data.description.length > 0) {
                playlistData.description = data.description;
            }

            const userResponse = await dataFetcher.getUser();
            const { id } = userResponse.data;
            dataFetcher.createPlaylist(id, playlistData).then(() => {
                alert.success("Playlist created successfully");
                setOpen(false);
                setParentReload(true);
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

AddPlaylist.propTypes = {
    setParentReload: PropTypes.func.isRequired,
};

export default AddPlaylist;
