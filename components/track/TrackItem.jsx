import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { TbPlaylist } from "react-icons/tb";
import { PROP_TYPE_TRACK } from "../../constants/propTypes";
import { getHeight, getWidth } from "../../utils/ImageHelper";
import { SIZE_SMALL } from "../../constants/imageSizes";
import Image from "../shared/Image";
import { msToMinutes } from "../../utils/TimeConverter";
import AppLink from "../shared/AppLink";
import TrackActions from "./TrackActions";
import PlaylistModal from "../playlist/PlaylistModal";

const TrackItem = ({ track, size }) => (
    <AppLink href="/tracks/[id]" as={`/tracks/${track.id}`}>
        <Stack
            flexDirection="row"
            gap={2}
            sx={{ height: getHeight(size) }}
        >
            <Box sx={{ minWidth: getWidth(size) }}>
                <Image
                    imagesArray={track.album.images}
                    size={SIZE_SMALL}
                />
            </Box>
            <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Box sx={{ whiteSpace: "nowrap" }}>
                    {track.name}
                </Box>
                <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                    {track.artists.map((item) => item.name).join(" ")}
                    &nbsp;-&nbsp;
                    {track.album.name}
                </Box>
            </Stack>
            <Stack gap={1} alignItems="flex-end" onClick={(e) => e.preventDefault()}>
                {msToMinutes(track.duration_ms)}
                <TrackActions
                    actions={[
                        <PlaylistModal
                            key="addPlaylist"
                            uri={track.uri}
                            button={<IconButton size="small"><TbPlaylist /></IconButton>}
                        />,
                    ]}
                />
            </Stack>
        </Stack>
    </AppLink>
);

TrackItem.propTypes = {
    track: PROP_TYPE_TRACK.isRequired,
    size: PropTypes.string,
};

TrackItem.defaultProps = {
    size: SIZE_SMALL,
};

export default TrackItem;
