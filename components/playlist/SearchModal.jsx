import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { OutlinedInput } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import SlidingModal from "../shared/SlidingModal";
import DataContext from "../../context/DataContext";
import TrackItem from "../track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import TrackActionsContext from "../../context/TrackActionsContext";
import useAddToPlaylist from "../../hooks/useAddToPlaylist";
import PlaylistOverviewContext from "../../context/PlaylistOverviewContext";

const SearchModal = ({ playlistId }) => {
    const [open, setOpen] = useState(false);
    const [addedItems, setAddedItems] = useState(false);
    const [trackItems, setTrackItems] = useState([]);
    const dataFetcher = useContext(DataContext);
    const [addToPlaylist] = useAddToPlaylist();
    const setReloadOverview = useContext(PlaylistOverviewContext);

    const { register, watch } = useForm({
        defaultValues: {
            searchTerm: "",
        },
    });

    const watchSearchTerm = watch("searchTerm");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (watchSearchTerm.length > 3) {
                dataFetcher.getSearch(watchSearchTerm).then((response) => {
                    if (response?.data?.tracks?.items) {
                        setTrackItems(response.data.tracks.items);
                    } else {
                        setTrackItems([]);
                    }
                });
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [watchSearchTerm, dataFetcher]);

    const handleClose = () => {
        setOpen(false);
        if (addedItems) {
            setReloadOverview(true);
        }
    };

    const renderActions = (uri, callback) => [
        <IconButton
            key="AddToCurrentPlaylist"
            size="small"
            onClick={() => addToPlaylist(
                playlistId,
                uri,
                callback,
            )}
        >
            <AiOutlinePlus />
        </IconButton>,
    ];

    return (
        <>
            <IconButton size="small" onClick={() => setOpen(true)}>
                <AiOutlinePlus />
            </IconButton>
            <SlidingModal title="Search Tracks" open={open} onClose={handleClose}>
                <Container sx={{ maxWidth: "400px !important" }}>
                    <Stack justifyContent="center" gap={3}>
                        <FormControl>
                            <InputLabel>Search</InputLabel>
                            <OutlinedInput
                                label="Search"
                                {...register("searchTerm")}
                                autoFocus
                            />
                        </FormControl>
                    </Stack>
                </Container>
                <Container sx={{ maxWidth: "600px !important", marginTop: "40px" }}>
                    <Stack gap={3}>
                        {trackItems.map((item) => (
                            <TrackActionsContext.Provider
                                value={renderActions(item.uri, () => setAddedItems(true))}
                            >
                                <TrackItem key={item.id} track={item} size={SIZE_SMALL} />
                            </TrackActionsContext.Provider>
                        ))}
                    </Stack>
                </Container>
            </SlidingModal>
        </>
    );
};

SearchModal.propTypes = {
    playlistId: PropTypes.string.isRequired,
};

export default SearchModal;
