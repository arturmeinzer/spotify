import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DataContext from "../context/DataContext";
import { SIZE_MEDIUM } from "../constants/imageSizes";
import ModalContainer from "./UI/ModalContainer";
import Image from "./Image";
import Anchor from "./UI/Anchor";
import AlertContext from "../context/AlertContext";

const PlaylistModal = ({ open, setOpen, uri }) => {
    const shouldFetch = useRef(true);
    const [playlistItems, setPlaylistItems] = useState([]);
    const dataFetcher = useContext(DataContext);
    const alert = useContext(AlertContext);

    useEffect(() => {
        if (shouldFetch.current && open) {
            shouldFetch.current = false;
            dataFetcher.getPlaylists().then((response) => {
                const { items } = response.data;
                setPlaylistItems(items);
            });
        }
    }, [open, dataFetcher]);

    const addToPlaylist = (playlistId) => {
        dataFetcher.getPlaylist(playlistId).then((playlistResponse) => {
            const { tracks } = playlistResponse.data;
            let alreadyInPlaylist = false;
            for (let i = 0; i < tracks.items.length; i += 1) {
                if (tracks.items[i].track.uri === uri) {
                    alreadyInPlaylist = true;
                    break;
                }
            }

            if (alreadyInPlaylist) {
                alert.error("Track is already in selected Playlist");
            } else {
                dataFetcher.addTrackToPlaylist(uri, playlistId).then(() => {
                    alert.success("Successfully added to Playlist");
                }).catch((err) => {
                    alert.error(err.message);
                });
            }
        });
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <ModalContainer>
                <Stack gap={2} sx={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {playlistItems.map((item) => (
                        <Anchor key={item.id} onClick={() => addToPlaylist(item.id)}>
                            <Stack gap={1} textAlign="center">
                                <Box>
                                    <Image imagesArray={item.images} size={SIZE_MEDIUM} />
                                </Box>
                                <Box>{item.name}</Box>
                            </Stack>
                        </Anchor>
                    ))}
                </Stack>
            </ModalContainer>
        </Modal>
    );
};

PlaylistModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    uri: PropTypes.string.isRequired,
};

export default PlaylistModal;
