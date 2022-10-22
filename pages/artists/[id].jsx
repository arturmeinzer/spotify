import React, { useContext } from "react";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import BaseLayout from "../../layouts/BaseLayout";
import withAuth from "../../hoc/withAuth";
import { SIZE_BIG } from "../../constants/imageSizes";
import Image from "../../components/shared/Image";
import PropertyHeader from "../../components/UI/PropertyHeader";
import PropertyContent from "../../components/UI/PropertyContent";
import DataContext from "../../context/DataContext";
import BackButton from "../../components/shared/BackButton";

const ArtistDetail = ({ id }) => {
    const dataFetcher = useContext(DataContext);
    const { data: artist } = useQuery(`artist-${id}`, () => dataFetcher.getArtist(id));

    return (
        <BaseLayout>
            <BackButton />
            <Container>
                <Stack justifyContent="center" alignItems="center" gap={5}>
                    <Typography
                        variant="h2"
                        as="h1"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {artist.name}
                    </Typography>
                    <Box>
                        <Image
                            imagesArray={artist.images}
                            size={SIZE_BIG}
                            round
                        />
                    </Box>
                    <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        textAlign="center"
                        maxWidth="500px"
                        gap={3}
                        sx={{ textTransform: "uppercase" }}
                    >
                        <Box>
                            <PropertyHeader>Followers</PropertyHeader>
                            <PropertyContent>
                                {artist.followers.total.toLocaleString()}
                            </PropertyContent>
                        </Box>
                        <Box>
                            <PropertyHeader>Genres</PropertyHeader>
                            {artist.genres.map((genre) => (
                                <PropertyContent key={genre}>{genre}</PropertyContent>
                            ))}
                        </Box>
                        <Box>
                            <PropertyHeader>Popularity</PropertyHeader>
                            <PropertyContent>
                                {`${artist.popularity} %`}
                            </PropertyContent>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </BaseLayout>
    );
};

ArtistDetail.propTypes = {
    id: PropTypes.string.isRequired,
};

export async function getServerSideProps({ query: { id } }) {
    return {
        props: { id },
    };
}

export default withAuth(ArtistDetail);
