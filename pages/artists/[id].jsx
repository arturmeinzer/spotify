import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BaseLayout from "../../layouts/BaseLayout";
import withAuth from "../../hoc/withAuth";
import Loader from "../../components/shared/Loader";
import { SIZE_BIG } from "../../constants/imageSizes";
import Image from "../../components/shared/Image";
import PropertyHeader from "../../components/UI/PropertyHeader";
import PropertyContent from "../../components/UI/PropertyContent";
import DataContext from "../../context/DataContext";
import BackButton from "../../components/shared/BackButton";

const ArtistDetail = () => {
    const shouldFetch = useRef(true);
    const [artist, setArtist] = useState(null);
    const dataFetcher = useContext(DataContext);
    const router = useRouter();

    useEffect(() => {
        if (shouldFetch.current && router.isReady) {
            const { id } = router.query;
            shouldFetch.current = false;
            dataFetcher.getArtist(id).then((response) => {
                setArtist(response.data);
                shouldFetch.current = true;
            }).catch(() => {});
        }
    }, [dataFetcher, router]);

    if (!artist) {
        return (
            <BaseLayout>
                <Loader />
            </BaseLayout>
        );
    }

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

export default withAuth(ArtistDetail);
