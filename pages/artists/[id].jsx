import React, {
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import BaseLayout from "../../components/BaseLayout";
import SpotifyDataFetcher from "../../utils/SpotifyDataFetcher";
import { findBestImage } from "../../utils/ImageHelper";
import withAuth from "../../hoc/withAuth";

const Header = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "12px",
    marginBottom: "5px",
}));

const Content = styled(Box)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "bold",
}));

const HEIGHT = 300;
const WIDTH = 300;

const ArtistDetail = () => {
    const shouldFetch = useRef(true);
    const [artist, setArtist] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (shouldFetch.current && typeof id !== "undefined") {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getArtist(id).then((response) => {
                setArtist(response.data);
                shouldFetch.current = true;
            });
        }
    }, [id]);

    if (!artist) {
        return (
            <BaseLayout>
                Loading...
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Container>
                <Stack justifyContent="center" alignItems="center" gap={5}>
                    <Typography variant="h2" as="h1" fontWeight="bold" textAlign="center">{artist.name}</Typography>
                    <Box>
                        <Image
                            src={findBestImage(artist.images, HEIGHT, WIDTH)}
                            width={WIDTH}
                            height={HEIGHT}
                            style={{ borderRadius: "50%" }}
                        />
                    </Box>
                    <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        textAlign="center"
                        maxWidth="500px"
                        sx={{ textTransform: "uppercase" }}
                    >
                        <Box>
                            <Header>Followers</Header>
                            <Content>{artist.followers.total.toLocaleString()}</Content>
                        </Box>
                        <Box>
                            <Header>Genres</Header>
                            {artist.genres.map((genre) => <Content key={genre}>{genre}</Content>)}
                        </Box>
                        <Box>
                            <Header>Popularity</Header>
                            <Content>{`${artist.popularity} %`}</Content>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </BaseLayout>
    );
};

export default withAuth(ArtistDetail);
