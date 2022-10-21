import React, {
    cloneElement,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DataContext from "../../context/DataContext";
import { SIZE_MEDIUM } from "../../constants/imageSizes";
import Image from "../shared/Image";
import Anchor from "../UI/Anchor";
import SlidingModal from "../shared/SlidingModal";
import useAddToPlaylist from "../../hooks/useAddToPlaylist";

const PlaylistModal = ({ uri, button }) => {
    const shouldFetch = useRef(true);
    const [playlistItems, setPlaylistItems] = useState([]);
    const [open, setOpen] = useState(false);
    const dataFetcher = useContext(DataContext);
    const [addToPlaylist] = useAddToPlaylist();

    useEffect(() => {
        if (shouldFetch.current && open) {
            shouldFetch.current = false;
            dataFetcher.getPlaylists().then((response) => {
                const { items } = response.data;
                setPlaylistItems(items);
            });
        }
    }, [open, dataFetcher]);

    return (
        <>
            {cloneElement(button, { onClick: () => setOpen(true) })}
            <SlidingModal onClose={() => setOpen(false)} title="Add To Playlist" open={open}>
                <Stack gap={2} sx={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {playlistItems.map((item) => (
                        <Anchor
                            key={item.id}
                            onClick={() => addToPlaylist(item.id, uri, () => setOpen(false))}
                        >
                            <Stack gap={1} textAlign="center">
                                <Box>
                                    <Image imagesArray={item.images} size={SIZE_MEDIUM} />
                                </Box>
                                <Box>{item.name}</Box>
                            </Stack>
                        </Anchor>
                    ))}
                </Stack>
            </SlidingModal>
        </>
    );
};

PlaylistModal.propTypes = {
    uri: PropTypes.string.isRequired,
    button: PropTypes.node.isRequired,
};

export default PlaylistModal;
