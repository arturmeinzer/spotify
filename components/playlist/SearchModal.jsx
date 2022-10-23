import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import SlidingModal from "../shared/SlidingModal";
import DataFetcherContext from "../../context/DataFetcherContext";
import TrackItem from "../track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import TrackActionsContext from "../../context/TrackActionsContext";
import useAddToPlaylist from "../../hooks/useAddToPlaylist";

const SEARCH_TERM_FIELD = "searchTerm";

const SearchModal = ({ playlistId }) => {
    const [open, setOpen] = useState(false);
    const [trackItems, setTrackItems] = useState([]);
    const dataFetcher = useContext(DataFetcherContext);
    const addToPlaylist = useAddToPlaylist();

    const { register, watch, setValue } = useForm({
        defaultValues: {
            searchTerm: "",
        },
    });

    const watchSearchTerm = watch(SEARCH_TERM_FIELD);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (watchSearchTerm.length >= 4) {
                dataFetcher.getSearch(watchSearchTerm).then((response) => {
                    if (response?.tracks?.items) {
                        setTrackItems(response.tracks.items);
                    } else {
                        setTrackItems([]);
                    }
                });
            } else if (trackItems.length > 0) {
                setTrackItems([]);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [watchSearchTerm, dataFetcher, trackItems.length]);

    const handleClose = () => {
        setOpen(false);
        setValue(SEARCH_TERM_FIELD, "");
    };

    const renderActions = (uri) => [
        <IconButton
            key="AddToCurrentPlaylist"
            size="small"
            onClick={() => addToPlaylist(playlistId, uri)}
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
                                {...register(SEARCH_TERM_FIELD)}
                                autoFocus
                            />
                        </FormControl>
                    </Stack>
                </Container>
                <Container sx={{ maxWidth: "600px !important", marginTop: "40px" }}>
                    <Stack gap={3}>
                        {trackItems.map((item) => (
                            <TrackActionsContext.Provider
                                key={item.id}
                                value={renderActions(item.uri)}
                            >
                                <TrackItem track={item} size={SIZE_SMALL} />
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
