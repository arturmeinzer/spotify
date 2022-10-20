import React, {
    cloneElement,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Typography from "@mui/material/Typography";
import DataContext from "../../context/DataContext";
import { SIZE_MEDIUM } from "../../constants/imageSizes";
import ModalContainer from "../UI/ModalContainer";
import Image from "../shared/Image";
import Anchor from "../UI/Anchor";
import AlertContext from "../../context/AlertContext";

const PlaylistModal = ({ uri, button }) => {
    const shouldFetch = useRef(true);
    const [playlistItems, setPlaylistItems] = useState([]);
    const [open, setOpen] = useState(false);
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
                    setOpen(false);
                }).catch((err) => {
                    alert.error(err.message);
                });
            }
        });
    };

    return (
        <>
            {cloneElement(button, { onClick: () => setOpen(true) })}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Slide in={open} direction="up">
                    <ModalContainer>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                        >
                            Add To Playlist
                        </Typography>
                        <IconButton sx={{ position: "absolute", right: "20px", top: "15px" }} onClick={() => setOpen(false)}>
                            <IoMdCloseCircleOutline />
                        </IconButton>
                        <Stack gap={2} sx={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
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
                </Slide>
            </Modal>
        </>
    );
};

PlaylistModal.propTypes = {
    uri: PropTypes.string.isRequired,
    button: PropTypes.node.isRequired,
};

export default PlaylistModal;
