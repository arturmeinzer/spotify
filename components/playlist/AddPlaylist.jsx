import React, { useContext, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { getHeight, getWidth } from "../../utils/ImageHelper";
import { SIZE_BIG } from "../../constants/imageSizes";
import SlidingModal from "../shared/SlidingModal";
import AlertContext from "../../context/AlertContext";
import DataContext from "../../context/DataContext";

const AddPlaylist = () => {
    const [open, setOpen] = useState(false);
    const playlistName = useRef("");
    const playlistDescription = useRef("");
    const alert = useContext(AlertContext);
    const dataFetcher = useContext(DataContext);

    const handleSubmit = async () => {
        if (playlistName.current.value.length === 0) {
            return;
        }

        try {
            const userResponse = await dataFetcher.getUser();
            const { id } = userResponse.data;
            dataFetcher.createPlaylist(
                id,
                playlistName.current.value,
                playlistDescription.current.value,
            ).then(() => {
                alert.success("Playlist created successfully");
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
                <Container sx={{ maxWidth: "400px !important" }}>
                    <Stack justifyContent="center" gap={3}>
                        <FormControl>
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput label="Name" inputRef={playlistName} autoFocus />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Description</InputLabel>
                            <OutlinedInput label="Description" inputRef={playlistDescription} />
                        </FormControl>
                        <Button color="success" onClick={handleSubmit}>Create</Button>
                    </Stack>
                </Container>
            </SlidingModal>
        </>
    );
};

export default AddPlaylist;
