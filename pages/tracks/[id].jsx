import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import BaseLayout from "../../layouts/BaseLayout";
import withAuth from "../../hoc/withAuth";
import { useDataFetcher } from "../../context/DataFetcherContext";
import Image from "../../components/shared/Image";
import { SIZE_MEDIUM } from "../../constants/imageSizes";
import { releaseDateToYear } from "../../utils/TimeConverter";
import AudioAnalysis from "../../components/track/AudioAnalysis";
import PlaylistModal from "../../components/playlist/PlaylistModal";
import BackButton from "../../components/shared/BackButton";

const TrackDetails = ({ id }) => {
    const dataFetcher = useDataFetcher();
    const { data } = useQuery(`track-${id}`, () => dataFetcher.getTrackInfo(id));

    return (
        <BaseLayout>
            {data && data.track && (
                <Stack gap={3}>
                    <BackButton />
                    <Stack
                        gap={3}
                        alignItems="center"
                        sx={{ flexDirection: { xs: "column", md: "row" }, textAlign: { xs: "center", md: "left" } }}
                    >
                        <Box>
                            <Image imagesArray={data.track.album.images} size={SIZE_MEDIUM} />
                        </Box>
                        <Stack gap={2}>
                            <Typography variant="h3" as="h1">{data.track.name}</Typography>
                            <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                                {data.track.artists.map((artist) => artist.name).join(", ")}
                            </Box>
                            <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                                {`${data.track.album.name} - ${releaseDateToYear(data.track.album.release_date)}`}
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack flexDirection="row">
                        <PlaylistModal
                            button={<Button color="success">Add To Playlist</Button>}
                            uri={data.track.uri}
                        />
                    </Stack>
                    <AudioAnalysis audioAnalysis={data.audioAnalysis} />
                </Stack>
            )}
        </BaseLayout>
    );
};

TrackDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export async function getServerSideProps({ query: { id } }) {
    return {
        props: { id },
    };
}

export default withAuth(TrackDetails);
