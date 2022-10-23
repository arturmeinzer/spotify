import React, { useContext } from "react";
import { useQuery } from "react-query";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import withAuth from "../../hoc/withAuth";
import BaseLayout from "../../layouts/BaseLayout";
import DataFetcherContext from "../../context/DataFetcherContext";
import TrackItem from "../../components/track/TrackItem";
import { SIZE_SMALL } from "../../constants/imageSizes";
import Header from "../../components/shared/Header";
import BackButton from "../../components/shared/BackButton";

const PlaylistRecommendations = ({ id }) => {
    const dataFetcher = useContext(DataFetcherContext);
    const { data, refetch } = useQuery(`recommendations-${id}`, () => dataFetcher.getRecommendationsForPlaylist(id));

    return (
        <BaseLayout>
            <BackButton />
            {data.playlist && <Header title={`Recommendations Based On ${data.playlist.name}`} />}
            <Box sx={{ marginBottom: "40px", textAlign: "center" }}>
                <Button color="success" onClick={refetch}>Load New</Button>
            </Box>
            <Stack gap={3}>
                {data.recommendations.tracks.map((item) => (
                    <TrackItem key={item.id} size={SIZE_SMALL} track={item} />
                ))}
            </Stack>
        </BaseLayout>
    );
};

PlaylistRecommendations.propTypes = {
    id: PropTypes.string.isRequired,
};

export async function getServerSideProps({ query: { id } }) {
    return {
        props: { id },
    };
}

export default withAuth(PlaylistRecommendations);
