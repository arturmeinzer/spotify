import React, {
    cloneElement,
    useContext,
    useState,
} from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import DataFetcherContext from "../../context/DataFetcherContext";
import { SIZE_MEDIUM } from "../../constants/imageSizes";
import Image from "../shared/Image";
import Anchor from "../UI/Anchor";
import SlidingModal from "../shared/SlidingModal";
import useAddToPlaylist from "../../hooks/useAddToPlaylist";

const PlaylistModal = ({ uri, button }) => {
    const [open, setOpen] = useState(false);
    const dataFetcher = useContext(DataFetcherContext);
    const addToPlaylist = useAddToPlaylist();
    const { data } = useQuery("playlists", dataFetcher.getPlaylists);

    const handleClick = (playlistId) => {
        addToPlaylist(playlistId, uri);
        setOpen(false);
    };

    return (
        <>
            {cloneElement(button, { onClick: () => setOpen(true) })}
            <SlidingModal onClose={() => setOpen(false)} title="Add To Playlist" open={open}>
                <Stack gap={2} sx={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {data.items.map((item) => (
                        <Anchor
                            key={item.id}
                            onClick={() => handleClick(item.id)}
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
